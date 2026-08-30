"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/content/nav";
import { cn } from "@/lib/utils";
import MobileNavigation from "@/components/MobileNavigation";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled
          ? "border-silver bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "border-transparent bg-white",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="font-heading text-xl font-bold tracking-tight text-ocean sm:text-2xl">
            DAXAR
          </span>
          <span className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-federal">
            Enterprises LLC
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden 2xl:flex 2xl:items-center 2xl:gap-1">
          {primaryNav.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-ocean"
                    : "text-graphite/80 hover:text-ocean",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 2xl:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded bg-ocean px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-federal"
          >
            Contact Daxar
          </Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
