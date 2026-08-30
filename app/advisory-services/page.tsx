import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Advisory Services",
  description:
    "Federal construction advisory services from Daxar Enterprises — market entry, opportunity strategy, teaming, and contractor positioning, in support of our construction operations.",
  alternates: { canonical: "/advisory-services" },
};

const advisoryServices = [
  {
    title: "Federal Market Entry",
    description:
      "Guidance for contractors evaluating entry into the federal construction marketplace, including registration and readiness considerations.",
  },
  {
    title: "Opportunity Strategy",
    description:
      "Assessment of federal construction opportunities against a contractor's capabilities, capacity, and past performance.",
  },
  {
    title: "Teaming & Partner Strategy",
    description:
      "Support identifying and structuring prime-sub, joint venture, and mentor-protégé relationships for construction pursuits.",
  },
  {
    title: "Contractor Positioning",
    description:
      "Guidance on how a construction firm presents its capabilities, experience, and readiness to federal customers and primes.",
  },
];

export default function AdvisoryServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Advisory Services" }]} />
      <Hero
        eyebrow="Additional Services"
        title="Federal Construction Advisory Services"
        description="Daxar Enterprises offers limited advisory support focused specifically on federal construction market entry and positioning. This work is secondary to, and informed by, our core construction operations."
        size="compact"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title="Advisory Focus Areas"
            description="Advisory engagements are limited in scope and grounded in how construction requirements are actually planned and executed — not general business consulting."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {advisoryServices.map((service) => (
              <div key={service.title} className="border border-silver bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-ocean">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/75">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Interested in advisory support?"
        description="Reach out through our contact form and select Advisory Services as your inquiry type."
        primary={{ label: "Contact Daxar", href: "/contact" }}
      />
    </>
  );
}
