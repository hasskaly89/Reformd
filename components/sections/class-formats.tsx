import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { CLASS_FORMATS } from "@/lib/constants";

export function ClassFormats() {
  return (
    <section className="bg-cement-50">
      <div className="container-tight section">
        <SectionHeading
          eyebrow="Class formats"
          title="Five class types. One reformer."
          aside={
            <Link href="/classes" className="text-sm text-brown underline-offset-4 hover:underline">
              See all classes →
            </Link>
          }
        />

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5">
          {CLASS_FORMATS.map((f) => (
            <Link key={f.slug} href={`/classes#${f.slug}`} className="group flex w-[46%] shrink-0 snap-start flex-col md:w-auto">
              <ImageSlot
                src={f.image}
                alt={`${f.name} class at Reformd Pilates`}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="rounded-sm"
              />
              <h3 className="mt-4 text-lg group-hover:underline md:text-xl">{f.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brown/60">
                {f.variants.length ? f.variants.join(" · ") : "Reformer"}
              </p>
              <p className="mt-2 hidden text-sm leading-snug text-charcoal/75 sm:block">{f.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
