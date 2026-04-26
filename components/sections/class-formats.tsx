import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";

const FORMATS = [
  {
    name: "Reformer",
    blurb:
      "Classic reformer Pilates. Long, controlled movement that builds deep core strength and lean muscle.",
    intensity: "Moderate",
  },
  {
    name: "Jumpboard",
    blurb:
      "Cardio on the reformer. Add a jumpboard, get your heart rate up, and protect your joints at the same time.",
    intensity: "High",
  },
  {
    name: "Dynamic",
    blurb:
      "Faster tempo, weighted ball, more reps. Pilates principles dialled toward endurance and burn.",
    intensity: "High",
  },
  {
    name: "Sculpt",
    blurb:
      "Reformer + light weights for upper-body and glute focus. Builds visible tone without bulk.",
    intensity: "Moderate",
  },
  {
    name: "Stretch",
    blurb:
      "Recovery, mobility and breath. The session that lets the rest of the week happen.",
    intensity: "Low",
  },
];

export function ClassFormats() {
  return (
    <section className="bg-cement-50">
      <div className="container-tight py-24 md:py-32">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
              Class formats
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">
              Five formats. One reformer. No two weeks the same.
            </h2>
          </div>
          <Link
            href="/classes"
            className="text-sm tracking-wide text-brown underline-offset-4 hover:underline"
          >
            See all classes →
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-lg border border-brown/10 bg-cream p-7 transition-colors hover:border-brown/30">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-3xl text-brown">{f.name}</h3>
                  <span className="rounded-full bg-cement-100 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-brown/70">
                    {f.intensity}
                  </span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/75">
                  {f.blurb}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
