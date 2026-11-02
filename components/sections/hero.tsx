import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { INTRO_OFFER_BUY_URL, STUDIO_LIST } from "@/lib/constants";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-cream to-cement-100/60">
      <div className="container-tight grid items-center gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-20 lg:py-24">
        <div>
          <p className="eyebrow">Boutique reformer Pilates · NSW</p>

          <h1 className="mt-6 text-balance text-5xl sm:text-6xl lg:text-7xl">
            Redefine strength, reform your body.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/75">
            Two owner-operated studios in Cecil Hills and Kings Park. Small
            classes, sharp instruction, and a room that&rsquo;s actually nice
            to be in.
          </p>

          <a
            href={INTRO_OFFER_BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-brown px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal"
          >
            Try 4 classes for $49 <span aria-hidden>→</span>
          </a>

          <div className="mt-10 grid max-w-md grid-cols-2 divide-x divide-brown/15 border-y border-brown/15">
            {STUDIO_LIST.map((s, i) => (
              <Link
                key={s.slug}
                href={`/studios/${s.slug}`}
                className={`group py-4 transition-colors hover:bg-cement-100/50 ${i === 0 ? "pr-4" : "pl-4"}`}
              >
                <span className="font-display text-xl font-bold uppercase text-brown">
                  {s.shortName}
                </span>
                <span className="mt-1 block text-xs text-brown/65 group-hover:text-brown">
                  Visit studio →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <ImageSlot
          src="/images/hero/cecil-hills-studio.jpg"
          alt="Cecil Hills Reformd Pilates studio interior — warm cream reformers in a low-lit boutique room"
          aspect="aspect-[4/3] md:aspect-[4/5]"
          priority
          className="rounded-sm"
        />
      </div>
    </section>
  );
}
