import { company } from "@/content/company";
import { cn } from "@/lib/utils";

type FederalInfoPanelProps = {
  tone?: "light" | "dark";
  className?: string;
};

export default function FederalInfoPanel({ tone = "light", className }: FederalInfoPanelProps) {
  const rows = [
    { label: "CAGE Code", value: company.cage },
    { label: "UEI", value: company.uei },
    { label: "SAM.gov Registration", value: company.samStatus },
    { label: "Primary NAICS", value: company.naicsPrimary.code },
    { label: "Coverage", value: company.coverage },
  ];

  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-5",
        tone === "light" ? "border-silver bg-silver" : "border-white/15 bg-white/15",
        className,
      )}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          className={cn("p-5", tone === "light" ? "bg-white" : "bg-graphite")}
        >
          <dt
            className={cn(
              "text-[0.65rem] font-semibold uppercase tracking-[0.15em]",
              tone === "light" ? "text-graphite/55" : "text-white/55",
            )}
          >
            {row.label}
          </dt>
          <dd
            className={cn(
              "mt-1.5 font-heading text-lg font-bold",
              tone === "light" ? "text-ocean" : "text-white",
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
