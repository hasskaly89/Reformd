import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { ImageSlot } from "@/components/ui/image-slot";
import { CRECHE, STUDIO_LIST } from "@/lib/constants";
import { withOg } from "@/lib/meta";

export const metadata: Metadata = withOg({
  title: "Creche",
  description: `Supervised creche at Reformd Pilates Cecil Hills and Kings Park, ${CRECHE.days} at ${CRECHE.times.join(" and ")}. ${CRECHE.price} a session, free with an ${CRECHE.freeWith} membership.`,
  alternates: { canonical: "/creche" },
});

// Steps as published on the live site's Creche page (captured 1 Nov 2026).
const ADD_FAMILY_STEPS = [
  "Log into the Reformd app.",
  "Tap the Profile tab.",
  "Tap Edit in the top right corner.",
  "Tap Manage Account Info. If a login box appears, enter your Mindbody login details.",
  "Scroll down to the Family section, tap Add Family and enter your child's details.",
  "Tap Add, then Save. Your child is now on your account.",
];

const BOOK_STEPS = [
  "Tap Profile, then tap your name and switch to your child's profile.",
  "Select your preferred creche time slot.",
  "Tap Crèche | 1 Class.",
  "Complete the purchase and your child is booked in. If your membership includes complimentary creche, you'll book straight in.",
];

function Steps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-4 text-base text-charcoal/85">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brown text-sm font-semibold text-cream">
              {i + 1}
            </span>
            <span className="pt-0.5">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function CrechePage() {
  return (
    <>
      <PageHero
        eyebrow="Creche"
        title="Your workout. Their playtime."
        lede={`Reformd runs a supervised creche at both studios ${CRECHE.days}, at ${CRECHE.times.join(" and ")}. A staff member keeps it safe and engaging while you train, so you can enjoy your session knowing your little one is in good hands. ${CRECHE.price} a session, or free with an ${CRECHE.freeWith} membership.`}
      />
      <section className="container-tight section grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ImageSlot
            src="/images/studios/creche-playroom.jpg"
            alt="The creche room at Reformd Pilates, with soft flower and star cushions and a colourful spotted wall"
            aspect="aspect-[4/3] lg:aspect-[4/5]"
            position="50% 40%"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="rounded-sm lg:sticky lg:top-28"
          />
        </div>
        <div className="grid gap-12 lg:col-span-7">
          <Steps title="1. Add your child" steps={ADD_FAMILY_STEPS} />
          <Steps title="2. Book a creche spot" steps={BOOK_STEPS} />
        </div>
      </section>
      <section className="bg-cement-50">
        <div className="container-tight flex flex-wrap items-center gap-3 py-12">
          <p className="mr-auto text-lg text-brown">Prefer the website? Book at whichever studio you&rsquo;re training at.</p>
          {STUDIO_LIST.map((s) => (
            <a
              key={s.slug}
              href={s.mindbody.crecheUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book creche at {s.shortName}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
