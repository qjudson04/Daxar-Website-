import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import FederalInfoPanel from "@/components/FederalInfoPanel";
import Breadcrumbs from "@/components/Breadcrumbs";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact Daxar",
  description:
    "Connect with Daxar Enterprises regarding federal construction, teaming, subcontracting, supplier relationships, or other business opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <Hero
        eyebrow="Contact"
        title="Connect With Daxar"
        description="Daxar Enterprises welcomes inquiries from federal agencies, prime contractors, subcontractors, suppliers, manufacturers, and industry partners. Use the form below to connect with our team regarding federal construction, teaming, subcontracting, supplier relationships, or other business opportunities."
        size="compact"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Get in Touch" title="Send Daxar a Message" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-silver bg-silver/25 p-6">
              <h3 className="font-heading text-base font-semibold text-graphite">
                Daxar Enterprises LLC
              </h3>
              <dl className="mt-4 space-y-3 text-sm text-graphite/80">
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a href={`mailto:${company.email}`} className="text-federal hover:text-ocean">
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Primary Phone</dt>
                  <dd>
                    Primary:{" "}
                    <a href={company.phonePrimaryHref} className="text-federal hover:text-ocean">
                      {company.phonePrimary}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Secondary Phone</dt>
                  <dd>
                    Secondary:{" "}
                    <a href={company.phoneSecondaryHref} className="text-federal hover:text-ocean">
                      {company.phoneSecondary}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border border-silver bg-white p-6">
              <h3 className="font-heading text-base font-semibold text-graphite">
                Federal Registration
              </h3>
              <dl className="mt-4 space-y-3 text-sm text-graphite/80">
                <div className="flex justify-between gap-4">
                  <dt className="text-graphite/55">CAGE</dt>
                  <dd className="font-medium">{company.cage}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-graphite/55">UEI</dt>
                  <dd className="font-medium">{company.uei}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-graphite/55">SAM.gov</dt>
                  <dd className="font-medium">{company.samStatus}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-graphite/55">Coverage</dt>
                  <dd className="font-medium">{company.coverage}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Federal Registration" title="Contracting Information" />
          <div className="mt-8">
            <FederalInfoPanel />
          </div>
        </div>
      </section>
    </>
  );
}
