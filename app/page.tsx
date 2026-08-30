import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CapabilityCard from "@/components/CapabilityCard";
import ExecutionStep from "@/components/ExecutionStep";
import ValueCard from "@/components/ValueCard";
import FederalInfoPanel from "@/components/FederalInfoPanel";
import CTASection from "@/components/CTASection";
import { homeCapabilities, executionPhases } from "@/content/capabilities";
import { builtAroundExecution, homeProjectDelivery, whyDaxarHome } from "@/content/why-daxar";

export const metadata: Metadata = {
  title: "Federal Construction Contractor | Disciplined Execution",
  description:
    "Daxar Enterprises LLC delivers federal construction and project execution through disciplined planning, quality, accountability, and reliable delivery. CAGE 1AXU9, UEI CHHQZLPNT1F7.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Daxar Enterprises LLC"
        title="Federal Construction. Disciplined Execution."
        description="Daxar Enterprises provides construction and project execution solutions for federal and public-sector facilities with a focus on quality, accountability, execution, and contract performance. We bring together disciplined project management and qualified construction partners to execute requirements from planning and mobilization through construction and closeout."
        primaryCta={{ label: "Explore Our Capabilities", href: "/capabilities" }}
        secondaryCta={{ label: "Contact Daxar", href: "/contact" }}
        imageSrc="/photos/site-structural-work.jpg"
        imageAlt="Construction crew working on structural concrete and rebar on a multi-story building"
        imagePosition="top"
      />

      {/* Built Around Execution */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our Focus" title="Built Around Execution" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {builtAroundExecution.map((item) => (
              <ValueCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Construction Capabilities */}
      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Capabilities"
            title="Construction Capabilities"
            description="Daxar delivers a broad range of construction, renovation, and site-related capabilities aligned with federal and public-sector requirements."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeCapabilities.map((capability) => (
              <CapabilityCard key={capability.title} {...capability} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 text-sm font-semibold text-federal hover:text-ocean"
            >
              View Construction Capabilities
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Band */}
      <section className="relative h-[420px] overflow-hidden sm:h-[480px]">
        <Image
          src="/photos/rebar-execution.jpg"
          alt="Construction crew tying rebar reinforcement on an active jobsite at sunset"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/95 via-graphite/60 to-graphite/10" />
        <div className="container-page relative flex h-full items-center">
          <div className="max-w-lg">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sea">
              On Site
            </p>
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Execution shows up on site, not just on paper.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Every plan Daxar builds is tested against the realities of the jobsite —
              sequencing, safety, and coordination among every trade on the ground.
            </p>
            <p className="mt-6 text-xs text-white/50">Illustrative photography.</p>
          </div>
        </div>
      </section>

      {/* Federal Construction Execution */}
      <section className="bg-graphite py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Execution Framework"
            title="Federal Construction Execution"
            description="A consistent four-phase framework applied to every requirement, from initial planning through contract closeout."
            tone="dark"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executionPhases.map((phase) => (
              <ExecutionStep key={phase.number} {...phase} />
            ))}
          </div>
        </div>
      </section>

      {/* Project Delivery */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="How We Deliver"
            title="Project Delivery"
            description="Daxar manages every stage of delivery as a single, accountable process."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeProjectDelivery.map((item) => (
              <ValueCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Daxar */}
      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Why Daxar" title="Why Daxar" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyDaxarHome.map((item) => (
              <ValueCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Experience */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Experience"
            title="Relevant Project Experience"
            description="Daxar brings hands-on experience executing multi-trade construction projects — managing subcontractors, schedules, and quality outcomes from start to finish."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <ValueCard
              title="Multi-Trade Execution"
              description="Executed renovation work across six subcontractor trades including roofing, HVAC, drywall, flooring, and finishes on a single project."
            />
            <ValueCard
              title="Schedule Performance"
              description="Projects completed on schedule, and in one case approximately one month ahead of schedule."
            />
            <ValueCard
              title="Budget & Quality Outcomes"
              description="Projects completed within established construction budgets, with no reported safety incidents or warranty issues."
            />
          </div>
          <div className="mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-federal hover:text-ocean"
            >
              View Relevant Project Experience
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Partners */}
      <section className="bg-ocean py-16 text-white sm:py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sea">
                Industry Partners
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Building the Teams Behind Successful Projects.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                Daxar Enterprises is actively developing a nationwide network of qualified
                contractors, specialty trades, suppliers, manufacturers, architects, engineers, and
                construction partners.
              </p>
              <Link
                href="/industry-partners#register"
                className="mt-8 inline-flex items-center justify-center rounded bg-white px-6 py-3.5 text-sm font-semibold text-ocean transition-colors hover:bg-silver"
              >
                Join Our Partner Network
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contracting Information */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Federal Registration" title="Contracting Information" />
          <div className="mt-8">
            <FederalInfoPanel />
          </div>
          <div className="mt-8">
            <Link
              href="/contracting-information"
              className="inline-flex items-center gap-2 text-sm font-semibold text-federal hover:text-ocean"
            >
              View Contracting Information
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to discuss a federal construction requirement?"
        description="Connect with Daxar Enterprises regarding federal construction, teaming, subcontracting, or partnership opportunities."
        primary={{ label: "Contact Daxar", href: "/contact" }}
        secondary={{ label: "Partner With Daxar", href: "/industry-partners" }}
      />
    </>
  );
}
