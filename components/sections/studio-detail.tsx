import { ButtonLink } from "@/components/ui/button-link";
import { ImageSlot } from "@/components/ui/image-slot";
import { INTRO_OFFER_BUY_URL, SOCIAL_LINKS, type Studio } from "@/lib/constants";

export function StudioDetail({ studio }: { studio: Studio }) {
  return (
    <>
      {/* Hero: photo + essentials */}
      <section className="bg-gradient-to-b from-cream to-cement-100/60">
        <div className="container-tight grid items-center gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-20">
          <div>
            <p className="eyebrow">
              {studio.suburb} · {studio.state}
            </p>
            <h1 className="mt-5 text-5xl md:text-6xl">{studio.shortName}.</h1>
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
            alt={`Reformd Pilates ${studio.shortName} studio`}
            aspect="aspect-[4/3] md:aspect-[4/5]"
            priority
            className="rounded-sm"
          />
        </div>
      </section>

      {/* Visit: map + address/hours/what's here */}
      <section className="container-tight section grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="aspect-[4/3] overflow-hidden rounded-sm border border-brown/15 bg-cement-100">
          <iframe
            title={`${studio.shortName} map`}
            src={studio.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
            allowFullScreen
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Find us</p>
            <p className="mt-3 text-lg leading-relaxed">
              {studio.address}
              <br />
              {studio.suburb} {studio.state} {studio.postcode}
            </p>
            <a
              href={studio.mapsEmbed.replace("&output=embed", "")}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm text-brown underline-offset-4 hover:underline"
            >
              Open in Google Maps →
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

          <div>
            <p className="eyebrow">Classes</p>
            <p className="mt-3 text-sm leading-relaxed">{studio.classes.join(" · ")}</p>
          </div>

          <div>
            <p className="eyebrow">Facilities</p>
            <p className="mt-3 text-sm leading-relaxed">{studio.facilities.join(" · ")}</p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brown text-cream">
        <div className="container-tight flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl !text-cream md:text-4xl">Try {studio.shortName} for $49.</h2>
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
