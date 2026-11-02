import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { STUDIO_LIST } from "@/lib/constants";

const IMAGES: Record<string, string> = {
  "cecil-hills": "/images/studios/cecil-hills-detail.jpg",
  "kings-park": "/images/studios/kings-park-studio.jpg",
};

export function StudioLocations() {
  return (
    <section className="bg-brown text-cream">
      <div className="container-tight section">
        <SectionHeading
          tone="light"
          eyebrow="Two studios"
          title="Find your home in the south-west."
          aside={
            <p className="text-sm leading-relaxed text-cream/70">
              Two studios, same standard. Pick the one closer to home.
            </p>
          }
        />

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
          {STUDIO_LIST.map((s) => (
            <article key={s.slug}>
              <ImageSlot
                src={IMAGES[s.slug]}
                alt={`Reformd Pilates ${s.shortName} studio interior`}
                aspect="aspect-[4/3]"
                className="rounded-sm"
              />
              <h3 className="mt-6 text-3xl !text-cream">{s.shortName}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {s.address}, {s.suburb} {s.state} {s.postcode}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/schedule/${s.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-cream px-6 py-2.5 text-sm font-medium text-brown transition-colors hover:bg-cement-100"
                >
                  Book a class
                </Link>
                <Link
                  href={`/studios/${s.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-cream/30 px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  Studio details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
