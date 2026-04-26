import Image from "next/image";

type Props = {
  /** Path under /public, e.g. "/images/hero/cecil-hills-1.jpg". When unset, a placeholder renders. */
  src?: string;
  /** Alt text. Required when src is set. */
  alt?: string;
  /** Aspect ratio — Tailwind class, e.g. "aspect-[4/5]" */
  aspect?: string;
  /** Tonal variant for the placeholder */
  tone?: "warm" | "stone" | "dark";
  /** Free-form label rendered in the placeholder, e.g. "Hero · interior" */
  label?: string;
  /** Suggested filename / dimensions, rendered as fine print in the placeholder */
  hint?: string;
  className?: string;
  /** Pass-through to Next/Image */
  priority?: boolean;
  /** Object-fit when image present */
  fit?: "cover" | "contain";
};

const TONE_BG: Record<NonNullable<Props["tone"]>, string> = {
  warm:
    "bg-[radial-gradient(circle_at_30%_25%,#cec6ba_0%,#bfb8a8_45%,#a89e8b_100%)]",
  stone:
    "bg-[radial-gradient(circle_at_70%_30%,#cec6ba_0%,#a89e8b_55%,#736756_100%)]",
  dark:
    "bg-[radial-gradient(circle_at_30%_30%,#5e4b40_0%,#4f3e33_55%,#2a2520_100%)]",
};

const TONE_TEXT: Record<NonNullable<Props["tone"]>, string> = {
  warm: "text-brown/70",
  stone: "text-brown/80",
  dark: "text-cream/75",
};

/**
 * A graceful image slot. Drop a real image into /public and pass `src`,
 * or leave it empty and a tonal placeholder renders showing the label
 * and any filename hint — a polite reminder to drop content here later.
 */
export function ImageSlot({
  src,
  alt,
  aspect = "aspect-[4/5]",
  tone = "warm",
  label,
  hint,
  className = "",
  priority,
  fit = "cover",
}: Props) {
  const wrapperBase =
    "relative isolate overflow-hidden grain-light " + aspect + " " + className;

  if (src) {
    return (
      <div className={wrapperBase}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={fit === "cover" ? "object-cover" : "object-contain"}
        />
      </div>
    );
  }

  return (
    <div className={`${wrapperBase} ${TONE_BG[tone]}`}>
      <div className="absolute inset-0 z-[2] flex flex-col items-start justify-between p-6">
        {label && (
          <span
            className={`text-[10px] uppercase tracking-[0.25em] ${TONE_TEXT[tone]}`}
          >
            {label}
          </span>
        )}
        <div className="flex items-end justify-between gap-4 self-stretch">
          <span
            className={`text-[10px] uppercase tracking-[0.25em] ${TONE_TEXT[tone]}`}
          >
            Image · drop in
          </span>
          {hint && (
            <span
              className={`text-right text-[10px] tracking-[0.1em] ${TONE_TEXT[tone]}`}
            >
              {hint}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
