import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { ImageSlot } from "@/components/ui/image-slot";

export const metadata: Metadata = {
  title: "About",
  description:
    "Owner-operated boutique reformer Pilates in Western Sydney. Studios in Cecil Hills and Kings Park.",
  alternates: { canonical: "/about" },
};

const GALLERY = [
  { src: "/images/hero/reformer-detail.jpg", alt: "Member using a Pilates ring on the reformer" },
  { src: "/images/gallery/cecil-hills-community.jpg", alt: "A full class training at Reformd Cecil Hills" },
  { src: "/images/classes/stretch.jpg", alt: "Stretch class on the reformer at Reformd Kings Park" },
];

const VALUES = [
  { h: "Small rooms", b: "Capped classes, so everyone gets corrections." },
  { h: "Hospitality", b: "Lighting, music, the welcome at the door. It all counts." },
  { h: "Everyone welcome", b: "Beginners, post-natal, gym-shy. Strength is for everyone." },
  { h: "Owner-operated", b: "Not a franchise. The standard is set in the room." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Redefining Pilates for the modern mover."
        lede="A studio that feels like a refuge, not a franchise."
      />

      <section className="container-tight section grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="eyebrow">The founder</p>
          <h2 className="mt-4 text-[2rem] sm:text-4xl lg:text-5xl">Where it started.</h2>
        </div>
        {/* TODO(owner): swap in the founder's own story, with verified experience and credentials. */}
        <div className="space-y-4 text-lg leading-relaxed text-charcoal/80">
          <p>
            Reformd started with one instructor who found boutique studios
            either too corporate or too intimidating for the people who needed
            them most.
          </p>
          <p>
            Today it&rsquo;s two studios, Cecil Hills and Kings Park, with
            instructors picked for their teaching.
          </p>
        </div>
      </section>

      <section className="container-tight grid grid-cols-3 gap-3 md:gap-5">
        {GALLERY.map((g) => (
          <ImageSlot
            key={g.src}
            src={g.src}
            alt={g.alt}
            aspect="aspect-[4/5]"
            sizes="33vw"
            className="rounded-sm"
          />
        ))}
      </section>

      <section className="container-tight section">
        <p className="eyebrow">What we believe</p>
        <ul className="mt-6 grid gap-x-12 border-t border-brown/15 sm:grid-cols-2">
          {VALUES.map((v) => (
            <li key={v.h} className="border-b border-brown/15 py-5">
              <h3 className="text-xl">{v.h}</h3>
              <p className="mt-1 text-sm text-charcoal/75">{v.b}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-brown text-cream">
        <div className="container-tight flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl !text-cream md:text-4xl">4 classes for $49.</h2>
          <a
            href="/#intro-offer"
            className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-medium text-brown transition-colors hover:bg-cement-100"
          >
            Claim the intro offer
          </a>
        </div>
      </section>
    </>
  );
}
