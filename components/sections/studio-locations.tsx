import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { STUDIO_LIST } from "@/lib/constants";

export function StudioLocations() {
  return (
    <section className="bg-brown text-cream">
      <div className="container-tight section">
        <SectionHeading
          tone="light"
          eyebrow="Two studios"
          title="Two studios. Pick your closest."
          aside={
            <p className="hidden text-sm leading-relaxed text-cream/70 md:block">
              Cecil Hills for the south-west. Kings Park for Blacktown and the north-west.
            </p>
          }
        />

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
          {STUDIO_LIST.map((s) => (
            <article key={s.slug} className="flex flex-col">
              <ImageSlot
                src={s.image}
                alt={`Inside the Reformd Pilates ${s.shortName} reformer studio`}
                aspect="aspect-[4/3]"
                className="rounded-sm"
              />
              <h3 className="mt-6 text-3xl !text-cream">{s.shortName}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">
                {s.address}, {s.suburb} {s.state} {s.postcode}<span className="hidden md:inline"> · {s.region}</span>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/schedule/${s.slug}`}
                  className="btn btn-sm btn-light"
                >
                  Book a class
                </Link>
                <Link
                  href={`/studios/${s.slug}`}
                  className="btn btn-sm btn-outline-light"
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
