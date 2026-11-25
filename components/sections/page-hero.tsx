import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
};

export function PageHero({ eyebrow, title, lede }: PageHeroProps) {
  return (
    <section className="bg-gradient-to-b from-cream to-cement-100/60">
      <div className="container-tight pb-14 pt-10 md:pb-20 md:pt-14">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-5 max-w-4xl text-balance text-[2.25rem] sm:text-5xl md:text-6xl">{title}</h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal/75">{lede}</p>
        )}
      </div>
    </section>
  );
}
