export default function About() {
  return (
    <section id="about" className="relative border-t border-ink-600">
      <div className="absolute inset-0 bg-grid-fine opacity-50 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <div className="reveal flex items-center gap-3 font-mono text-[11px] tracking-widest text-paper-300">
              <span className="text-signal">§ 01</span>
              <span>ABOUT</span>
              <span className="block h-px flex-1 bg-ink-500/80" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <div className="space-y-8 text-paper-100">
              <p className="reveal font-display text-3xl leading-tight text-paper-50 md:text-5xl" data-delay="1">
                I work where aerial imagery meets machine learning.
              </p>

              <div className="reveal max-w-2xl space-y-6 text-lg leading-relaxed text-paper-200 md:text-xl" data-delay="2">
                <p>
                  I co-founded <Inline>Lightspace Labs</Inline>, an AI-powered
                  competitive intelligence SaaS built on Claude. By day I work
                  as a <Inline>photogrammetrist at ESP Associates</Inline>,
                  building AI-assisted automations that wrap legacy survey
                  software.
                </p>
                <p>
                  I am finishing my <Inline>M.S. in Global Health at Duke</Inline>,
                  where my thesis trained ConvNeXt and DeepLabV3+ models on
                  PlanetScope satellite imagery to detect coal-plant emissions
                  in Ulaanbaatar. Before Duke I studied marine biology at UCLA
                  and rowed Division I.
                </p>
                <p>
                  Lately: training models on overhead imagery, wrapping outdated
                  tools in AI, and shipping small things on weekends.
                </p>
              </div>

              <dl className="reveal grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink-500/70 pt-8 font-mono text-[10px] tracking-widest text-paper-300 sm:grid-cols-4" data-delay="3">
                <Stat k="ROLE" v="AI OPERATOR" />
                <Stat k="ROLE" v="PHOTOGRAMMETRIST" />
                <Stat k="DUKE" v="M.S. 2026" />
                <Stat k="UCLA" v="B.S. 2024" />
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Inline({ children }: { children: React.ReactNode }) {
  return <span className="text-paper-50 underline decoration-signal/60 decoration-1 underline-offset-[5px]">{children}</span>;
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-paper-400">{k}</dt>
      <dd className="mt-1 text-paper-100">{v}</dd>
    </div>
  );
}
