import StatusIndicator from "./StatusIndicator";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-ink-600 bg-ink-950">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="reveal col-span-12 md:col-span-3 flex items-center gap-3 font-mono text-[11px] tracking-widest text-paper-300">
            <span className="text-signal">§ 04</span>
            <span>CONTACT</span>
            <span className="block h-px flex-1 bg-ink-500/80" />
          </div>

          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <p className="reveal font-display text-4xl leading-tight text-paper-50 md:text-6xl">
              Working on something at the intersection of <em className="text-signal not-italic">AI</em> and{" "}
              <em className="text-signal not-italic">overhead imagery</em>? Let&rsquo;s talk.
            </p>

            <div className="reveal mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2" data-delay="1">
              <Channel
                label="EMAIL"
                value="wallacebailey32@gmail.com"
                href="mailto:wallacebailey32@gmail.com"
              />
              <Channel
                label="LINKEDIN"
                value="linkedin.com/in/baileyywallace"
                href="https://www.linkedin.com/in/baileyywallace"
              />
              <Channel
                label="COMPANY"
                value="lightspacelabs.com"
                href="https://lightspacelabs.com"
              />
              <Channel
                label="OBSERVATORY"
                value="lightsky.ai"
                href="https://lightsky.ai"
              />
            </div>
          </div>
        </div>

        <div className="reveal mt-24 flex flex-wrap items-center justify-between gap-y-4 border-t border-ink-500/70 pt-6 font-mono text-[10px] tracking-widest text-paper-400">
          <span>© {new Date().getFullYear()} BAILEY WALLACE</span>
          <span className="hidden sm:inline">35.2271° N / 80.8431° W</span>
          <StatusIndicator label="END OF TRANSMISSION" />
        </div>
      </div>
    </footer>
  );
}

function Channel({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group block border-t border-ink-500/70 pt-5 transition-colors hover:border-signal/70"
    >
      <div className="font-mono text-[10px] tracking-widest text-paper-400">{label}</div>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <span className="font-display text-2xl text-paper-50 md:text-3xl">{value}</span>
        <span className="text-signal opacity-0 transition-opacity group-hover:opacity-100">↗</span>
      </div>
    </a>
  );
}
