import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { CLASS_FORMATS, STUDIOS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Five reformer Pilates formats — Reformer, Jumpboard, Dynamic, Sculpt and Stretch. Suitable for every level.",
};

export default function ClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Class formats"
        title={<>Five formats. One reformer.</>}
        lede="Every Reformd class is built around the reformer — a precision strength tool that meets you where you are. Whether you want to sweat, sculpt, or slow down, there's a format for it."
      />

      <section className="bg-cream">
        <div className="container-tight grid gap-6 py-20 md:py-28 sm:grid-cols-2 lg:grid-cols-2">
          {CLASS_FORMATS.map((format, i) => (
            <Reveal key={format.slug} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-lg border border-brown/10 bg-cement-50 p-8 transition-colors hover:border-brown/30">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="font-serif text-3xl text-brown md:text-4xl">
                    {format.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {format.availableAt.map((slug) => (
                      <span
                        key={slug}
                        className="rounded-full bg-cement-100 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-brown/70"
                      >
                        {STUDIOS[slug].shortName}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-brown/60">
                  {format.tagline}
                </p>
                <p className="mt-5 flex-1 text-base leading-relaxed text-charcoal/80">
                  {format.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {format.availableAt.map((slug) => (
                    <Link
                      key={slug}
                      href={`/schedule/${slug}`}
                      className="inline-flex items-center rounded-full bg-brown px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-charcoal"
                    >
                      Book at {STUDIOS[slug].shortName}
                    </Link>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
