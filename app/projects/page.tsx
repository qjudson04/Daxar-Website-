import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Relevant Project Experience",
  description:
    "Daxar Enterprises brings hands-on experience in multi-trade renovation, site preparation, subcontractor coordination, procurement, scheduling, cost control, and construction oversight.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
      <Hero
        eyebrow="Experience"
        title="Relevant Project Experience"
        description="Daxar Enterprises brings hands-on experience in multi-trade renovation, site preparation, subcontractor coordination, procurement, scheduling, cost control, and construction oversight. Our experience informs the disciplined project-management approach we apply to federal construction requirements."
        size="compact"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Project Experience"
              title="Multi-Trade Renovation & Site Preparation"
              description="As Daxar completes federal and public-sector construction awards, that project experience will be featured here first."
            />
            <div>
              <div className="relative aspect-[4/3] overflow-hidden border border-silver">
                <Image
                  src="/photos/site-preparation.jpg"
                  alt="Site preparation coordination at an active earthwork site"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-14 space-y-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Interested in Daxar's approach to project execution?"
        primary={{ label: "Explore Our Capabilities", href: "/capabilities" }}
        secondary={{ label: "Contact Daxar", href: "/contact" }}
      />
    </>
  );
}
