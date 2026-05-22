import { projects } from "../lib/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="relative border-t border-ink-600">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
        <header className="mb-12 grid grid-cols-12 gap-x-6">
          <div className="reveal col-span-12 md:col-span-3 flex items-center gap-3 font-mono text-[11px] tracking-widest text-paper-300">
            <span className="text-signal">§ 02</span>
            <span>PROJECTS</span>
            <span className="block h-px flex-1 bg-ink-500/80" />
          </div>
          <div className="reveal col-span-12 md:col-span-9 md:col-start-4" data-delay="1">
            <h2 className="font-display text-4xl leading-tight text-paper-50 md:text-6xl">
              Six observations.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-paper-200 md:text-xl">
              A working log of what I have built. Live products, research, and
              experiments. Each entry is dated and linked where available.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
