import { NextResponse } from "next/server";
import { partnerRegistrationSchema } from "@/lib/validation";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { isLikelySpam } from "@/lib/spam-check";
import { appendRowToSheet, PARTNER_SHEET_TAB } from "@/lib/sheets";
import { sendPartnerRegistrationNotification, type EmailAttachment } from "@/lib/email";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"];

export async function POST(request: Request) {
  const rateLimitKey = clientKeyFromRequest(request, "partner-registration");
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

  const honeypot = formData.get("company_website_hp")?.toString();
  const formRenderedAt = Number(formData.get("formRenderedAt"));
  if (isLikelySpam(honeypot, formRenderedAt)) {
    return NextResponse.json({ success: true });
  }

  const rawValues = Object.fromEntries(
    Array.from(formData.entries()).filter(([, value]) => typeof value === "string"),
  );

  const parsed = partnerRegistrationSchema.safeParse(rawValues);
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

  const businessClassifications = formData.getAll("businessClassifications").map(String);
  const partnershipInterest = formData.getAll("partnershipInterest").map(String);

  const files = formData.getAll("documents").filter((f): f is File => f instanceof File && f.size > 0);
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

  const sheetOk = await appendRowToSheet(PARTNER_SHEET_TAB, [
    new Date().toISOString(),
    data.companyName,
    data.website || "",
    data.primaryContact,
    data.title || "",
    data.email,
    data.phone,
    data.addressCity,
    data.addressState,
    data.addressZip,
    data.yearsInBusiness || "",
    data.primaryTrade,
    data.additionalTrades || "",
    data.companyDescription || "",
    data.servicesSelfPerformed || "",
    data.typicalProjectSize || "",
    data.largestCompletedProject || "",
    data.headquartersState,
    data.statesServed || "",
    data.nationwide || "",
    data.willingToTravel || "",
    data.federalMarketsServed || "",
    data.uei || "",
    data.cage || "",
    data.samRegistration || "",
    data.primaryNaics || "",
    data.additionalNaics || "",
    data.federalExperience,
    businessClassifications.join(", "),
    data.contractorLicense || "",
    data.licenseNumber || "",
    data.licenseType || "",
    data.licenseState || "",
    data.bondable || "",
    data.singleProjectBondingCapacity || "",
    data.aggregateBondingCapacity || "",
    data.insuranceCoverage || "",
    data.emr || "",
    data.safetyCertifications || "",
    data.primaryProjectTypes || "",
    data.federalAgenciesSupported || "",
    data.project1Name || "",
    data.project1Customer || "",
    data.project1Location || "",
    data.project1Role || "",
    data.project1Value || "",
    data.project1Scope || "",
    data.project2Name || "",
    data.project2Customer || "",
    data.project2Location || "",
    data.project2Role || "",
    data.project2Value || "",
    data.project2Scope || "",
    data.project3Name || "",
    data.project3Customer || "",
    data.project3Location || "",
    data.project3Role || "",
    data.project3Value || "",
    data.project3Scope || "",
    partnershipInterest.join(", "),
    fileNames,
    data.referralSource || "",
    data.comments || "",
    // Internal-only tracking columns, left blank for Daxar staff to fill in.
    "New",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  await sendPartnerRegistrationNotification({
    companyName: data.companyName,
    primaryContact: data.primaryContact,
    email: data.email,
    phone: data.phone,
    primaryTrade: data.primaryTrade,
    statesServed: data.statesServed,
    federalExperience: data.federalExperience,
    samRegistration: data.samRegistration,
    cage: data.cage,
    bondable: data.bondable,
    typicalProjectSize: data.typicalProjectSize,
    partnershipInterest: partnershipInterest.join(", "),
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
