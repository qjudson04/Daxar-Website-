import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the Daxar Enterprises LLC website.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <Hero eyebrow="Legal" title="Privacy Policy" description="Last updated: August 2026" size="compact" />

      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl space-y-8 text-sm leading-relaxed text-graphite/80">
          <div>
            <h2 className="font-heading text-xl font-semibold text-graphite">Overview</h2>
            <p className="mt-3">
              This Privacy Policy describes how Daxar Enterprises LLC (&quot;Daxar,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects information submitted
              through this website.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-graphite">Information We Collect</h2>
            <p className="mt-3">
              We collect information you voluntarily submit through our Contact form and Industry
              Partner Registration form, which may include your name, organization, title, email
              address, phone number, business address, capability and qualification information, and
              any documents you choose to upload (such as a capability statement, license, or
              certification).
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-graphite">How We Use Information</h2>
            <p className="mt-3">Information submitted through our forms is used to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Respond to inquiries about federal construction, teaming, and subcontracting opportunities.</li>
              <li>Evaluate companies for potential subcontracting, supplier, teaming, and partnership opportunities.</li>
              <li>Maintain records of business communications and industry partner relationships.</li>
            </ul>
            <p className="mt-3">
              We do not sell or rent the personal or business information you submit to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-graphite">How Information Is Stored</h2>
            <p className="mt-3">
              Form submissions are transmitted securely to a private, access-controlled record system
              and are not publicly accessible. Uploaded documents are transmitted securely and are used
              solely for the evaluation purposes described above.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-graphite">Cookies & Analytics</h2>
            <p className="mt-3">
              This website does not use advertising or tracking cookies. Limited technical data (such as
              browser type and IP address) may be processed automatically by our hosting infrastructure
              for security and performance purposes.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-graphite">Your Choices</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of information you have submitted to
              Daxar by contacting us at{" "}
              <a href={`mailto:${company.email}`} className="text-federal hover:text-ocean">
                {company.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-graphite">Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Changes will be reflected on this
              page.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-graphite">Contact</h2>
            <p className="mt-3">
              Questions about this Privacy Policy may be directed to{" "}
              <a href={`mailto:${company.email}`} className="text-federal hover:text-ocean">
                {company.email}
              </a>{" "}
              or {company.phonePrimary}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
