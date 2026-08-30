import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { isLikelySpam } from "@/lib/spam-check";
import { appendRowToSheet, CONTACT_SHEET_TAB } from "@/lib/sheets";
import { sendContactNotification, type EmailAttachment } from "@/lib/email";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"];

export async function POST(request: Request) {
  const rateLimitKey = clientKeyFromRequest(request, "contact");
  const rateLimit = checkRateLimit(rateLimitKey);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many submissions. Please try again shortly." },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid submission." }, { status: 400 });
  }

  const honeypot = formData.get("company_website")?.toString();
  const formRenderedAt = Number(formData.get("formRenderedAt"));
  if (isLikelySpam(honeypot, formRenderedAt)) {
    // Respond as if successful so bots gain no signal, without persisting anything.
    return NextResponse.json({ success: true });
  }

  const rawValues = Object.fromEntries(
    Array.from(formData.entries()).filter(([, value]) => typeof value === "string"),
  );

  const parsed = contactFormSchema.safeParse(rawValues);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json(
      { success: false, message: "Please correct the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const files = formData.getAll("supportingDocuments").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { success: false, message: `A maximum of ${MAX_FILES} files may be attached.` },
      { status: 400 },
    );
  }

  const attachments: EmailAttachment[] = [];
  for (const file of files) {
    const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { success: false, message: `${file.name} is not an accepted file type.` },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: `${file.name} exceeds the 10MB file size limit.` },
        { status: 400 },
      );
    }
    attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
  }

  const data = parsed.data;
  const fileNames = files.map((f) => f.name).join(", ");

  const sheetOk = await appendRowToSheet(CONTACT_SHEET_TAB, [
    new Date().toISOString(),
    data.inquiryType,
    data.name,
    data.organization || "",
    data.title || "",
    data.email,
    data.phone || "",
    data.projectName || "",
    data.solicitationNumber || "",
    data.issuingAgency || "",
    data.projectLocation || "",
    data.responseDeadline || "",
    data.opportunityType || "",
    data.message,
    fileNames,
  ]);

  await sendContactNotification({
    inquiryType: data.inquiryType,
    name: data.name,
    organization: data.organization,
    email: data.email,
    phone: data.phone,
    message: data.message,
    projectName: data.projectName,
    solicitationNumber: data.solicitationNumber,
    issuingAgency: data.issuingAgency,
    attachments,
  });

  if (!sheetOk) {
    return NextResponse.json(
      {
        success: false,
        message:
          "We were unable to process your submission at this time. Please email info@daxarenterprises.com directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
