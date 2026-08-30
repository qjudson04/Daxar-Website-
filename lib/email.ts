import { Resend } from "resend";
import { company } from "@/content/company";

export type EmailAttachment = {
  filename: string;
  content: Buffer;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSummaryHtml(title: string, rows: Array<[string, string]>) {
  const rowsHtml = rows
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#5b6b73;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
          label,
        )}</td><td style="padding:6px 12px;color:#202a30;font-size:13px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;">
    <h2 style="color:#073b4c;font-size:18px;margin-bottom:4px;">${escapeHtml(title)}</h2>
    <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
  </div>`;
}

async function sendNotification(params: {
  subject: string;
  title: string;
  rows: Array<[string, string]>;
  attachments?: EmailAttachment[];
}): Promise<boolean> {
  try {
    const resend = getResendClient();
    const notificationEmail = process.env.NOTIFICATION_EMAIL || company.email;
    const fromAddress = process.env.NOTIFICATION_FROM_EMAIL;

    if (!resend || !fromAddress) {
      console.error("Resend is not configured — skipping email notification.");
      return false;
    }

    await resend.emails.send({
      from: fromAddress,
      to: notificationEmail,
      subject: params.subject,
      html: renderSummaryHtml(params.title, params.rows),
      attachments: params.attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
      })),
    });

    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
}

export async function sendContactNotification(data: {
  inquiryType: string;
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  message: string;
  projectName?: string;
  solicitationNumber?: string;
  issuingAgency?: string;
  attachments?: EmailAttachment[];
}): Promise<boolean> {
  return sendNotification({
    subject: `New Daxar Contact Inquiry — ${data.inquiryType}`,
    title: "New Contact Inquiry",
    rows: [
      ["Inquiry Type", data.inquiryType],
      ["Name", data.name],
      ["Organization", data.organization ?? ""],
      ["Email", data.email],
      ["Phone", data.phone ?? ""],
      ["Project / Opportunity", data.projectName ?? ""],
      ["Solicitation Number", data.solicitationNumber ?? ""],
      ["Issuing Agency", data.issuingAgency ?? ""],
      ["Message", data.message],
    ],
    attachments: data.attachments,
  });
}

export async function sendPartnerRegistrationNotification(data: {
  companyName: string;
  primaryContact: string;
  email: string;
  phone: string;
  primaryTrade: string;
  statesServed?: string;
  federalExperience: string;
  samRegistration?: string;
  cage?: string;
  bondable?: string;
  typicalProjectSize?: string;
  partnershipInterest?: string;
  attachments?: EmailAttachment[];
}): Promise<boolean> {
  return sendNotification({
    subject: `New Daxar Industry Partner Registration — ${data.companyName}`,
    title: "New Industry Partner Registration",
    rows: [
      ["Company", data.companyName],
      ["Primary Contact", data.primaryContact],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Primary Trade", data.primaryTrade],
      ["States Served", data.statesServed ?? ""],
      ["Federal Experience", data.federalExperience],
      ["SAM.gov Status", data.samRegistration ?? ""],
      ["CAGE", data.cage ?? ""],
      ["Bondable", data.bondable ?? ""],
      ["Typical Project Size", data.typicalProjectSize ?? ""],
      ["Partnership Interest", data.partnershipInterest ?? ""],
      ["Review", "See the Industry Partners Google Sheet for full submission details."],
    ],
    attachments: data.attachments,
  });
}
