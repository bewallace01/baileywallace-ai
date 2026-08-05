import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coal Plume Detection",
  description:
    "Two-stage deep learning on 3 m PlanetScope imagery to detect and delineate coal-plant plumes, and a measurement of how much accuracy survives moving to a city the model never saw.",
};

export default function CaseStudy() {
  return (
    <main className="relative isolate min-h-screen bg-ink-900 bg-grain">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:px-12 md:py-28">
        {/* Masthead */}
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
          <span className="text-signal">LOG / 04</span>
          <span>CASE STUDY</span>
          <span className="block h-px flex-1 bg-ink-500/80" />
          <span className="text-paper-400">M.S. THESIS, DUKE</span>
        </div>

        <h1 className="mt-8 font-display text-5xl leading-[0.95] tracking-tightest text-paper-50 md:text-7xl">
          Detecting what a satellite
          <br />
          can barely see<span className="text-signal">.</span>
        </h1>

        <p className="mt-8 font-display text-xl italic leading-snug text-signal/90 md:text-2xl">
          The headline result is not the accuracy. It is how much of the
          accuracy survived moving to a city the model had never seen.
        </p>

        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-y border-ink-500/70 py-6 font-mono text-[10px] tracking-widest">
          <Metric k="F1" v="0.933" />
          <Metric k="RECALL" v="1.000" />
          <Metric k="PIXEL ACC" v="95.9%" />
          <Metric k="IOU, TRAINED CITY" v="0.448" />
          <Metric k="IOU, NEW CITY" v="0.319" />
        </dl>

        <Section n="01" title="The problem">
          <P>
            Ulaanbaatar burns coal to survive its winter. Combined heat and
            power plants run flat out through a season that regularly reaches
            thirty below, and the resulting air quality is among the worst of
            any capital city in the world. Knowing when a plant is emitting,
            and how far that plume travels, matters for anyone modeling who is
            actually breathing it.
          </P>
          <P>
            Ground instrumentation is sparse and reporting is inconsistent.
            Satellites, on the other hand, pass over every plant every day. So
            the question was narrow and testable: can freely repeating 3 m
            multispectral imagery reliably tell you that a plume is present,
            and where it extends?
          </P>
        </Section>

        <Section n="02" title="Why it is hard">
          <P>
            Three metres per pixel sounds generous until you try to segment
            smoke. A plume has no edge. It leaves the stack opaque and
            dissolves into haze over a few hundred metres, and the point where
            you stop calling it plume is a judgment call rather than a
            measurement.
          </P>
          <P>
            Winter makes it worse. The background is snow and industrial haze,
            which is bright and textured in the same bands the plume is. And
            there is no public labeled dataset for this task. If you want
            ground truth, you draw it yourself.
          </P>
        </Section>

        <Section n="03" title="Approach">
          <P>
            Two stages, deliberately separated. A ConvNeXt Large classifier
            answers whether a scene contains a plume at all. A DeepLabV3+ model
            with a ResNet-101 encoder then answers which pixels belong to it.
          </P>
          <P>
            Splitting the task means the segmentation model only ever sees
            scenes that actually contain a plume, so none of its capacity goes
            into learning to output empty masks. It also produces two failure
            modes that can be read independently: missing a plume entirely, and
            getting its extent wrong. Those have very different consequences
            downstream, and collapsing them into one number hides which is
            happening.
          </P>
        </Section>

        <Section n="04" title="The dataset was the project">
          <P>
            109 scenes, hand-annotated and spatially QC&rsquo;d. Built, not
            inherited. That one sentence covers most of the calendar.
          </P>
          <P>
            The work was deciding what counts as plume, applying that
            definition consistently across scenes captured under different sun
            angles and snow cover, and then verifying every annotation was
            spatially aligned to its source imagery. Label quality and scene
            selection moved final performance more than the choice of
            architecture did, which is not the lesson I expected going in.
          </P>
        </Section>

        <Section n="05" title="Results, and what they actually say">
          <P>
            Classification reached an F1 of 0.933 with perfect recall.
            Segmentation reached 95.9% pixel accuracy.
          </P>
          <P>
            The classification numbers are worth reading together rather than
            separately. Recall of 1.000 against an F1 of 0.933 implies
            precision near 0.87. In plain terms: the model never missed a
            plume, and roughly one in eight scenes it flagged did not contain
            one.
          </P>
          <P>
            For a screening tool that is the correct side to err on. A missed
            plume is an emission event permanently absent from the record. A
            false positive costs a few seconds of human review.
          </P>
        </Section>

        <Section n="06" title="The finding">
          <P>
            The models were trained on Ulaanbaatar and then evaluated on
            Bishkek CHP, a plant in a different country that appeared nowhere
            in training, with no fine-tuning. IoU fell from 0.448 to 0.319, a
            drop of roughly 29%.
          </P>
          <P>
            I led with that number rather than the validation result. A
            segmentation model that reports 95.9% pixel accuracy and stops
            there invites the reader to assume it will work on their city. It
            will not, and the useful question is by how much.
          </P>
          <P>
            Publishing the degradation turns a single-site result into
            something reusable: a measured expectation for what happens when
            this class of model crosses a geography, and a starting point for
            estimating how much local labeling a new site would need before the
            output could be trusted.
          </P>
        </Section>

        <Section n="07" title="What I would do differently">
          <P>
            The two cities are more alike than the general case. Both are
            continental, both cold-season, both combined heat and power. The
            29% drop should be read as a floor for transfer, not a ceiling.
            Moving to a coastal plant, a different fuel, or a summer scene
            would almost certainly cost more.
          </P>
          <P>
            Ground truth for a diffuse object also deserves more than one pair
            of eyes. With a single annotator, IoU is measured against one
            person&rsquo;s judgment of where a plume ends. Multiple annotators
            and a published agreement score would separate model error from
            labeling ambiguity, and I suspect some of the gap I attributed to
            domain shift is really the second thing.
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
          <a
            href="mailto:wallacebailey32@gmail.com"
            className="group inline-flex items-center gap-2 transition-colors hover:text-signal"
          >
            <span className="text-signal">[02]</span>
            <span className="transition-transform group-hover:translate-x-0.5">
              CONTACT
            </span>
          </a>
          <span className="ml-auto text-paper-400">DEFENDED 2026.03.18</span>
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
