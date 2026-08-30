type ValueCardProps = {
  title: string;
  description: string;
};

export default function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="border-l-2 border-sea pl-5">
      <h3 className="font-heading text-base font-semibold text-graphite">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-graphite/70">{description}</p>
    </div>
  );
}
