type LeadershipArea = {
  title: string;
  description: string;
};

export default function LeadershipSection({ areas }: { areas: LeadershipArea[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {areas.map((area) => (
        <div key={area.title} className="border border-silver bg-white p-6">
          <h3 className="font-heading text-base font-semibold text-ocean">{area.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-graphite/75">{area.description}</p>
        </div>
      ))}
    </div>
  );
}
