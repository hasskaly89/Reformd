import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import {
  INTRO_OFFER_BUY_URL,
  PRICING_TIERS,
  STUDIOS,
  type PricingTier,
  type StudioSlug,
} from "@/lib/constants";

type Props = { params: { studio: string } };

const isStudioSlug = (s: string): s is StudioSlug =>
  s === "cecil-hills" || s === "kings-park";

export function generateStaticParams() {
  return [{ studio: "cecil-hills" }, { studio: "kings-park" }];
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isStudioSlug(params.studio)) return {};
  const studio = STUDIOS[params.studio];
  return {
    title: `${studio.shortName} Pricing`,
    description: `Memberships, class packs and intro offers for Reformd Pilates ${studio.shortName}.`,
  };
}

const GROUP_META: Record<
  PricingTier["group"],
  { eyebrow: string; title: string; lede: string }
> = {
  intro: {
    eyebrow: "Start here",
    title: "Intro offer",
    lede: "First time at Reformd? Try us on.",
  },
  membership: {
    eyebrow: "Best value",
    title: "Memberships",
    lede: "Weekly direct debit. 12-week minimum, then ongoing — cancel any time after.",
  },
  pack: {
    eyebrow: "No commitment",
    title: "Class packs",
    lede: "Buy as you need. Casual through to bulk packs with long expiry windows.",
  },
};

export default function PricingPage({ params }: Props) {
  if (!isStudioSlug(params.studio)) notFound();
  const studio = STUDIOS[params.studio];
  const otherSlug: StudioSlug =
    studio.slug === "cecil-hills" ? "kings-park" : "cecil-hills";
  const other = STUDIOS[otherSlug];

  const groups: PricingTier["group"][] = ["intro", "membership", "pack"];

  const buyUrlFor = (tier: PricingTier): string =>
    tier.group === "intro"
      ? INTRO_OFFER_BUY_URL
      : tier.group === "membership"
      ? studio.mindbody.membershipBuyUrl
      : `https://clients.mindbodyonline.com/classic/mainstoreproducts?studioid=${studio.mindbody.studioId}`;

  return (
    <>
      <PageHero
        eyebrow={`${studio.shortName} · Pricing`}
        title={<>Simple pricing. No surprises.</>}
        lede={
          <>
            Identical pricing across both studios. Pick the option that suits
            how often you want to move — or start with the intro offer and
            decide from there.
          </>
        }
      />

      <section className="bg-cream">
        <div className="container-tight py-16 md:py-20">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/pricing/${other.slug}`}
                className="inline-flex items-center rounded-full border border-brown/25 bg-cream px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brown transition-colors hover:bg-cement-100"
              >
                Switch to {other.shortName} →
              </Link>
              <Link
                href={`/schedule/${studio.slug}`}
                className="inline-flex items-center rounded-full border border-brown/25 bg-cream px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brown transition-colors hover:bg-cement-100"
              >
                See live schedule
              </Link>
            </div>
          </Reveal>

          {groups.map((group, gi) => {
            const tiers = PRICING_TIERS.filter((t) => t.group === group);
            const meta = GROUP_META[group];
            return (
              <div key={group} className="mt-16 first:mt-12">
                <Reveal>
                  <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
                    {meta.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl text-brown md:text-4xl">
                    {meta.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-charcoal/75">
                    {meta.lede}
                  </p>
                </Reveal>

                <div
                  className={`mt-8 grid gap-4 sm:grid-cols-2 ${
                    tiers.length >= 3 ? "lg:grid-cols-3" : ""
                  } ${tiers.length >= 4 ? "lg:grid-cols-4" : ""}`}
                >
                  {tiers.map((tier, i) => (
                    <Reveal key={tier.name} delay={i * 0.05 + gi * 0.02}>
                      <article
                        className={`flex h-full flex-col rounded-lg border p-6 transition-colors ${
                          tier.featured
                            ? "border-brown bg-brown text-cream"
                            : "border-brown/10 bg-cement-50 text-charcoal hover:border-brown/30"
                        }`}
                      >
                        <h3
                          className={`font-serif text-2xl ${
                            tier.featured ? "text-cream" : "text-brown"
                          }`}
                        >
                          {tier.name}
                        </h3>
                        <div className="mt-4 flex items-baseline gap-2">
                          <span
                            className={`font-serif text-4xl ${
                              tier.featured ? "text-cream" : "text-brown"
                            }`}
                          >
                            {tier.price}
                          </span>
                          {tier.unit && (
                            <span
                              className={`text-sm ${
                                tier.featured
                                  ? "text-cream/75"
                                  : "text-charcoal/65"
                              }`}
                            >
                              {tier.unit}
                            </span>
                          )}
                        </div>
                        {tier.note && (
                          <p
                            className={`mt-3 text-xs uppercase tracking-[0.15em] ${
                              tier.featured
                                ? "text-cream/70"
                                : "text-brown/60"
                            }`}
                          >
                            {tier.note}
                          </p>
                        )}
                        <div className="flex-1" />
                        <a
                          href={buyUrlFor(tier)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                            tier.featured
                              ? "bg-cream text-brown hover:bg-cement-100"
                              : "bg-brown text-cream hover:bg-charcoal"
                          }`}
                        >
                          {tier.group === "intro"
                            ? "Claim offer"
                            : tier.group === "membership"
                            ? "Start membership"
                            : "Buy pack"}
                        </a>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}

          <Reveal>
            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-brown/55">
              All prices in AUD. Memberships processed weekly via direct debit.
              Bookings and purchases are powered by Mindbody.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
