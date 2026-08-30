import Link from "next/link";
import { footerNav } from "@/content/nav";
import { company } from "@/content/company";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-silver">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-graphite text-white">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <span className="font-heading text-xl font-bold tracking-tight text-white">
              DAXAR ENTERPRISES
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Federal construction and project execution focused on disciplined
              planning, quality, accountability, and reliable delivery.
            </p>
          </div>

          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Capabilities" links={footerNav.capabilities} />
          <FooterColumn title="Federal" links={footerNav.federal} />

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-silver">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.phonePrimaryHref} className="hover:text-white">
                  {company.phonePrimary}
                </a>
              </li>
              <li>
                <a href={company.phoneSecondaryHref} className="hover:text-white">
                  {company.phoneSecondary}
                </a>
              </li>
              <li className="pt-1 text-white/60">CAGE: {company.cage}</li>
            </ul>

            <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-silver">
              Additional Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNav.additionalServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Daxar Enterprises LLC. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-white/60 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
