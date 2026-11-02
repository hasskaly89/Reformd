import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { PHONE, PHONE_HREF, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Private Sessions",
  description: "Private reformer Pilates sessions at Reformd Pilates Cecil Hills and Kings Park. Get in touch to book.",
  alternates: { canonical: "/private-sessions" },
};

// TODO(owner): add session formats, length and pricing when confirmed.
export default function PrivateSessionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Private sessions"
        title="One-on-one on the reformer."
        lede="Want individual attention or a session for a small group? Get in touch and we'll find a time that works."
      />
      <section className="container-tight section flex flex-wrap gap-3">
        <a
          href={PHONE_HREF}
          className="inline-flex items-center justify-center rounded-full bg-brown px-7 py-3.5 text-sm font-medium text-cream"
        >
          Call {PHONE}
        </a>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-brown/25 px-7 py-3.5 text-sm font-medium text-brown"
        >
          Message us on Instagram
        </a>
      </section>
    </>
  );
}
