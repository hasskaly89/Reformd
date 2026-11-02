import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { ImageSlot } from "@/components/ui/image-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { INTRO_OFFER_BUY_URL, SOCIAL_LINKS, type Studio } from "@/lib/constants";
import { JsonLd, studioClasses, studioFaqs, studioJsonLd } from "@/lib/seo";

export function StudioDetail({ studio }: { studio: Studio }) {
  const classes = studioClasses(studio);
  const faqs = studioFaqs(studio);

  return (
    <>
      <JsonLd data={studioJsonLd(studio)} />

      {/* Hero: keyword H1 + photo */}
      <section className="bg-gradient-to-b from-cream to-cement-100/60">
        <div className="container-tight grid items-center gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-20">
          <div>
            <p className="eyebrow">{studio.region}</p>
            <h1 className="mt-5 text-balance text-5xl md:text-6xl">
              Reformer Pilates in {studio.suburb}
            </h1>
            <p className="mt-5 max-w-md text-lg text-charcoal/75">{studio.blurb}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/schedule/${studio.slug}`}>Book a class</ButtonLink>
              <ButtonLink href={`/pricing/${studio.slug}`} variant="secondary">
                Pricing
              </ButtonLink>
            </div>
          </div>
          <ImageSlot
            src={studio.image}
            alt={`Inside the Reformd Pilates ${studio.suburb} reformer studio`}
            aspect="aspect-[4/3] md:aspect-[4/5]"
            priority
            className="rounded-sm"
          />
        </div>
      </section>

      {/* Visit: map + address/hours/facilities */}
      <section className="container-tight section grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="aspect-[4/3] overflow-hidden rounded-sm border border-brown/15 bg-cement-100">
          <iframe
            title={`Map to Reformd Pilates ${studio.suburb}`}
            src={studio.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
            allowFullScreen
          />
        </div>

        <div className="grid content-start gap-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Find us</p>
            <address className="mt-3 text-lg not-italic leading-relaxed">
              {studio.address}
              <br />
              {studio.suburb} {studio.state} {studio.postcode}
            </address>
            <a
              href={studio.mapsEmbed.replace("&output=embed", "")}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm text-brown underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
          </div>

          <div>
            <p className="eyebrow">Hours</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {studio.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-charcoal/70">{h.open}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2">
            <p className="eyebrow">Facilities</p>
            <p className="mt-3 text-sm leading-relaxed">{studio.facilities.join(" · ")}</p>
          </div>
        </div>
      </section>

      {/* Classes at this studio */}
      <section className="bg-cement-50">
        <div className="container-tight section">
          <SectionHeading
            eyebrow={`Classes in ${studio.suburb}`}
            title={`${classes.length} ways to train`}
            aside={
              <Link href="/classes" className="text-sm text-brown underline-offset-4 hover:underline">
                Compare all classes →
              </Link>
            }
          />
          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-5">
            {classes.map((c) => (
              <Link key={c.slug} href={`/classes#${c.slug}`} className="group">
                <ImageSlot
                  src={c.image}
                  alt={`${c.name} reformer Pilates class in ${studio.suburb}`}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="rounded-sm"
                />
                <h3 className="mt-4 text-lg group-hover:underline">{c.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brown/60">
                  {c.duration} · {c.intensity}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local: nearby suburbs */}
      <section className="container-tight section grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <p className="eyebrow">Close to home</p>
          <h2 className="mt-4 text-balance text-4xl md:text-5xl">
            Pilates near {studio.nearby[0]} and {studio.nearby[1]}
          </h2>
        </div>
        <div>
          <p className="text-base leading-relaxed text-charcoal/80">
            Our {studio.suburb} studio is a short drive from:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {studio.nearby.map((n) => (
              <li key={n} className="rounded-full border border-brown/20 px-4 py-1.5 text-sm">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cement-50">
        <div className="container-tight section grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-4xl">Good to know</h2>
          </div>
          <div className="divide-y divide-brown/15 border-y border-brown/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-brown">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brown text-cream">
        <div className="container-tight flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl !text-cream md:text-4xl">Try {studio.shortName}: 4 classes for $49.</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={INTRO_OFFER_BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-medium text-brown transition-colors hover:bg-cement-100"
            >
              Claim the intro offer
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-cream/30 px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
            >
              Message us on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
