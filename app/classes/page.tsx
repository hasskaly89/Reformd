import type { Metadata } from "next";
import Link from "next/link";

import { FirstVisit } from "@/components/sections/first-visit";
import { PageHero } from "@/components/sections/page-hero";
import { ImageSlot } from "@/components/ui/image-slot";
import { CLASS_FORMATS, STUDIOS } from "@/lib/constants";
import { withOg } from "@/lib/meta";

export const metadata: Metadata = withOg({
  title: "Classes",
  description:
    "Five reformer Pilates class types at Reformd: Balanced, Dynamic, Ignite, Lift and Recharge. Every level welcome.",
  alternates: { canonical: "/classes" },
});

export default function ClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Class formats"
        title={<>Five class types. One reformer.</>}
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
              <h2 className="mt-5 flex flex-wrap items-center gap-3 text-3xl">
                {format.name}
                {format.beginner && (
                  <span className="rounded-full bg-brown px-3 py-1 font-sans text-xs font-semibold normal-case tracking-normal text-cream">
                    Beginners start here
                  </span>
                )}
              </h2>
              {format.variants.length > 0 && (
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-brown/75">
                  {format.variants.map((v) => `${format.name} | ${v}`).join(" · ")}
                </p>
              )}
              <p className="mt-3 flex-1 text-base leading-relaxed text-charcoal/80">{format.tagline}</p>
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
      <FirstVisit />
    </>
  );
}
