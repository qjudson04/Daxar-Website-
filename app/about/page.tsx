import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ValueCard from "@/components/ValueCard";
import LeadershipSection from "@/components/LeadershipSection";
import CTASection from "@/components/CTASection";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Daxar Enterprises",
  description:
    "Daxar Enterprises is a federal construction company focused on delivering reliable, well-managed construction solutions through disciplined project management and strong industry partnerships.",
  alternates: { canonical: "/about" },
};

const operatingPhilosophyItems = [
  "Scope",
  "Team formation",
  "Schedules",
  "Trade execution",
  "Quality",
  "Communication",
  "Documentation",
  "Risk",
  "Completion",
];

const leadershipAreas = [
  {
    title: "Architectural Perspective",
    description:
      "Daxar leadership includes formal education in architecture, supporting understanding of design intent, building systems, construction documentation, materials, and the built environment.",
  },
  {
    title: "Construction & Project Experience",
    description:
      "Practical experience managing renovation, site development, subcontractor coordination, material procurement, scheduling, budget control, invoice approval, and multi-trade project execution.",
  },
  {
    title: "Military Leadership & Project Management",
    description:
      "Military leadership experience contributes planning, personnel and resource management, stakeholder coordination, risk management, scheduling, accountability, communication, and execution under constraints.",
  },
];

const approachSteps = [
  {
    title: "Understand the Requirement",
    description: "Review scope, specifications, and contract requirements before committing to an execution plan.",
  },
  {
    title: "Build the Right Team",
    description: "Assemble qualified subcontractors and partners matched to the specific requirement.",
  },
  {
    title: "Execute the Work",
    description: "Manage sequencing, logistics, and communication across every active trade.",
  },
  {
    title: "Maintain Accountability",
    description: "Track schedule, cost, and quality against plan throughout execution.",
  },
  {
    title: "Finish the Entire Requirement",
    description: "Carry projects through punch list, inspection, and closeout — not just substantial completion.",
  },
];

const whyDaxarAbout = [
  { title: "Professionalism", description: "Every interaction reflects the standard Daxar holds for its work." },
  { title: "Quality", description: "Consistent workmanship standards applied across every trade and project." },
  { title: "Schedule Discipline", description: "Milestones tracked and managed proactively, not reactively." },
  { title: "Accountability", description: "A single point of ownership for outcomes from start to finish." },
  { title: "Strong Partnerships", description: "Relationships built on reliability, communication, and mutual respect." },
  { title: "Continuous Improvement", description: "Every project informs how the next one is planned and executed." },
];

const projectEnvironments = [
  "Federal facilities",
  "Military installations",
  "Administrative facilities",
  "Institutional facilities",
  "Renovation",
  "Modernization",
  "Repair and alteration",
  "Facility improvements",
  "Site preparation",
  "Multi-trade construction",
];

const coreValues = ["Accountability", "Discipline", "Quality", "Partnership", "Integrity", "Improvement"];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <Hero
        eyebrow="About Daxar"
        title="Built on Discipline. Focused on Execution."
        description="Daxar Enterprises is a federal construction company focused on delivering reliable, well-managed construction solutions for government and public-sector customers. Our approach combines disciplined project management, multi-trade execution, qualified industry partnerships, and a strong understanding of how complex requirements must be planned, communicated, documented, and executed."
        size="compact"
      />

      {/* Who We Are */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who We Are" title="A Construction Company Built Around Accountability" />
            <p className="mt-6 text-base leading-relaxed text-graphite/80">
              Daxar Enterprises was established to build a federal construction company known for
              dependable execution, professional project management, and strong industry partnerships.
            </p>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-silver">
              <Image
                src="/photos/preconstruction-planning.jpg"
                alt="Project team reviewing plans beneath a precast concrete structure at sunset"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-graphite/50">Illustrative photography.</p>
          </div>
        </div>
      </section>

      {/* Operating Philosophy */}
      <section className="bg-graphite py-16 text-white sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Operating Philosophy"
            title="Construction Is a Management Responsibility"
            tone="dark"
          />
          <div>
            <p className="text-base leading-relaxed text-white/80">
              The prime contractor must maintain ownership of:
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
              {operatingPhilosophyItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sea" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership Foundation */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Leadership Foundation" title="Leadership Foundation" />
          <div className="mt-10">
            <LeadershipSection areas={leadershipAreas} />
          </div>
        </div>
      </section>

      {/* How We Approach the Work */}
      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our Method" title="How We Approach the Work" />
          <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {approachSteps.map((step, index) => (
              <li key={step.title} className="border border-silver bg-white p-5">
                <span className="font-heading text-2xl font-bold text-silver">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-base font-semibold text-ocean">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Daxar */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Why Daxar" title="Why Daxar" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyDaxarAbout.map((item) => (
              <ValueCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Market Focus */}
      <section className="bg-graphite py-16 text-white sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Market Focus"
            title="Federal Construction Nationwide"
            description="Daxar is structured to support construction requirements across a range of federal and public-sector project environments."
            tone="dark"
          />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {projectEnvironments.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sea" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Industry Partnerships */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Industry Partnerships"
              title="Industry Partnerships"
              description="Daxar is continuously developing qualified relationships across construction disciplines — from specialty trades and suppliers to large primes and design professionals."
            />
            <Link
              href="/industry-partners#register"
              className="mt-6 inline-flex items-center justify-center rounded bg-ocean px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-federal"
            >
              Join Our Industry Partner Network
            </Link>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-silver">
              <Image
                src="/photos/rooftop-oversight.jpg"
                alt="Construction team reviewing a multi-story building project at sunset"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-graphite/50">Illustrative photography.</p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Core Values */}
      <section className="bg-silver/25 py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="border border-silver bg-white p-7">
            <h3 className="font-heading text-lg font-semibold text-ocean">Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite/80">
              To deliver dependable federal construction solutions through disciplined project
              management, strong partnerships, quality execution, and accountable performance.
            </p>
          </div>
          <div className="border border-silver bg-white p-7">
            <h3 className="font-heading text-lg font-semibold text-ocean">Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite/80">
              To build Daxar Enterprises into a trusted federal construction partner recognized for
              professional execution, strong project teams, and consistent delivery across complex
              construction requirements.
            </p>
          </div>
          <div className="border border-silver bg-white p-7">
            <h3 className="font-heading text-lg font-semibold text-ocean">Core Values</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {coreValues.map((value) => (
                <li key={value} className="text-sm text-graphite/80">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ocean py-16 text-center sm:py-20">
        <div className="container-page">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Built to Execute.</h2>
        </div>
      </section>

      <CTASection
        title="Learn how Daxar approaches federal construction."
        primary={{ label: "Explore Our Capabilities", href: "/capabilities" }}
        secondary={{ label: "Contact Daxar", href: "/contact" }}
      />
    </>
  );
}
