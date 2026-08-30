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
 */

const ALLOWED_TABS = ["Contact Inquiries", "Industry Partners"];

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
