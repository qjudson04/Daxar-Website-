import { cn } from "@/lib/utils";

/**
 * Abstract architectural/blueprint-style line pattern used as decorative
 * background texture in place of stock photography. Purely ornamental.
 */
export default function BlueprintPattern({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const stroke = variant === "dark" ? "#ffffff" : "#073b4c";
  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox="0 0 1200 800"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity="0.14" stroke={stroke} strokeWidth="1">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="800" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 100} x2="1200" y2={i * 100} />
        ))}
      </g>
      <g opacity="0.5" stroke={stroke} strokeWidth="1.5">
        <circle cx="900" cy="480" r="140" />
        <line x1="900" y1="340" x2="900" y2="620" />
        <line x1="760" y1="480" x2="1040" y2="480" />
        <path d="M960 120 L1140 120 L1140 300 L1020 300" />
        <line x1="960" y1="120" x2="1140" y2="300" />
        <rect x="820" y="600" width="140" height="120" />
      </g>
    </svg>
  );
}
