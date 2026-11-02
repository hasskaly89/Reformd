import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { ImageSlot } from "@/components/ui/image-slot";
import { CLASS_FORMATS, STUDIOS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Five reformer Pilates formats: Reformer, Jumpboard, Dynamic, Sculpt and Stretch. Every level welcome.",
};

export default function ClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Class formats"
        title={<>Five formats. One reformer.</>}
        lede="Sweat, sculpt or slow down. Every level welcome."
      />

      <section className="bg-cream">
        <div className="container-tight section grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {CLASS_FORMATS.map((format) => (
            <article key={format.slug} id={format.slug} className="flex scroll-mt-24 flex-col">
              <ImageSlot
                src={format.image}
                alt={`${format.name} class at Reformd Pilates`}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="rounded-sm"
              />
              <h2 className="mt-5 text-3xl">{format.name}</h2>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-brown/60">
                {format.duration} · {format.intensity} ·{" "}
                {format.availableAt.map((slug) => STUDIOS[slug].shortName).join(" + ")}
              </p>
              <p className="mt-3 flex-1 text-base leading-relaxed text-charcoal/80">
                {format.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {format.availableAt.map((slug) => (
                  <Link
                    key={slug}
                    href={`/schedule/${slug}`}
                    className="inline-flex items-center rounded-full bg-brown px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-charcoal"
                  >
                    Book {STUDIOS[slug].shortName}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
