type CapabilityCardProps = {
  title: string;
  description: string;
  naics?: string[];
  note?: string;
};

export default function CapabilityCard({ title, description, naics, note }: CapabilityCardProps) {
  return (
    <div className="flex h-full flex-col border border-silver bg-white p-6">
      <h3 className="font-heading text-lg font-semibold text-graphite">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite/75">{description}</p>
      {note ? <p className="mt-3 text-sm italic text-graphite/60">{note}</p> : null}
      {naics && naics.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-silver pt-4">
          {naics.map((code) => (
            <span
              key={code}
              className="rounded-sm bg-silver/50 px-2 py-1 text-xs font-medium text-federal"
            >
              NAICS {code}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
