import { google } from "googleapis";

function getCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !rawKey || !sheetId) {
    return null;
  }

  // .env files can't hold literal newlines; the key is stored with \n escapes.
  const privateKey = rawKey.replace(/\\n/g, "\n");

  return { email, privateKey, sheetId };
}

async function getSheetsClient() {
  const credentials = getCredentials();
  if (!credentials) return null;

  const auth = new google.auth.JWT({
    email: credentials.email,
    key: credentials.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, sheetId: credentials.sheetId };
}

/**
 * Appends a row to the given sheet tab. Returns false (without throwing) if
 * Google Sheets credentials are not configured or the API call fails, so
 * callers can fall back gracefully instead of reporting false success.
 */
export async function appendRowToSheet(tabName: string, values: (string | number)[]): Promise<boolean> {
  try {
    const client = await getSheetsClient();
    if (!client) {
      console.error("Google Sheets is not configured — skipping append.");
      return false;
    }

    await client.sheets.spreadsheets.values.append({
      spreadsheetId: client.sheetId,
      range: `${tabName}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [values],
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to append row to Google Sheets:", error);
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
