import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { INTRO_OFFER_BUY_URL, SOCIAL_LINKS, type Studio } from "@/lib/constants";

export function StudioDetail({ studio }: { studio: Studio }) {
  return (
    <>
      <PageHero
        eyebrow={`${studio.suburb} · ${studio.state}`}
        title={<>{studio.shortName}.</>}
        lede={studio.blurb}
      />

      {/* Address + hours + map */}
      <section className="container-tight section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-brown/15 bg-cement-100">
              <iframe
                title={`${studio.shortName} map`}
                src={studio.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brown/60">
                  Find us
                </p>
                <p className="mt-2 text-xl leading-relaxed text-charcoal">
                  {studio.address}
                  <br />
                  {studio.suburb} {studio.state} {studio.postcode}
                </p>
                <a
                  href={studio.mapsEmbed.replace("&output=embed", "")}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-brown underline-offset-4 hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brown/60">
                  Hours
                </p>
                <ul className="mt-3 space-y-2 text-base text-charcoal/85">
                  {studio.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-6">
                      <span>{h.day}</span>
                      <span className="text-charcoal/70">{h.open}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href={`/schedule/${studio.slug}`}>
                  See schedule
                </ButtonLink>
                <ButtonLink href={`/pricing/${studio.slug}`} variant="secondary">
                  View pricing
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-cement-50">
        <div className="container-tight section">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
              The space
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl">
              Built for the way you actually train.
            </h2>
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {studio.facilities.map((f) => (
              <div key={f}>
                <div className="flex items-start gap-4 border-l border-brown/20 pl-5">
                  <span aria-hidden className="font-display text-2xl text-cement-700">
                    ·
                  </span>
                  <p className="text-lg text-charcoal/85">{f}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes available here */}
      <section className="container-tight section">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
              At this studio
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl">
              {studio.classes.length} class formats taught here.
            </h2>
          </div>
          <Link
            href="/classes"
            className="text-sm tracking-wide text-brown underline-offset-4 hover:underline"
          >
            All class formats →
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          {studio.classes.map((c) => (
            <li
              key={c}
              className="rounded-full border border-brown/20 bg-cream px-5 py-2 font-display text-sm font-bold uppercase text-brown"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA band */}
      <section className="bg-brown text-cream">
        <div className="container-tight flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cement">
              Intro offer
            </p>
            <h2 className="mt-3 text-cream text-3xl md:text-4xl">
              Try {studio.shortName} for $49.
            </h2>
            <p className="mt-3 max-w-md text-cream/70">
              Four classes across any format. First-timers only.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={INTRO_OFFER_BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-medium tracking-wide text-brown transition-colors hover:bg-cement-100"
            >
              Claim the intro offer
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-cream/30 px-7 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-cream/10"
            >
              Message us on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
