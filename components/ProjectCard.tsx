import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border border-silver bg-white">
      <div className="border-b border-silver bg-graphite p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sea">
          {project.scopeLabel}
        </p>
        <h3 className="mt-2 font-heading text-2xl font-bold text-white">{project.name}</h3>
        <p className="mt-1 text-sm text-white/70">{project.location}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-graphite/50">
            Role
          </h4>
          <p className="mt-2 text-sm text-graphite/80">{project.role}</p>

          {project.siteSize ? (
            <>
              <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-graphite/50">
                Site
              </h4>
              <p className="mt-2 text-sm text-graphite/80">{project.siteSize}</p>
            </>
          ) : null}

          <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-graphite/50">
            Scope
          </h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.scope.map((item) => (
              <li
                key={item}
                className="rounded-sm bg-silver/50 px-2.5 py-1 text-xs font-medium text-graphite/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-graphite/50">
            Project Management Responsibilities
          </h4>
          <ul className="mt-2 space-y-1.5">
            {project.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-graphite/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sea" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-silver bg-silver/20 p-6">
        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-graphite/50">
          Performance
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-graphite/80">{project.performance}</p>
      </div>
    </article>
  );
}
