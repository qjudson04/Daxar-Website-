import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <fieldset className="border-t border-silver pt-8 first:border-t-0 first:pt-0">
      <legend className="w-full">
        <span className="font-heading text-lg font-semibold text-ocean">{title}</span>
        {description ? (
          <span className="mt-1 block text-sm font-normal text-graphite/60">{description}</span>
        ) : null}
      </legend>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
