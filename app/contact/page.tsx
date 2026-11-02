import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { PHONE, PHONE_HREF, SOCIAL_LINKS, STUDIO_LIST } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Reformd Pilates: phone, studio addresses in Cecil Hills and Kings Park, class times and Instagram.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come and say hello."
        lede={
          <>
            Call{" "}
            <a href={PHONE_HREF} className="tabular text-brown underline underline-offset-4">
              {PHONE}
            </a>{" "}
            or{" "}
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-brown underline underline-offset-4">
              message us on Instagram
            </a>
            .
          </>
        }
      />
      <section className="container-tight section grid gap-10 md:grid-cols-2">
        {STUDIO_LIST.map((s) => (
          <article key={s.slug} className="border-t border-brown/15 pt-6">
            <h2 className="text-3xl">{s.shortName}</h2>
            <address className="mt-3 text-lg not-italic leading-relaxed">
              {s.address}
              <br />
              {s.suburb} {s.state} {s.postcode}
            </address>
            <a
              href={s.mapsEmbed.replace("&output=embed", "")}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block py-2 text-sm text-brown underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
            <p className="eyebrow mt-6">Class times</p>
            <ul className="mt-3 max-w-sm space-y-1.5 text-sm">
              {s.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-charcoal/70">{h.open}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
