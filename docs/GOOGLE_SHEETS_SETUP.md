# Google Sheets & Email Notification Setup

The Contact form and Industry Partner Registration form on the Daxar Enterprises
website both write submissions to a private Google Sheet and send an email
notification to Daxar staff. No submission data ever passes through the browser
to Google directly — the browser sends the form to our own server (`/api/contact`
or `/api/partner-registration`), and the server talks to Google Sheets using a
service account. Visitors never see or interact with Google Sheets.

This guide walks through connecting your own Google account and Google Cloud
project so the integration works in production. No secrets are ever placed in
source code — everything below goes into environment variables.

---

## 1. Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com/).
2. Click the project dropdown at the top of the page, then **New Project**.
3. Name it something like `daxar-website` and click **Create**.
4. Once created, make sure the new project is selected in the project dropdown.

## 2. Enable the Google Sheets API

1. In the Cloud Console, go to **APIs & Services → Library**.
2. Search for **Google Sheets API**.
3. Click it, then click **Enable**.

## 3. Create a Service Account

1. Go to **APIs & Services → Credentials**.
2. Click **Create Credentials → Service account**.
3. Give it a name, e.g. `daxar-website-sheets`.
4. Click **Create and Continue**, then **Done** (no additional roles are required —
   access is granted directly on the Sheet in step 6).

## 4. Create a Key (Credentials) for the Service Account

1. On the **Credentials** page, click the service account you just created.
2. Go to the **Keys** tab.
3. Click **Add Key → Create new key**.
4. Choose **JSON** and click **Create**. A JSON file will download automatically.
5. Open the file. You need two values from it:
   - `client_email` → this is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → this is your `GOOGLE_PRIVATE_KEY`

Keep this file private. Do not commit it to the repository.

> **"Key creation is blocked by an Organization Policy" error?** Google
> Workspace/Cloud organizations often enforce the `iam.disableServiceAccountKeyCreation`
> policy by default, which blocks step 4 above for every project in the org. Fix:
>
> 1. As an Organization Policy Administrator, go to
>    [IAM & Admin → Organization Policies → iam.disableServiceAccountKeyCreation](https://console.cloud.google.com/iam-admin/orgpolicies/iam-disableServiceAccountKeyCreation).
> 2. In the project picker, select the specific project you created in Step 1
>    above (not the organization or a folder — scope the exception to just
>    this project).
> 3. Click **Manage Policy** → set **Policy source** to **Override parent's
>    policy** → add a rule with **Enforcement: Off** → **Set Policy**.
> 4. Return to **Service Accounts → your service account → Keys → Add Key →
>    Create new key → JSON** and it will succeed.

## 5. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet (e.g. name it "Daxar Website Submissions").
2. Create two tabs (sheet names must match exactly, case-sensitive):
   - `Contact Inquiries`
   - `Industry Partners`
3. In row 1 of each tab, add header columns matching the order the app writes
   in. The exact column lists are defined in `lib/sheets.ts`
   (`CONTACT_SHEET_COLUMNS` and `PARTNER_SHEET_COLUMNS`) — copy them in as your
   header row so the sheet stays self-documenting. The last several columns on
   the `Industry Partners` tab (`Daxar Status`, `Qualified`, `Last Contacted`,
   `Current Opportunity`, `Bid Invited`, `Active Partner`, `Performance Notes`,
   `Daxar Notes`, `Do Not Use`) are internal-only tracking fields for your team
   — they are never populated from the public form, only by Daxar staff
   reviewing submissions.

## 6. Share the Google Sheet with the Service Account

1. Click **Share** in the top-right of the spreadsheet.
2. Paste the service account's `client_email` (from step 4).
3. Set its permission to **Editor** (it needs to append rows).
4. Click **Send** (no email is actually sent to a service account — it just
   grants access).

## 7. Find the Sheet ID

The Sheet ID is the long string in the spreadsheet's URL:

```
https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
```

Copy that value — it's your `GOOGLE_SHEET_ID`.

## 8. Add Environment Variables

Copy `.env.example` to `.env.local` (for local development) and fill in:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id
```

**Important about `GOOGLE_PRIVATE_KEY`:** the JSON key file contains literal
`\n` characters representing line breaks. Paste the key exactly as it appears
in the JSON file, in quotes, keeping the `\n` sequences intact. The app
converts them back into real newlines at runtime (see `lib/sheets.ts`).

If you're deploying on a host with an environment-variable dashboard (Vercel,
Railway, etc.), paste the same value into that dashboard's environment
variable settings rather than a `.env` file.

### Email Notifications (Resend)

1. Create an account at [resend.com](https://resend.com).
2. Verify a sending domain (or use their onboarding test domain while testing).
3. Create an API key under **API Keys**.
4. Add to your environment:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFICATION_FROM_EMAIL=Daxar Website <notifications@daxarenterprises.com>
NOTIFICATION_EMAIL=info@daxarenterprises.com
```

`NOTIFICATION_FROM_EMAIL` must be an address on a domain you've verified in
Resend. `NOTIFICATION_EMAIL` is where new-submission alerts are sent — it
defaults to `info@daxarenterprises.com` if omitted.

## 9. Testing the Integration

1. Run the site locally: `npm run dev`.
2. Go to `/contact` or `/industry-partners#register` and submit a test entry.
3. Check the corresponding tab in your Google Sheet — a new row should appear
   within a few seconds.
4. Check the inbox for `NOTIFICATION_EMAIL` — a summary email should arrive.
5. If the Sheet is not configured (env vars missing), the API route returns a
   clear error to the visitor rather than falsely reporting success — check
   your terminal/server logs for `Google Sheets is not configured` or
   `Failed to append row to Google Sheets` if a submission doesn't appear.

## 10. Verifying New Partner Registrations

Daxar staff can simply open the Google Sheet directly to review new
submissions. A recommended lightweight workflow:

1. Open the `Industry Partners` tab.
2. Filter or sort by the `Daxar Status` column (defaults to `New` for every
   submission).
3. As you review a company, update `Daxar Status` to one of: `New`, `Review`,
   `Qualified`, `Contacted`, `Active Partner`, `Bid Partner`, `Subcontractor`,
   `Inactive`, or `Do Not Use`, and fill in `Last Contacted`,
   `Current Opportunity`, `Bid Invited`, `Active Partner`, `Performance Notes`,
   and `Daxar Notes` as applicable.

Because this is a standard Google Sheet, it can be exported to CSV or Excel
at any time (**File → Download**) for offline review or import into another
system.

---

## Notes on File Uploads

Uploaded documents (capability statements, licenses, certifications, etc.)
are not written to Google Drive or a storage bucket — they are attached
directly to the email notification sent for that submission. This keeps the
integration simple and avoids provisioning separate cloud storage. If Daxar
later wants uploaded files retained independently of email (e.g. in Google
Drive or S3), that can be added in `lib/email.ts` / the two API routes in
`app/api/` without changing the form UI.

## Notes on Rate Limiting

The current rate limiter (`lib/rate-limit.ts`) is in-memory and scoped to a
single running server instance. It resets if the server restarts and does not
share state across multiple instances. This is sufficient for a single-server
deployment; if the site is later deployed across multiple serverless
instances or regions, swap it for a shared store such as Upstash Redis.
