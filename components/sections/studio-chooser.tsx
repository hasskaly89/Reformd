import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { STUDIO_LIST, type Studio } from "@/lib/constants";

type Props = {
  /** Where each card goes for a given studio */
  href: (s: Studio) => string;
  cta: string;
  external?: boolean;
};

/** Two-up studio picker used by the /schedule, /pricing and /login selector pages. */
export function StudioChooser({ href, cta, external }: Props) {
  return (
    <section className="container-tight section grid gap-6 md:grid-cols-2">
      {STUDIO_LIST.map((s) => {
        const cls =
          "group block overflow-hidden rounded-2xl border border-brown/15 bg-white/60 transition-colors hover:border-brown/40";
        const inner = (
          <>
            <ImageSlot src={s.image} alt={`Reformd Pilates ${s.shortName}`} aspect="aspect-[16/9]" sizes="(min-width: 768px) 50vw, 100vw" />
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <h2 className="text-2xl">{s.shortName}</h2>
                <p className="mt-1 text-sm text-charcoal/70">{s.address}, {s.suburb}</p>
              </div>
              <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-brown px-5 py-3 text-sm font-medium text-cream">
                {cta}
              </span>
            </div>
          </>
        );
        return external ? (
          <a key={s.slug} href={href(s)} target="_blank" rel="noopener noreferrer" className={cls}>
            {inner}
          </a>
        ) : (
          <Link key={s.slug} href={href(s)} className={cls}>
            {inner}
          </Link>
        );
      })}
    </section>
  );
}
