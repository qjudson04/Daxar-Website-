/**
 * Daxar Enterprises website — form submission webhook.
 *
 * Paste this entire file into the Apps Script editor bound to your
 * "Daxar Website Submissions" Google Sheet (Extensions → Apps Script).
 * See ../GOOGLE_SHEETS_SETUP.md for full step-by-step setup instructions.
 *
 * This script accepts POST requests from the website's server, checks a
 * shared secret, and appends a row to the requested tab. It runs under your
 * own Google account's permissions — no service account or GCP project is
 * required, so it is unaffected by organization policies that block service
 * account key creation.
 *
 * Keep HEADERS below in sync with CONTACT_SHEET_COLUMNS / PARTNER_SHEET_COLUMNS
 * in lib/sheets.ts if either form's fields ever change — Apps Script can't
 * import from the site's TypeScript source, so this is a duplicated,
 * hand-synced copy.
 */

const HEADERS = {
  "Contact Inquiries": [
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
  ],
  "Industry Partners": [
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
    // Internal-only tracking columns — never populated from the public form,
    // only filled in by Daxar staff reviewing submissions.
    "Daxar Status",
    "Qualified",
    "Last Contacted",
    "Current Opportunity",
    "Bid Invited",
    "Active Partner",
    "Performance Notes",
    "Daxar Notes",
    "Do Not Use",
  ],
};

const ALLOWED_TABS = Object.keys(HEADERS);

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const expectedSecret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!expectedSecret) {
      return jsonResponse({ ok: false, error: "SHARED_SECRET is not configured on this script." });
    }
    if (body.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "Unauthorized." });
    }

    if (ALLOWED_TABS.indexOf(body.tab) === -1) {
      return jsonResponse({ ok: false, error: "Unknown tab: " + body.tab });
    }
    if (!Array.isArray(body.values)) {
      return jsonResponse({ ok: false, error: "Missing values array." });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(body.tab);
    if (!sheet) {
      return jsonResponse({
        ok: false,
        error: "Tab \"" + body.tab + "\" does not exist in this spreadsheet.",
      });
    }

    // Write the header row automatically the first time this tab is used.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS[body.tab]);
    }

    sheet.appendRow(body.values);
    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/**
 * One-time setup helper. In the Apps Script editor, select this function
 * from the function dropdown and click Run once to generate and store a
 * random shared secret — copy the value it logs into your website's
 * GOOGLE_APPS_SCRIPT_SECRET environment variable.
 *
 * You can re-run this at any time to rotate the secret (the website's env
 * var must be updated to match, or requests will be rejected).
 */
function generateAndStoreSecret() {
  const secret = Utilities.getUuid() + Utilities.getUuid();
  PropertiesService.getScriptProperties().setProperty("SHARED_SECRET", secret);
  Logger.log("Shared secret (copy this into GOOGLE_APPS_SCRIPT_SECRET): " + secret);
}

/**
 * Optional helper. Run this once (from the function dropdown) if you'd
 * rather write both tabs' header rows immediately instead of waiting for
 * the first real form submission to trigger it. Safe to run multiple times
 * — it only writes headers to a tab if that tab is still empty.
 */
function initializeHeaders() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ALLOWED_TABS.forEach(function (tabName) {
    const sheet = spreadsheet.getSheetByName(tabName);
    if (!sheet) {
      Logger.log('Tab "' + tabName + '" does not exist yet — create it first.');
      return;
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS[tabName]);
      Logger.log('Wrote header row to "' + tabName + '".');
    } else {
      Logger.log('"' + tabName + '" already has content — left unchanged.');
    }
  });
}
