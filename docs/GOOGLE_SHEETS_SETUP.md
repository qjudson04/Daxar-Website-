# Google Sheets & Email Notification Setup

The Contact form and Industry Partner Registration form on the Daxar Enterprises
website both write submissions to a private Google Sheet and send an email
notification to Daxar staff. No submission data ever passes through the browser
to Google directly — the browser sends the form to our own server (`/api/contact`
or `/api/partner-registration`), and the server posts to a small script running
inside your Google Sheet. Visitors never see or interact with Google Sheets.

This uses a **Google Apps Script Web App** rather than a GCP service account,
deliberately: many Google Workspace/Cloud organizations enforce an
`iam.disableServiceAccountKeyCreation` policy that blocks service account key
downloads outright, and there's no reason to fight that policy for a simple
form-to-sheet integration. Apps Script runs under your own Google account's
permissions — no GCP project, no IAM role, no key file, and nothing for an org
admin to approve.

No secrets are ever placed in source code — everything below goes into
environment variables.

---

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet (e.g. name it "Daxar Website Submissions").
2. Create two tabs (sheet names must match exactly, case-sensitive):
   - `Contact Inquiries`
   - `Industry Partners`
3. Leave both tabs empty — **you don't need to type in header columns
   yourself.** The Apps Script below (step 2) writes the correct header row
   into a tab automatically the first time it's used, either from the first
   real form submission or by running the optional `initializeHeaders()`
   helper once you've deployed it. The last several columns it writes on the
   `Industry Partners` tab (`Daxar Status`, `Qualified`, `Last Contacted`,
   `Current Opportunity`, `Bid Invited`, `Active Partner`, `Performance
   Notes`, `Daxar Notes`, `Do Not Use`) are internal-only tracking fields for
   your team — they are never populated from the public form, only by Daxar
   staff reviewing submissions.

## 2. Add the Apps Script

1. With the spreadsheet open, go to **Extensions → Apps Script**. This opens
   the script editor, already bound to this specific spreadsheet.
2. Delete any placeholder code in `Code.gs` and paste in the full contents of
   [`docs/apps-script/Code.gs`](./apps-script/Code.gs) from this repository.
3. Click the **Save project** icon (or Ctrl/Cmd+S).
4. Optional: to see the header rows appear immediately rather than waiting
   for the first real submission, select `initializeHeaders` from the
   function dropdown and click **Run** (approve the authorization prompt if
   asked). It writes headers to both tabs and leaves anything already there
   untouched — safe to run more than once.

## 3. Generate a Shared Secret

This secret is what stops random people on the internet from posting fake
submissions into your Sheet once the Web App URL exists.

1. In the Apps Script editor, use the function dropdown (next to the **Run**
   button, in the toolbar) to select `generateAndStoreSecret`.
2. Click **Run**. The first time, Google will ask you to authorize the script
   — this is expected (it's your own script acting on your own Sheet); review
   and click **Allow**.
3. Go to **View → Logs** (or **Executions**) to see the generated secret it
   printed. Copy it — you'll need it in step 5.

You can re-run this function later to rotate the secret; just remember to
update the website's environment variable to match.

## 4. Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure:
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
     (this is required so our server can call it — access is still gated by
     the shared secret from step 3, not by who's calling)
4. Click **Deploy**. Authorize again if prompted.
5. Copy the **Web app URL** shown (it ends in `/exec`). This is your
   `GOOGLE_APPS_SCRIPT_URL`.

If you edit `Code.gs` later, you'll need to create a **new deployment** (or
use **Manage deployments → Edit → New version**) for the changes to take
effect — saving alone doesn't update a live deployment.

## 5. Add Environment Variables

Copy `.env.example` to `.env.local` (for local development) and fill in:

```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXX/exec
GOOGLE_APPS_SCRIPT_SECRET=the-secret-you-copied-in-step-3
```

If you're deploying on a host with an environment-variable dashboard (Vercel,
Railway, etc.), paste the same values into that dashboard's environment
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

## 6. Testing the Integration

1. Run the site locally: `npm run dev`.
2. Go to `/contact` or `/industry-partners#register` and submit a test entry.
3. Check the corresponding tab in your Google Sheet — a new row should appear
   within a few seconds.
4. Check the inbox for `NOTIFICATION_EMAIL` — a summary email should arrive.
5. If something's misconfigured, the API route returns a clear error to the
   visitor rather than falsely reporting success — check your terminal/server
   logs for `Google Apps Script webhook is not configured`, `Apps Script
   webhook returned a non-OK status`, or `Apps Script webhook reported
   failure` to see what's wrong. A "reported failure" with `Unauthorized`
   means the secret in your env vars doesn't match what's stored in the
   script (re-run `generateAndStoreSecret` and update both, or double-check
   for extra whitespace when you copied the value).

## 7. Verifying New Partner Registrations

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

## Notes on Apps Script Limits

Apps Script Web Apps have a per-execution quota (well beyond what a small
business contact form generates) and a soft cap on requests per day on
consumer/Workspace accounts. If Daxar's submission volume ever grows enough
to approach that, the integration can be swapped back to a direct Sheets API
call — either via a service account (once/if the org policy is lifted or a
personal, non-org GCP project is used) or Workload Identity Federation — by
replacing the internals of `appendRowToSheet` in `lib/sheets.ts` again. The
API routes and form UI would not need to change.
