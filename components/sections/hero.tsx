import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { STUDIO_LIST } from "@/lib/constants";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-cream to-cement-100/60">
      <div className="container-tight grid gap-10 pb-12 pt-8 md:pb-16 md:pt-10 lg:grid-cols-2 lg:items-start lg:gap-12 lg:pb-20 lg:pt-12">
        <div className="lg:pt-2">
          <p className="eyebrow">Reformer Pilates · Cecil Hills &amp; Kings Park</p>

          <h1 className="mt-6 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
            Redefine strength, reform your body.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/75">
            Small classes. Expert instructors. Five class types, every level welcome.
          </p>

          <a
            href="#intro-offer"
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
                <span className="font-display text-xl font-semibold uppercase text-brown">
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
          src="/images/gallery/cecil-hills-community.jpg"
          alt="A full reformer Pilates class at Reformd Pilates Cecil Hills"
          aspect="aspect-[4/3] lg:aspect-[4/5]"
          priority
          className="rounded-sm"
        />
      </div>
    </section>
  );
}
