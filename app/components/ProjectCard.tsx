import Link from "next/link";
import type { Project } from "../lib/projects";
import ProjectGlyph from "./ProjectGlyph";

const STATUS_STYLES: Record<string, string> = {
  LIVE: "text-signal",
  RESEARCH: "text-paper-200",
  "IN BUILD": "text-paper-200",
  PROTOTYPE: "text-paper-300",
  PUBLISHED: "text-paper-200",
};

type Props = { project: Project; index: number; staggerOffset?: number };

export default function ProjectCard({ project, index, staggerOffset = 0 }: Props) {
  const isFeature = index === 0 || index === 3;
  return (
    <article
      className={`reveal group relative overflow-hidden border border-ink-600 bg-ink-800/40 transition-colors hover:border-signal/60 hover:bg-ink-800/70 ${
        isFeature ? "lg:col-span-7" : "lg:col-span-5"
      }`}
      data-delay={((index + staggerOffset) % 6) + 1}
    >
      <span className="fiducial fiducial-tl" />
      <span className="fiducial fiducial-tr" />
      <span className="fiducial fiducial-bl" />
      <span className="fiducial fiducial-br" />

      <div className="relative grid grid-cols-12 gap-x-4 p-7 md:p-10">
        {/* Header row: id + status */}
        <div className="col-span-12 mb-6 flex items-center justify-between font-mono text-[10px] tracking-widest text-paper-300">
          <span>
            <span className="text-signal">LOG /</span> {project.id}
          </span>
          <span className={STATUS_STYLES[project.status] ?? "text-paper-200"}>
            ● {project.status}
          </span>
        </div>

        {/* Glyph */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <div className="relative aspect-square w-full max-w-[200px] border border-ink-600 bg-ink-900/60 p-3 hatch">
            <ProjectGlyph glyph={project.glyph} className="h-full w-full" />
            <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-widest text-paper-400">
              FRAME {project.id}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="col-span-12 md:col-span-8 lg:col-span-8 mt-6 md:mt-0">
          <h3 className="font-display text-4xl leading-[0.95] text-paper-50 md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl font-display text-lg italic text-signal/90 md:text-xl">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper-200">
            {project.description}
          </p>

          {project.metric && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink-500/70 pt-5 font-mono text-[10px] tracking-widest">
              {project.metric.map((m) => (
                <div key={m.label}>
                  <dt className="text-paper-400">{m.label}</dt>
                  <dd className="mt-1 text-base font-normal text-signal">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] tracking-widest text-paper-300">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-ink-500/80 px-2 py-1 text-paper-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-6 border-t border-ink-500/70 pt-5 font-mono text-[10px] tracking-widest text-paper-300">
            {project.role && (
              <span>
                <span className="text-paper-400">ROLE / </span>
                {project.role.toUpperCase()}
              </span>
            )}
            <span>
              <span className="text-paper-400">YEAR / </span>
              {project.year}
            </span>
            {project.caseStudy ? (
              <Link
                href={project.caseStudy}
                className="ml-auto inline-flex items-center gap-2 text-paper-100 transition-colors hover:text-signal"
              >
                READ THE LOG <span className="text-signal">→</span>
              </Link>
            ) : project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center gap-2 text-paper-100 transition-colors hover:text-signal"
              >
                VISIT <span className="text-signal">↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
