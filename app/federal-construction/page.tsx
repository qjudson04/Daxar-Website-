import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ExecutionStep from "@/components/ExecutionStep";
import ProjectControlCard from "@/components/ProjectControlCard";
import FederalInfoPanel from "@/components/FederalInfoPanel";
import Breadcrumbs from "@/components/Breadcrumbs";
import { executionPhases, projectControls } from "@/content/capabilities";

export const metadata: Metadata = {
  title: "Federal Construction",
  description:
    "Daxar Enterprises delivers federal construction through disciplined planning, qualified trade partners, strong project controls, and accountable execution nationwide.",
  alternates: { canonical: "/federal-construction" },
};

const federalCapabilities = [
  "General Construction",
  "Renovation & Modernization",
  "Repair & Alteration",
  "Facility Improvements",
  "Site Preparation",
  "Interior Construction",
  "Specialty Trades",
  "Construction Management",
];

export default function FederalConstructionPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Federal Construction" }]} />
      <Hero
        eyebrow="Federal Construction"
        title="Built for Federal Construction."
        description="Daxar Enterprises delivers construction through disciplined planning, qualified trade partners, strong project controls, and accountable execution. We are structured to support federal renovation, repair, facility improvement, site development, and multi-trade construction requirements nationwide."
        primaryCta={{ label: "Explore Our Capabilities", href: "/capabilities" }}
        size="compact"
        imageSrc="/photos/rebar-execution.jpg"
        imageAlt="Construction crew tying rebar reinforcement on an active jobsite at sunset"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Approach" title="More Than Construction." />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-graphite/80">
              <p>
                Federal construction requires more than completing the physical scope. Successful
                execution depends on managing the contract, schedule, subcontractors, quality, safety,
                documentation, inspections, and closeout as one coordinated effort.
              </p>
              <p>Daxar builds project teams and execution plans around those requirements.</p>
            </div>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-silver">
              <Image
                src="/photos/team-blueprint-review.jpg"
                alt="Project team reviewing plans beneath a structural steel frame"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Execution Framework"
            title="A Four-Stage Execution Framework"
            tone="dark"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executionPhases.map((phase) => (
              <ExecutionStep key={phase.number} {...phase} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Project Controls" title="Project Controls" />
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden bg-silver sm:grid-cols-2 lg:grid-cols-3">
            {projectControls.map((control) => (
              <ProjectControlCard key={control.title} {...control} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Capabilities" title="Federal Construction Capabilities" />
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {federalCapabilities.map((item) => (
              <li
                key={item}
                className="border border-silver bg-white px-5 py-4 text-sm font-medium text-graphite"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ocean py-16 text-white sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Strong Projects Require Strong Partners.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80">
              Daxar builds project-specific teams from a nationwide network of qualified
              subcontractors, suppliers, and industry partners.
            </p>
          </div>
          <Link
            href="/industry-partners#register"
            className="inline-flex shrink-0 items-center justify-center rounded bg-white px-6 py-3.5 text-sm font-semibold text-ocean transition-colors hover:bg-silver"
          >
            Join Our Partner Network
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Federal Registration" title="Contracting Information" />
          <div className="mt-8">
            <FederalInfoPanel />
          </div>
        </div>
      </section>

      <section className="border-t border-silver bg-graphite py-16 text-center sm:py-20">
        <div className="container-page">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Disciplined Execution. Accountable Delivery.
          </h2>
        </div>
      </section>
    </>
  );
}
