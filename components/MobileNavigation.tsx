"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/content/nav";
import { cn } from "@/lib/utils";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="2xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded border border-silver text-graphite"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M4 4L16 16M16 4L4 16"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 5H17M3 10H17M3 15H17"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <div
        id="mobile-nav-panel"
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-30 overflow-y-auto bg-white transition-transform duration-200",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-6">
          {primaryNav.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded px-3 py-3.5 text-base font-medium border-b border-silver/70",
                  isActive ? "text-ocean" : "text-graphite",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded bg-ocean px-5 py-3 text-base font-semibold text-white"
          >
            Contact Daxar
          </Link>
        </nav>
      </div>
    </div>
  );
}
