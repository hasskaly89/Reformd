import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CRECHE, STUDIO_LIST } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Creche",
  description: `Supervised creche at Reformd Pilates Cecil Hills and Kings Park, ${CRECHE.days} at ${CRECHE.times.join(" and ")}. ${CRECHE.price} a session, free with a ${CRECHE.freeFor}.`,
  alternates: { canonical: "/creche" },
};

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
        lede={`Supervised creche at both studios, ${CRECHE.days} at ${CRECHE.times.join(" and ")}. ${CRECHE.price} a session, or free with a ${CRECHE.freeFor}.`}
      />
      <section className="container-tight section grid gap-12 md:grid-cols-2">
        <Steps title="1. Add your child" steps={ADD_FAMILY_STEPS} />
        <Steps title="2. Book a creche spot" steps={BOOK_STEPS} />
      </section>
      <section className="bg-cement-50">
        <div className="container-tight flex flex-wrap items-center gap-3 py-12">
          <p className="mr-auto text-lg text-brown">Prefer the website?</p>
          {STUDIO_LIST.map((s) => (
            <a
              key={s.slug}
              href={s.mindbody.crecheUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brown px-6 py-3 text-sm font-medium text-cream"
            >
              Book creche at {s.shortName}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
