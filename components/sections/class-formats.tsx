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
          title="Five formats. One reformer."
          aside={
            <Link href="/classes" className="text-sm text-brown underline-offset-4 hover:underline">
              See all classes →
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-5">
          {CLASS_FORMATS.map((f) => (
            <Link key={f.slug} href={`/classes#${f.slug}`} className="group flex flex-col">
              <ImageSlot
                src={f.image}
                alt={`${f.name} class at Reformd Pilates`}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="rounded-sm"
              />
              <h3 className="mt-4 text-lg group-hover:underline md:text-xl">{f.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brown/60">
                {f.duration} · {f.intensity}
              </p>
              <p className="mt-2 text-sm leading-snug text-charcoal/75">{f.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
