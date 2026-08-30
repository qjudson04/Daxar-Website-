/**
 * Persistence is via a Google Apps Script Web App bound directly to the
 * spreadsheet (see docs/apps-script/Code.gs and docs/GOOGLE_SHEETS_SETUP.md).
 * This deliberately avoids a GCP service account + downloadable key, since
 * many Google Workspace/Cloud organizations enforce an
 * iam.disableServiceAccountKeyCreation policy that blocks that path entirely.
 * The Apps Script runs under the Sheet owner's own Google account — no GCP
 * project, IAM role, or key is required.
 */

/**
 * Appends a row to the given sheet tab via the Apps Script webhook. Returns
 * false (without throwing) if the webhook is not configured or the call
 * fails, so callers can fall back gracefully instead of reporting false
 * success.
 */
export async function appendRowToSheet(tabName: string, values: (string | number)[]): Promise<boolean> {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!url || !secret) {
    console.error("Google Apps Script webhook is not configured — skipping append.");
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, tab: tabName, values }),
    });

    if (!response.ok) {
      console.error("Apps Script webhook returned a non-OK status:", response.status);
      return false;
    }

    const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!result?.ok) {
      console.error("Apps Script webhook reported failure:", result?.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to reach Google Apps Script webhook:", error);
    return false;
  }
}

export const CONTACT_SHEET_TAB = "Contact Inquiries";
export const PARTNER_SHEET_TAB = "Industry Partners";

export const CONTACT_SHEET_COLUMNS = [
  "Timestamp",
  "Inquiry Type",
  "Name",
  "Organization",
  "Title",
  "Email",
  "Phone",
  "Project / Opportunity Name",
  "Solicitation Number",
  "Issuing Agency",
  "Project Location",
  "Response Deadline",
  "Opportunity Type",
  "Message",
  "Supporting Documents",
] as const;

export const PARTNER_SHEET_COLUMNS = [
  "Timestamp",
  "Company Name",
  "Website",
  "Primary Contact",
  "Title",
  "Email",
  "Phone",
  "City",
  "State",
  "ZIP",
  "Years in Business",
  "Primary Trade / Capability",
  "Additional Trades",
  "Company Description",
  "Services Self-Performed",
  "Typical Project Size",
  "Largest Completed Project",
  "Headquarters State",
  "States Served",
  "Nationwide",
  "Willing to Travel",
  "Federal Markets Served",
  "UEI",
  "CAGE",
  "SAM.gov Registration",
  "Primary NAICS",
  "Additional NAICS",
  "Federal Contracting Experience",
  "Business Classifications",
  "Contractor License",
  "License Number",
  "License Type",
  "License State",
  "Bondable",
  "Single Project Bonding Capacity",
  "Aggregate Bonding Capacity",
  "Insurance Coverage",
  "EMR",
  "Safety Certifications / Programs",
  "Primary Project Types",
  "Federal Agencies Supported",
  "Project 1 Name",
  "Project 1 Customer",
  "Project 1 Location",
  "Project 1 Role",
  "Project 1 Value",
  "Project 1 Scope",
  "Project 2 Name",
  "Project 2 Customer",
  "Project 2 Location",
  "Project 2 Role",
  "Project 2 Value",
  "Project 2 Scope",
  "Project 3 Name",
  "Project 3 Customer",
  "Project 3 Location",
  "Project 3 Role",
  "Project 3 Value",
  "Project 3 Scope",
  "Partnership Interest",
  "Document Uploads",
  "How Did You Hear About Daxar",
  "Comments",
  // Internal-only tracking columns — never populated from the public form.
  "Daxar Status",
  "Qualified",
  "Last Contacted",
  "Current Opportunity",
  "Bid Invited",
  "Active Partner",
  "Performance Notes",
  "Daxar Notes",
  "Do Not Use",
] as const;
