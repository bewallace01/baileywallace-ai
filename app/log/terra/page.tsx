import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terra",
  description:
    "A build log: turning satellite imagery into construction draw verification, one hexagonal cell at a time. Two of three agents running, and the honest state of the third.",
};

export default function CaseStudy() {
  return (
    <main className="relative isolate min-h-screen bg-ink-900 bg-grain">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:px-12 md:py-28">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-paper-300 transition-colors hover:text-signal"
        >
          <span className="text-signal">←</span>
          <span className="transition-transform group-hover:-translate-x-0.5">
            BW / OBSERVATORY
          </span>
        </Link>

        <div className="mt-14 flex items-center gap-3 font-mono text-[11px] tracking-widest text-paper-300">
          <span className="text-signal">LOG / 03</span>
          <span>BUILD LOG</span>
          <span className="block h-px flex-1 bg-ink-500/80" />
          <span className="text-paper-400">IN BUILD</span>
        </div>

        <h1 className="mt-8 font-display text-5xl leading-[0.95] tracking-tightest text-paper-50 md:text-7xl">
          Reading a building site
          <br />
          from orbit<span className="text-signal">.</span>
        </h1>

        <p className="mt-8 font-display text-xl italic leading-snug text-signal/90 md:text-2xl">
          This one is unfinished, and the log says so. Two of three agents run
          on real imagery today. The third is scaffolding.
        </p>

        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-y border-ink-500/70 py-6 font-mono text-[10px] tracking-widest">
          <Metric k="GRID" v="H3 r13" />
          <Metric k="CELL EDGE" v="~3.7 m" />
          <Metric k="FEATURE VECTOR" v="20-dim" />
          <Metric k="MATERIAL CLASSES" v="25" />
          <Metric k="SATELLITE FEEDS" v="3" />
        </dl>

        <Section n="01" title="The problem">
          <P>
            A construction loan does not pay out all at once. It releases in
            draws, and each draw is supposed to be verified: did the work the
            borrower is claiming actually happen? Today a lender answers that
            by sending a person to stand on the site with a clipboard and a
            camera.
          </P>
          <P>
            That visit costs somewhere between a few hundred and a couple of
            thousand dollars, and because of the cost it happens rarely. A
            lender with dozens of active projects is making release decisions
            on evidence that is weeks old and thin. Satellites pass over every
            one of those sites on a schedule, for free.
          </P>
        </Section>

        <Section n="02" title="Why not one big model">
          <P>
            The obvious approach is to train a single model that eats imagery
            and emits a verdict. I did not want that, for two reasons.
          </P>
          <P>
            The first is evidence. A lender releasing money needs to know
            <em className="not-italic text-paper-100"> why</em>, and a single
            end-to-end model gives you a number with no traceable path back to
            the pixels. The second is debugging. When one model does
            everything, a wrong answer tells you nothing about which part was
            wrong.
          </P>
          <P>
            So the pipeline is three agents with a written contract between
            them: ingestion turns imagery into a structured grid, classification
            labels the grid, analysis reasons over the labels. Each stage
            persists its output to GeoParquet, so any claim in a final report
            can be walked backwards to the cells that produced it.
          </P>
        </Section>

        <Section n="03" title="The cell is the unit of analysis">
          <P>
            Everything is indexed to an H3 hexagonal grid at resolution 13,
            roughly a 3.7 metre edge. Every cell carries its position, its
            capture date, which satellites contributed to it, a cloud
            percentage, and a 20-dimensional feature vector.
          </P>
          <P>
            The vector comes from Clay, a geospatial foundation model, rather
            than from hand-designed spectral indices. Three feeds fuse into
            each cell through a STAC catalog: Sentinel-2 optical, Sentinel-1
            synthetic aperture radar, and Landsat. SAR matters more than it
            sounds like it should, because it sees through the cloud cover that
            makes optical-only monitoring unreliable exactly when you need it.
          </P>
          <P>
            Choosing the hex grid as the primitive is the decision the whole
            project rests on. It means every later stage operates on a
            consistent, joinable spatial unit, and comparing this month to last
            month is a join rather than an image registration problem.
          </P>
        </Section>

        <Section n="04" title="Reading height from shadows">
          <P>
            Construction progress is mostly vertical, and vertical is the thing
            a nadir-looking satellite cannot see directly. The workaround is
            geometry: compute the sun&rsquo;s elevation and azimuth at the exact
            moment of the satellite overpass, find the shadow, and the shadow
            length gives you the height of whatever cast it.
          </P>
          <P>
            That path is built. Classification tags shadow cells and estimates
            an above-ground height for the object casting each one. It is the
            part of this project I find most satisfying, because it gets a third
            dimension out of a two-dimensional image using nothing but
            arithmetic and the position of the sun.
          </P>
        </Section>

        <Section n="05" title="Where it actually stands">
          <P>
            <strong className="font-normal text-paper-100">
              Agent 1, ingestion, runs.
            </strong>{" "}
            It pulls from the STAC catalog, filters scenes above 40% cloud,
            builds the hex grid, embeds every cell, and writes GeoParquet. An
            end-to-end test asserts a real run produces the expected cell count
            with no null feature vectors. There are outputs on disk from live
            runs over a real site.
          </P>
          <P>
            <strong className="font-normal text-paper-100">
              Agent 2, classification, runs.
            </strong>{" "}
            It assigns one of 25 material classes per cell with a calibrated
            confidence and a full probability vector, rolls those up into six
            simplified classes, and computes the solar geometry and shadow
            heights above. Object classification is defined but not trained:
            twenty classes exist and version zero returns
            <span className="font-mono text-[13px] text-signal"> unknown</span>{" "}
            for all of them.
          </P>
          <P>
            <strong className="font-normal text-paper-100">
              Agent 3, analysis and reporting, does not run.
            </strong>{" "}
            Vertical progress, change detection, and the report writer are
            one-line stubs behind a fourteen-line scaffold. The thing a lender
            would actually receive does not exist yet. That is the next build.
          </P>
        </Section>

        <Section n="06" title="The open question">
          <P>
            The unresolved design decision is how much reasoning to hand the
            model versus encode in the representation upstream.
          </P>
          <P>
            A rich enough feature vector plus a well-labeled grid might let a
            small amount of reasoning produce the report, with most of the work
            done before any language model sees anything. Or the grid might be
            the wrong altitude entirely, and what the report needs is an agent
            reasoning over relationships between cells: this crane stands beside
            this slab, this excavation connects to this access road.
          </P>
          <P>
            I do not know yet, and I would rather measure it than argue about
            it. That is what Agent 3 is really for.
          </P>
        </Section>

        <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink-500/70 pt-8 font-mono text-[11px] tracking-widest text-paper-200">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 transition-colors hover:text-signal"
          >
            <span className="text-signal">[01]</span>
            <span className="transition-transform group-hover:translate-x-0.5">
              ALL PROJECTS
            </span>
          </Link>
          <Link
            href="/log/coal-plume-detection"
            className="group inline-flex items-center gap-2 transition-colors hover:text-signal"
          >
            <span className="text-signal">[02]</span>
            <span className="transition-transform group-hover:translate-x-0.5">
              COAL PLUME DETECTION
            </span>
          </Link>
          <a
            href="mailto:wallacebailey32@gmail.com"
            className="group inline-flex items-center gap-2 transition-colors hover:text-signal"
          >
            <span className="text-signal">[03]</span>
            <span className="transition-transform group-hover:translate-x-0.5">
              CONTACT
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest text-paper-300">
        <span className="text-signal">§ {n}</span>
        <span>{title.toUpperCase()}</span>
        <span className="block h-px flex-1 bg-ink-500/80" />
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-[17px] leading-relaxed text-paper-200 first:mt-0">
      {children}
    </p>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-paper-400">{k}</dt>
      <dd className="mt-1 text-base font-normal text-signal">{v}</dd>
    </div>
  );
}
