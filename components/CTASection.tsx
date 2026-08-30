import Link from "next/link";

type CTAAction = {
  label: string;
  href: string;
};

type CTASectionProps = {
  title: string;
  description?: string;
  primary: CTAAction;
  secondary?: CTAAction;
};

export default function CTASection({ title, description, primary, secondary }: CTASectionProps) {
  return (
    <section className="bg-ocean">
      <div className="container-page flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-white/80">{description}</p>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={primary.href}
            className="inline-flex items-center justify-center rounded bg-white px-6 py-3.5 text-sm font-semibold text-ocean transition-colors hover:bg-silver"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center rounded border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
