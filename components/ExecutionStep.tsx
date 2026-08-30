type ExecutionStepProps = {
  number: string;
  title: string;
  items: string[];
};

export default function ExecutionStep({ number, title, items }: ExecutionStepProps) {
  return (
    <div className="relative border border-silver bg-white p-6">
      <span className="font-heading text-4xl font-bold text-silver">{number}</span>
      <h3 className="mt-2 font-heading text-xl font-semibold text-ocean">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-graphite/75">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sea" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
