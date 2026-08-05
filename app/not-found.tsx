import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signal lost",
};

/**
 * Stock Next.js 404 is a white page, which breaks the aesthetic hard on the
 * one screen where a visitor is already slightly lost. Keep them in the
 * observatory and give them one obvious way back.
 */
export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen items-center bg-ink-900 bg-grain">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-halo pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest text-paper-300">
          <span className="text-signal">§ 404</span>
          <span>SIGNAL LOST</span>
          <span className="block h-px w-24 bg-ink-500/80" />
        </div>

        <h1 className="mt-10 font-display text-6xl leading-[0.9] tracking-tightest text-paper-50 md:text-8xl">
          Nothing on
          <br />
          this frequency<span className="text-signal">.</span>
        </h1>

        <p className="mt-8 max-w-xl font-display text-xl leading-snug text-paper-200 md:text-2xl">
          That page is not in the log. It may have been renamed, or it never
          transmitted in the first place.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink-500/70 pt-6 font-mono text-[11px] tracking-widest text-paper-200">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 transition-colors hover:text-signal"
          >
            <span className="text-signal">[01]</span>
            <span className="transition-transform group-hover:translate-x-0.5">
              RETURN TO STATION
            </span>
          </Link>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 transition-colors hover:text-signal"
          >
            <span className="text-signal">[02]</span>
            <span className="transition-transform group-hover:translate-x-0.5">
              PROJECTS
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
