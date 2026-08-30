import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import { company } from "@/content/company";
import { flags } from "@/content/flags";

export const metadata: Metadata = {
  title: "Federal Contracting Information",
  description:
    "Federal procurement information for Daxar Enterprises LLC — CAGE, UEI, SAM.gov registration status, NAICS codes, and geographic coverage.",
  alternates: { canonical: "/contracting-information" },
};

const registrationRows = [
  { label: "Legal Business Name", value: company.legalName },
  { label: "CAGE Code", value: company.cage },
  { label: "UEI", value: company.uei },
  { label: "SAM.gov Registration", value: company.samStatus },
  { label: "Primary NAICS", value: `${company.naicsPrimary.code} — ${company.naicsPrimary.title}` },
  { label: "Geographic Coverage", value: company.coverage },
  { label: "Email", value: company.email },
  { label: "Primary Phone", value: company.phonePrimary },
  { label: "Secondary Phone", value: company.phoneSecondary },
];

const primeContractorResponsibilities = [
  "Scope understanding",
  "Preconstruction",
  "Subcontractor qualification",
  "Trade execution",
  "Procurement",
  "Schedule management",
  "Quality",
  "Site safety",
  "Documentation",
  "Communication",
  "Inspections",
  "Closeout",
];

export default function ContractingInformationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contracting Information" }]} />
      <Hero
        eyebrow="Federal Contracting"
        title="Federal Contracting Information"
        description="Daxar Enterprises maintains active federal registration and provides construction capabilities aligned with commercial, institutional, specialty trade, and site-related requirements. This page provides key procurement information for contracting personnel, prime contractors, and potential teaming partners."
        size="compact"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Registration" title="Federal Registration Summary" />
          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-silver bg-silver sm:grid-cols-3">
            {registrationRows.map((row) => (
              <div key={row.label} className="bg-white p-5">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-graphite/50">
                  {row.label}
                </dt>
                <dd className="mt-1.5 font-heading text-base font-bold text-ocean break-words">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow={`NAICS ${company.naicsPrimary.code}`}
            title={company.naicsPrimary.title}
          />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-graphite/80">
            This is Daxar&apos;s primary NAICS code, reflecting our focus on renovation, repair,
            facility improvement, modernization, and multi-trade construction for commercial and
            institutional facilities.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Secondary NAICS" title="Secondary NAICS Codes" />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {company.naicsSecondary.map((naics) => (
              <div key={naics.code} className="border border-silver bg-white p-5">
                <p className="font-heading text-sm font-bold text-federal">NAICS {naics.code}</p>
                <p className="mt-1.5 text-sm text-graphite/75">{naics.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite py-16 text-white sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Delivery Model"
            title="Prime Contractor Mindset"
            description="Daxar organizes delivery around the responsibilities of a prime contractor — maintaining ownership of the requirement from award through closeout."
            tone="dark"
          />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
            {primeContractorResponsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sea" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Industry Partners"
              title="Industry Partner Model"
              description="Daxar builds project-specific teams from a nationwide network of qualified subcontractors, suppliers, and industry partners rather than relying on a single self-performance model."
            />
            <Link
              href="/industry-partners"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-federal hover:text-ocean"
            >
              Learn About Industry Partners
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="border border-silver bg-silver/25 p-7">
            <h3 className="font-heading text-lg font-semibold text-graphite">Capability Statement</h3>
            {flags.capabilityStatementAvailable ? (
              <>
                <p className="mt-3 text-sm leading-relaxed text-graphite/75">
                  Download Daxar&apos;s capability statement for a complete summary of our
                  construction capabilities and federal registration information.
                </p>
                <a
                  href={flags.capabilityStatementHref}
                  className="mt-5 inline-flex items-center justify-center rounded bg-ocean px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-federal"
                >
                  Download Capability Statement
                </a>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm leading-relaxed text-graphite/75">
                  Daxar&apos;s capability statement is currently being finalized. Until published,
                  procurement personnel and potential partners may review Daxar&apos;s construction
                  capabilities and contracting information directly through this website.
                </p>
                <Link
                  href="/capabilities"
                  className="mt-5 inline-flex items-center justify-center rounded bg-ocean px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-federal"
                >
                  View Capabilities
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
