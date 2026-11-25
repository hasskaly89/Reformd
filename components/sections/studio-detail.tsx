import Link from "next/link";

import { FirstVisit } from "@/components/sections/first-visit";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { StudioOfferForm } from "@/components/sections/studio-offer-form";
import { Testimonials } from "@/components/sections/testimonials";
import { ImageSlot } from "@/components/ui/image-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { CLASSPASS_RATINGS, CRECHE, FIRST_VISIT, SOCIAL_LINKS, type Studio } from "@/lib/constants";
import { JsonLd, studioClasses, studioFaqs, studioJsonLd } from "@/lib/seo";

export function StudioDetail({ studio }: { studio: Studio }) {
  const classes = studioClasses(studio);
  const faqs = studioFaqs(studio);
  const rating = CLASSPASS_RATINGS.find((r) => r.studio === studio.slug);
  const hasCreche = studio.facilities.some((f) => /creche/i.test(f));
  const facts = [
    `${FIRST_VISIT.classMinutes}-minute classes, small groups, every level welcome`,
    hasCreche ? `Weekday creche: ${CRECHE.price} a session, free with ${CRECHE.freeWith}` : null,
    `${studio.address}, ${studio.suburb}`,
  ].filter(Boolean) as string[];

  return (
    <>
      <JsonLd data={studioJsonLd(studio)} />

      {/* Hero: keyword H1, proof, and the intro-offer form on the first screen */}
      <section className="bg-gradient-to-b from-cream to-cement-100/60">
        <div className="container-tight grid gap-8 pb-12 pt-8 md:pb-16 md:pt-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8 lg:pb-20 lg:pt-12">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="eyebrow">{studio.region}</p>
            <h1 className="mt-5 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl">
              Reformer Pilates in {studio.suburb}
            </h1>
            <p className="mt-5 max-w-md text-lg text-charcoal/75">{studio.blurb}</p>
            {rating && (
              <a href={rating.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-3">
                <span className="font-display text-3xl font-semibold leading-none text-brown tabular">{rating.rating}</span>
                <span className="text-sm leading-snug text-charcoal/80">
                  <span aria-hidden className="text-[#E8A33D]">★★★★★</span>
                  <span className="sr-only">{rating.rating} out of 5 stars</span>
                  <br />
                  {rating.count} ratings on ClassPass
                </span>
              </a>
            )}
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <StudioOfferForm studio={studio} />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <ul className="grid gap-2.5 text-base text-charcoal/85">
              {facts.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 text-brown">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <ImageSlot
              src={studio.image}
              alt={`Inside the Reformd Pilates ${studio.suburb} reformer studio`}
              aspect="aspect-[16/10]"
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="mt-8 rounded-sm"
            />
          </div>
        </div>
      </section>

      <Testimonials />
      <FirstVisit />

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
              className="mt-1 inline-block py-2.5 text-sm text-brown underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
            <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="inline-block py-2 text-lg tabular text-brown">
              {studio.phone}
            </a>
          </div>

          <div>
            <p className="eyebrow">Class times</p>
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
            title={`${classes.length} class types`}
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
                  alt={`${c.name} reformer Pilates class at Reformd`}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="rounded-sm"
                />
                <h3 className="mt-4 text-lg group-hover:underline">{c.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brown/75">
                  {c.variants.length ? c.variants.join(" · ") : "Reformer"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local: nearby suburbs */}
      <section className="container-tight section grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="eyebrow">Close to home</p>
          <h2 className="mt-4 text-[2rem] sm:text-4xl lg:text-5xl">
            Pilates near {studio.nearby[0]} and {studio.nearby[1]}
          </h2>
        </div>
        <div>
          <p className="hidden text-base leading-relaxed text-charcoal/80 sm:block">
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

      <InstagramFeed studios={[studio]} title={`Inside ${studio.shortName}`} />

      {/* FAQ */}
      <section className="bg-cement-50">
        <div className="container-tight section grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-4xl">Good to know</h2>
          </div>
          <div className="divide-y divide-brown/15 border-y border-brown/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-3">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-2 text-base font-medium text-brown">
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

      {/* CTA band: back to the form */}
      <section className="bg-brown text-cream">
        <div className="container-tight flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl !text-cream md:text-4xl">Try {studio.shortName}: 4 classes for $49.</h2>
          <div className="flex flex-wrap gap-3">
            <a href="#claim" className="btn btn-light">
              Claim my 4 classes
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
              Message us on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
