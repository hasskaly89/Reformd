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

          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/75 sm:text-lg">
            Small classes. Expert instructors. Five class types, every level welcome.
          </p>

          <p className="mt-8 text-sm font-semibold text-brown">Try 4 classes for $49 at:</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {STUDIO_LIST.map((s) => (
              <a
                key={s.slug}
                href={s.mindbody.introOfferUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Claim 4 classes for $49 at ${s.shortName}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brown px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal"
              >
                {s.shortName} <span aria-hidden>→</span>
              </a>
            ))}
          </div>
          <p className="mt-2 text-xs text-charcoal/70">New clients only. Valid 14 days from first use.</p>

          <div className="mt-10 hidden max-w-md grid-cols-2 divide-x divide-brown/15 border-y border-brown/15 sm:grid">
            {STUDIO_LIST.map((s, i) => (
              <Link
                key={s.slug}
                href={`/studios/${s.slug}`}
                className={`group py-4 transition-colors hover:bg-cement-100/50 ${i === 0 ? "pr-4" : "pl-4"}`}
              >
                <span className="font-display text-xl font-semibold uppercase text-brown">
                  {s.shortName}
                </span>
                <span className="mt-1 block text-xs text-brown/75 group-hover:text-brown">
                  Visit studio →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <ImageSlot
          src="/images/shoot/private-session.jpg"
          alt="Instructor guiding a member through an overhead strap stretch on the reformer"
          position="50% 18%"
          aspect="aspect-[4/3] lg:aspect-[4/5]"
          priority
          className="rounded-sm"
        />
      </div>
    </section>
  );
}
