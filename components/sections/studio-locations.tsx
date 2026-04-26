import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal } from "@/components/ui/reveal";
import { SectionNumber } from "@/components/ui/section-number";
import { STUDIO_LIST } from "@/lib/constants";

export function StudioLocations() {
  return (
    <section className="relative isolate overflow-hidden grain bg-brown text-cream">
      {/* Soft warm light wells */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 25%, rgba(245,240,232,0.12), transparent 55%), radial-gradient(circle at 82% 80%, rgba(191,184,168,0.18), transparent 55%)",
        }}
      />

      <div className="container-tight relative z-10 py-28 md:py-36">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <SectionNumber index="04" label="Two studios" tone="light" />
              <h2 className="mt-8 max-w-2xl text-balance text-4xl leading-[0.95] text-cream md:text-5xl lg:text-6xl">
                Find your home in the south-west.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 flex items-end md:col-span-5">
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm leading-relaxed text-cream/65">
                Two rooms, same standard. Pick the one closer to home — or
                drop into both. One membership covers either.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-6">
          {STUDIO_LIST.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <article className="group flex h-full flex-col">
                <ImageSlot
                  src={
                    s.slug === "cecil-hills"
                      ? "/images/studios/cecil-hills-detail.jpg"
                      : "/images/studios/kings-park-studio.jpg"
                  }
                  alt={`Reformd Pilates ${s.shortName} studio interior`}
                  aspect="aspect-[4/5]"
                  className="rounded-sm"
                />
                <div className="mt-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="tabular text-[10px] uppercase tracking-[0.3em] text-cement">
                      Studio · 0{i + 1}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl text-cream md:text-4xl">
                      {s.shortName}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-2 w-2 animate-softpulse rounded-full bg-cream"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  {s.address}
                  <br />
                  {s.suburb} {s.state} {s.postcode}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/studios/${s.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-cream px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-brown transition-colors hover:bg-cement-100"
                  >
                    Visit studio
                  </Link>
                  <Link
                    href={`/schedule/${s.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-cream/30 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-cream/10"
                  >
                    Schedule
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  );
}
