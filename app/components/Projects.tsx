import { aiProjects, webProjects, type Project } from "../lib/projects";
import ProjectCard from "./ProjectCard";

type Section = {
  anchor: string;
  number: string;
  label: string;
  headline: string;
  blurb: string;
  data: Project[];
};

const sections: Section[] = [
  {
    anchor: "projects",
    number: "§ 02",
    label: "PROJECTS",
    headline: "Six observations.",
    blurb:
      "A working log of what I have built in AI and machine learning. Live products, research, and experiments. Each entry is dated and linked where available.",
    data: aiProjects,
  },
  {
    anchor: "builds",
    number: "§ 03",
    label: "SELECTED WEB BUILDS",
    headline: "And five sites I built along the way.",
    blurb:
      "Brand work, side projects, and a discovery directory I built for my sister. Hand-rolled, fast, and easy to maintain.",
    data: webProjects,
  },
];

export default function Projects() {
  return (
    <>
      {sections.map((section, sIdx) => (
        <section
          key={section.anchor}
          id={section.anchor}
          className="relative border-t border-ink-600"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
            <header className="mb-12 grid grid-cols-12 gap-x-6">
              <div className="reveal col-span-12 md:col-span-3 flex items-center gap-3 font-mono text-[11px] tracking-widest text-paper-300">
                <span className="text-signal">{section.number}</span>
                <span>{section.label}</span>
                <span className="block h-px flex-1 bg-ink-500/80" />
              </div>
              <div className="reveal col-span-12 md:col-span-9 md:col-start-4" data-delay="1">
                <h2 className="font-display text-4xl leading-tight text-paper-50 md:text-6xl">
                  {section.headline}
                </h2>
                <p className="mt-4 max-w-xl text-lg text-paper-200 md:text-xl">
                  {section.blurb}
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
              {section.data.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  /* unique stagger across sections so reveals don't compress */
                  staggerOffset={sIdx * section.data.length}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
