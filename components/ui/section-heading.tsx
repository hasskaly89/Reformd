import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  /** Right-aligned slot on desktop (link, short copy) */
  aside?: ReactNode;
  tone?: "dark" | "light";
};

/** Standard section header: same left edge, same scale, everywhere. */
export function SectionHeading({ eyebrow, title, aside, tone = "dark" }: Props) {
  const light = tone === "light";
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
      <div className="max-w-2xl">
        <p className={`eyebrow ${light ? "!text-cement" : ""}`}>{eyebrow}</p>
        <h2
          className={`mt-4 text-balance text-4xl md:text-5xl ${light ? "!text-cream" : ""}`}
        >
          {title}
        </h2>
      </div>
      {aside && <div className="shrink-0 md:max-w-xs md:pb-1">{aside}</div>}
    </div>
  );
}
