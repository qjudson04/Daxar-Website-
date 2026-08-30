import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import PartnerRegistrationForm from "@/components/PartnerRegistrationForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { partnerCategories, whatWeLookFor } from "@/content/partners";

export const metadata: Metadata = {
  title: "Industry Partners",
  description:
    "Daxar Enterprises is developing a nationwide network of qualified contractors, specialty trades, suppliers, manufacturers, architects, engineers, and construction partners.",
  alternates: { canonical: "/industry-partners" },
};

export default function IndustryPartnersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industry Partners" }]} />
      <Hero
        eyebrow="Industry Partners"
        title="Build With Daxar."
        description="Daxar Enterprises is developing a nationwide network of qualified contractors, specialty trades, suppliers, manufacturers, architects, engineers, and construction partners to support federal construction requirements. We value relationships with companies that bring strong technical capability, reliable execution, professional communication, and a commitment to quality."
        primaryCta={{ label: "Register Your Company", href: "#register" }}
        size="compact"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Approach"
            title="Strong Projects Start With Strong Teams."
            description="Daxar develops relationships with qualified partners before opportunities arise, so we can quickly assemble capable, project-specific teams when requirements come in."
          />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {partnerCategories.map((category) => (
              <span
                key={category}
                className="rounded-sm border border-silver bg-white px-3.5 py-2 text-sm font-medium text-graphite/80"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite py-16 text-white sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="What We Look For" title="What We Look For" tone="dark" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeLookFor.map((item) => (
              <div key={item.title} className="border-t-2 border-sea pt-4">
                <h3 className="font-heading text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-white/75">
            Federal experience is valuable but not required for every potential partner. Strong
            commercial contractors capable of succeeding in the federal environment are encouraged
            to register.
          </p>
        </div>
      </section>

      <section id="register" className="scroll-mt-20 bg-silver/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Register"
            title="Register Your Company"
            description="Complete the form below to join Daxar's Industry Partner Network. Fields marked with an asterisk are required."
          />
          <div className="mt-10 border border-silver bg-white p-6 sm:p-10">
            <PartnerRegistrationForm />
          </div>
        </div>
      </section>
    </>
  );
}
