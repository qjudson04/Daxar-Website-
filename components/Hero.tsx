import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import BlueprintPattern from "@/components/graphics/BlueprintPattern";

type HeroCta = {
  label: string;
  href: string;
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  size?: "large" | "compact";
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "center" | "top";
};

export default function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  size = "large",
  imageSrc,
  imageAlt,
  imagePosition = "center",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-graphite text-white">
      <div className="absolute inset-0">
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              className={cn("object-cover", imagePosition === "top" && "object-top")}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-ocean via-graphite to-graphite" />
            <BlueprintPattern className="absolute inset-0 h-full w-full" variant="dark" />
          </>
        )}
      </div>

      <div
        className={cn(
          "container-page relative",
          size === "large" ? "py-24 sm:py-32 lg:py-40" : "py-16 sm:py-20 lg:py-24",
        )}
      >
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sea">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-heading font-bold tracking-tight text-white",
              size === "large"
                ? "text-4xl sm:text-5xl lg:text-6xl"
                : "text-3xl sm:text-4xl lg:text-5xl",
            )}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            {description}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center rounded bg-sea px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-federal"
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}

          {imageSrc ? (
            <p className="mt-8 text-xs text-white/50">Illustrative photography.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
