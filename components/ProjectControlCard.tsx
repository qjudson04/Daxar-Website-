type ProjectControlCardProps = {
  title: string;
  description: string;
};

export default function ProjectControlCard({ title, description }: ProjectControlCardProps) {
  return (
    <div className="border-t-2 border-sea bg-graphite p-6">
      <h3 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-sea">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{description}</p>
    </div>
  );
}
