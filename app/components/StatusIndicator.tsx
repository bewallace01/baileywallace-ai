type Props = {
  label?: string;
  tone?: "signal" | "neutral";
};

export default function StatusIndicator({ label = "ONLINE", tone = "signal" }: Props) {
  const dot =
    tone === "signal"
      ? "bg-signal animate-pulse-dot shadow-[0_0_12px_rgba(232,154,79,0.6)]"
      : "bg-paper-300 animate-pulse-dot";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-paper-200">
      <span className={`block h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}
