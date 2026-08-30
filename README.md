# Daxar Enterprises LLC — Website

Production website for Daxar Enterprises LLC, a federal construction
contractor. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The Contact and Industry Partner Registration forms require Google Sheets
and Resend credentials to persist submissions and send notification emails.

1. Copy `.env.example` to `.env.local`.
2. Follow **[docs/GOOGLE_SHEETS_SETUP.md](./docs/GOOGLE_SHEETS_SETUP.md)** for
   full step-by-step instructions on creating the Google Sheet, deploying the
   Apps Script Web App, and setting up Resend for email notifications.

Without these variables configured, the forms still validate and run, but
submissions will fail to persist — the API returns a clear error to the
visitor rather than falsely reporting success.

## Project Structure

```
app/                    Route segments (App Router), one folder per page
app/api/                Server-side API routes (contact, partner-registration)
components/             Reusable UI components
components/form/        Form-specific building blocks (fields, uploads, states)
components/graphics/    Decorative SVG graphics (no stock photography used)
content/                Typed content/data modules (nav, company info, copy)
lib/                    Server-side utilities (validation, email, sheets, rate limiting)
docs/                   Setup documentation
```

## Content & Editorial Guardrails

Company facts (CAGE, UEI, SAM.gov status, NAICS codes, contact info) live in
`content/company.ts` — update there rather than hunting through pages.

The site intentionally avoids fabricated claims (contracts, employees,
certifications, bonding capacity, awards, testimonials) per the project's
credibility guidelines. When adding new content, keep to verified information
or clearly-scoped, non-quantified language (e.g. "relevant experience"
rather than invented federal past performance).

## Feature Flags

`content/flags.ts` gates the Capability Statement download CTA, which is
intentionally disabled until the document is finalized. Flip
`capabilityStatementAvailable` to `true` and add the PDF to `public/documents/`
once it's ready — the Contracting Information page will automatically switch
from "in development" copy to a working download button.

## Building & Linting

```bash
npm run build
npm run lint
```

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Zod for server-side form validation
- A Google Apps Script Web App (bound to the Sheet) for form persistence — no service account or GCP project required
- `resend` for transactional email notifications
