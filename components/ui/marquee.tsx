import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Speed preset */
  speed?: "fast" | "slow";
  className?: string;
  /** Repeat count to fill viewport — needs to be enough that the loop never shows empty space. */
  repeat?: number;
};

/**
 * Editorial ribbon marquee.
 * Renders the children N times in a row and translates -50% via CSS keyframe,
 * so the loop is seamless. Pure CSS — no JS rAF.
 */
export function Marquee({
  children,
  speed = "slow",
  className = "",
  repeat = 8,
}: Props) {
  const items = Array.from({ length: repeat });
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div
        className={`flex w-max ${
          speed === "fast" ? "animate-marquee" : "animate-marquee-slow"
        }`}
      >
        {items.map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
