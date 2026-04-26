type Props = {
  /** e.g. "01", "02" */
  index: string;
  /** e.g. "More than just a workout" */
  label: string;
  /** Tonal variant */
  tone?: "dark" | "light";
};

/**
 * Editorial section number — small index + uppercase label,
 * rendered in two columns so they line up like a print spread.
 */
export function SectionNumber({ index, label, tone = "dark" }: Props) {
  const numColor = tone === "dark" ? "text-brown" : "text-cream";
  const labelColor = tone === "dark" ? "text-brown/55" : "text-cream/55";
  const ruleColor = tone === "dark" ? "bg-brown/20" : "bg-cream/20";

  return (
    <div className="flex items-center gap-4">
      <span
        className={`tabular text-xs font-medium ${numColor} tracking-[0.05em]`}
      >
        — {index}
      </span>
      <span className={`h-px w-8 ${ruleColor}`} />
      <span
        className={`text-[10px] uppercase tracking-[0.3em] ${labelColor}`}
      >
        {label}
      </span>
    </div>
  );
}
