import StatusIndicator from "./StatusIndicator";
import { projects } from "../lib/projects";

/**
 * Both of these used to be typed by hand and went stale: the page advertised
 * a last-update of 2026.05.22 next to a live TRANSMITTING indicator. Derive
 * them instead. This is a server component and the page is static, so the
 * date is stamped at build time and refreshes on every deploy.
 */
const LOG_ENTRIES = String(projects.length);
const LAST_UPDATE = new Date()
  .toISOString()
  .slice(0, 10)
  .replace(/-/g, ".");

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-halo pointer-events-none" aria-hidden />

      {/* Top transmission bar */}
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 md:px-12">
        <div className="font-mono text-[10px] tracking-widest text-paper-300 animate-fade-in">
          BW / OBSERVATORY
        </div>
        <div className="hidden md:block">
          <StatusIndicator label="TRANSMITTING" />
        </div>
        <div className="font-mono text-[10px] tracking-widest text-paper-300 animate-fade-in">
          v 1.0
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-12 md:pb-40 md:pt-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {/* Name */}
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display font-light leading-[0.85] tracking-tightest text-paper-50">
              <span className="block animate-fade-up text-[19vw] sm:text-[15vw] md:text-[14vw] lg:text-[13.5vw]">
                Bailey
              </span>
              <span
                className="block animate-fade-up text-[19vw] sm:text-[15vw] md:text-[14vw] lg:text-[13.5vw]"
                style={{ animationDelay: "0.18s", opacity: 0, animationFillMode: "forwards" }}
              >
                Wallace<span className="text-signal">.</span>
              </span>
            </h1>
          </div>

          {/* Telemetry block */}
          <aside
            className="col-span-12 md:col-span-3 md:pt-6 animate-fade-up"
            style={{ animationDelay: "0.45s", opacity: 0, animationFillMode: "forwards" }}
          >
            <div className="border-t border-ink-500/70 pt-4">
              <dl className="space-y-3 font-mono text-[10px] tracking-widest text-paper-300">
                <Row k="STATION" v="CHARLOTTE, NC" />
                <Row k="LAT" v="35.2271° N" />
                <Row k="LON" v="80.8431° W" />
                <Row k="LOG ENTRIES" v={LOG_ENTRIES} />
                <Row k="LAST UPDATE" v={LAST_UPDATE} />
              </dl>
            </div>
          </aside>

          {/* Tagline */}
          <p
            className="col-span-12 md:col-span-8 md:col-start-1 font-display text-2xl leading-snug text-paper-100 md:text-4xl animate-fade-up"
            style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
          >
            I build <em className="text-signal not-italic">AI systems</em> that
            see the world from above. Satellite imagery, aerial photogrammetry,
            and lidar are my native data formats.
          </p>

          {/* Anchor links */}
          <nav
            className="col-span-12 mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink-500/70 pt-6 font-mono text-[11px] tracking-widest text-paper-200 animate-fade-up"
            style={{ animationDelay: "0.78s", opacity: 0, animationFillMode: "forwards" }}
          >
            <a className="group inline-flex items-center gap-2 hover:text-signal transition-colors" href="#about">
              <span className="text-signal">[01]</span>
              <span className="group-hover:translate-x-0.5 transition-transform">ABOUT</span>
            </a>
            <a className="group inline-flex items-center gap-2 hover:text-signal transition-colors" href="#projects">
              <span className="text-signal">[02]</span>
              <span className="group-hover:translate-x-0.5 transition-transform">PROJECTS</span>
            </a>
            <a className="group inline-flex items-center gap-2 hover:text-signal transition-colors" href="#builds">
              <span className="text-signal">[03]</span>
              <span className="group-hover:translate-x-0.5 transition-transform">BUILDS</span>
            </a>
            <a className="group inline-flex items-center gap-2 hover:text-signal transition-colors" href="#contact">
              <span className="text-signal">[04]</span>
              <span className="group-hover:translate-x-0.5 transition-transform">CONTACT</span>
            </a>
            <a
              className="group ml-auto inline-flex items-center gap-2 border border-ink-500/80 px-3 py-1.5 text-paper-100 transition-colors hover:border-signal/60 hover:text-signal"
              href="/bailey-wallace-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <span>RESUME</span>
              <span className="text-signal">↓</span>
            </a>
            <a
              className="group inline-flex items-center gap-2 hover:text-signal transition-colors"
              href="https://lightspacelabs.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>LIGHTSPACELABS.COM</span>
              <span className="text-signal">↗</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-paper-400">{k}</dt>
      <dd className="text-paper-100">{v}</dd>
    </div>
  );
}
