import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal } from "@/components/ui/reveal";
import { SectionNumber } from "@/components/ui/section-number";

const FORMATS = [
  {
    name: "Reformer",
    blurb:
      "The classic. Long, controlled movement that builds deep core strength and lean muscle.",
    intensity: "Moderate",
    duration: "50 min",
    tone: "warm" as const,
  },
  {
    name: "Jumpboard",
    blurb:
      "Cardio on the reformer. Add a jumpboard, get your heart rate up, and protect your joints at the same time.",
    intensity: "High",
    duration: "50 min",
    tone: "stone" as const,
  },
  {
    name: "Dynamic",
    blurb:
      "Faster tempo, weighted ball, more reps. Pilates principles dialled toward endurance and burn.",
    intensity: "High",
    duration: "45 min",
    tone: "dark" as const,
  },
  {
    name: "Sculpt",
    blurb:
      "Reformer + light weights for upper-body and glute focus. Builds visible tone without bulk.",
    intensity: "Moderate",
    duration: "50 min",
    tone: "warm" as const,
  },
  {
    name: "Stretch",
    blurb:
      "Recovery, mobility and breath. The session that lets the rest of the week happen.",
    intensity: "Low",
    duration: "45 min",
    tone: "stone" as const,
  },
];

export function ClassFormats() {
  return (
    <section className="relative isolate bg-cement-50">
      <div className="container-tight py-28 md:py-36">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <SectionNumber index="02" label="Class formats" />
              <h2 className="mt-8 max-w-3xl text-balance text-4xl leading-[0.95] md:text-5xl lg:text-6xl">
                Five formats. One reformer. No two weeks the same.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 flex items-end justify-start md:col-span-5 md:justify-end">
            <Reveal delay={0.1}>
              <Link
                href="/classes"
                className="link-underline inline-flex items-center gap-2 text-sm tracking-wide text-brown"
              >
                See all classes
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Asymmetric editorial grid — first card spans 2 cols, then 3-up rows */}
        <div className="mt-16 grid grid-cols-12 gap-5">
          {FORMATS.map((f, i) => {
            // First and fourth cards span 6 cols (large feature cards),
            // others span 4 cols. Creates an asymmetric magazine flow.
            const isFeature = i === 0 || i === 3;
            const span = isFeature ? "md:col-span-6" : "md:col-span-4";
            return (
              <Reveal
                key={f.name}
                delay={i * 0.05}
                className={`col-span-12 ${span}`}
              >
                <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-sm bg-cream transition-all hover:-translate-y-0.5">
                  <div className="grid grid-cols-12 gap-0">
                    <div className={`col-span-12 ${isFeature ? "md:col-span-6" : ""}`}>
                      <ImageSlot
                        aspect={isFeature ? "aspect-[4/3]" : "aspect-[5/4]"}
                        tone={f.tone}
                        label={`${f.name.toUpperCase()}`}
                        hint={isFeature ? "1800×1350" : "1500×1200"}
                      />
                    </div>
                    <div
                      className={`col-span-12 flex flex-col p-7 ${
                        isFeature ? "md:col-span-6" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="tabular text-[10px] uppercase tracking-[0.25em] text-brown/55">
                          0{i + 1} · {f.duration}
                        </span>
                        <span className="rounded-full border border-brown/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brown/65">
                          {f.intensity}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-3xl text-brown md:text-4xl">
                        {f.name}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/75">
                        {f.blurb}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brown/70 transition-colors group-hover:text-brown">
                        <span className="link-underline">Learn more</span>
                        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
