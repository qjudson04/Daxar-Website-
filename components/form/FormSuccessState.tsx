type FormSuccessStateProps = {
  title: string;
  message: string;
};

export default function FormSuccessState({ title, message }: FormSuccessStateProps) {
  return (
    <div role="status" className="border border-sea bg-sea/5 p-8 text-center sm:p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sea text-white">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 10.5L8 14.5L16 5.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-5 font-heading text-2xl font-bold text-graphite">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-graphite/70">{message}</p>
    </div>
  );
}
