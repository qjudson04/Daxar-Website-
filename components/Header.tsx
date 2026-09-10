"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="container-page flex h-20 items-center justify-between gap-2 xl:gap-3 2xl:gap-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/brand/daxar-logo.png"
            alt="Daxar Enterprises LLC"
            width={1690}
            height={438}
            priority
            className="h-9 w-auto lg:h-10 2xl:h-14"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-0 2xl:gap-1">
          {primaryNav.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded px-1.5 py-2 text-xs font-medium transition-colors xl:px-2 2xl:px-3 2xl:text-sm",
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

        <div className="hidden shrink-0 lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center whitespace-nowrap rounded bg-ocean px-2.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-federal 2xl:px-5 2xl:py-2.5 2xl:text-sm"
          >
            Contact Daxar
          </Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
