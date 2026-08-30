import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CapabilityCard from "@/components/CapabilityCard";
import ValueCard from "@/components/ValueCard";
import CTASection from "@/components/CTASection";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  capabilityDetails,
  constructionManagementScope,
  specialtyTrades,
  deliveryStages,
} from "@/content/capabilities";

export const metadata: Metadata = {
  title: "Construction Capabilities",
  description:
    "Daxar Enterprises provides construction, renovation, site development, specialty trade coordination, and project management capabilities supporting federal and public-sector facilities nationwide.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Capabilities" }]} />
      <Hero
        eyebrow="Capabilities"
        title="Construction Capabilities Built for Federal Requirements"
        description="Daxar Enterprises provides construction, renovation, site development, specialty trade coordination, and project management capabilities supporting federal and public-sector facilities nationwide. Our approach combines disciplined planning, qualified industry partners, project controls, quality management, and accountable execution from preconstruction through closeout."
        size="compact"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Primary Capabilities" title="Core Capability Areas" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityDetails.map((capability) => (
              <CapabilityCard key={capability.title} {...capability} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite py-16 text-white sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Construction Management"
            title="Construction Management"
            description="Daxar manages the full range of activities required to keep a project on scope, on schedule, and in compliance — treating construction management as a core capability, not an add-on service."
            tone="dark"
          />
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
            {constructionManagementScope.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sea" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Specialty Trade Coordination"
            title="Specialty Trade Coordination"
            description="Daxar coordinates qualified specialty contractors based on individual project requirements. Daxar does not represent that it self-performs every trade — project-specific teams are built from qualified partners matched to the scope at hand."
          />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {specialtyTrades.map((trade) => (
              <li
                key={trade}
                className="rounded-sm border border-silver bg-white px-3.5 py-2 text-sm font-medium text-graphite/80"
              >
                {trade}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Project Delivery"
            title="How Daxar Delivers"
            description="A consistent delivery process applied from initial scope review through final turnover."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryStages.map((stage) => (
              <ValueCard key={stage.title} title={stage.title} description={stage.description} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="See how Daxar approaches federal construction execution."
        primary={{ label: "Explore Federal Construction", href: "/federal-construction" }}
        secondary={{ label: "Join Our Partner Network", href: "/industry-partners" }}
      />
    </>
  );
}
