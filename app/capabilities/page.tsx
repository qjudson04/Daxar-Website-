import type { Metadata } from "next";
import Image from "next/image";
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
    "Daxar Enterprises provides construction, renovation, site development, multi-trade execution, and project management capabilities supporting federal and public-sector facilities nationwide.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Capabilities" }]} />
      <Hero
        eyebrow="Capabilities"
        title="Construction Capabilities Built for Federal Requirements"
        description="Daxar Enterprises provides construction, renovation, site development, multi-trade execution, and project management capabilities supporting federal and public-sector facilities nationwide. Our approach combines disciplined planning, qualified industry partners, project controls, quality management, and accountable execution from preconstruction through closeout."
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

      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="General Construction"
              title="Built for Institutional and Commercial Facilities"
              description="From renovation to ground-up structural work, Daxar's approach is grounded in the same disciplined project controls regardless of building type or scale."
            />
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden border border-silver lg:order-2">
            <Image
              src="/photos/highrise-structural.jpg"
              alt="Institutional building under construction with structural rebar in the foreground"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden border border-silver">
            <Image
              src="/photos/earthwork-excavation.jpg"
              alt="Site preparation and earthwork at an active excavation site"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Site Readiness"
              title="Every Project Starts With the Ground"
              description="Before a structure takes shape, the site has to be ready for it. Daxar delivers clearing, grading, excavation, and earthwork so the requirement is set up to succeed from day one."
            />
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
            eyebrow="Multi-Trade Execution"
            title="Multi-Trade Execution"
            description="Daxar executes multi-trade scopes across the disciplines below, drawing on a qualified network of trade partners to deliver each requirement to the same quality and schedule standard."
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
