import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import {
  CRECHE,
  PRICING_TIERS,
  STUDIOS,
  buyUrl,
  type PricingGroup,
  type StudioSlug,
} from "@/lib/constants";
import { withOg } from "@/lib/meta";

type Props = { params: { studio: string } };

const isStudioSlug = (s: string): s is StudioSlug => s === "cecil-hills" || s === "kings-park";

export function generateStaticParams() {
  return [{ studio: "cecil-hills" }, { studio: "kings-park" }];
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isStudioSlug(params.studio)) return {};
  const studio = STUDIOS[params.studio];
  return withOg({
    title: `Reformer Pilates Prices ${studio.suburb}`,
    description: `Reformd Pilates ${studio.shortName} pricing: 4 classes for $49, memberships from $30 a week, student rates and class packs.`,
    alternates: { canonical: `/pricing/${studio.slug}` },
  });
}

const GROUPS: { group: PricingGroup; title: string; lede: string; cta: string }[] = [
  { group: "intro", title: "Intro offer", lede: "New to Reformd? Start here.", cta: "Claim offer" },
  { group: "membership", title: "Memberships", lede: "Weekly direct debit. Best value if you train every week.", cta: "Join" },
  { group: "student", title: "Student memberships", lede: "For current uni or TAFE students.", cta: "Join" },
  { group: "pack", title: "Casual and class packs", lede: "No lock-in. Buy as you go.", cta: "Buy" },
];

export default function PricingPage({ params }: Props) {
  if (!isStudioSlug(params.studio)) notFound();
  const studio = STUDIOS[params.studio];
  const other = STUDIOS[studio.slug === "cecil-hills" ? "kings-park" : "cecil-hills"];

  return (
    <>
      <PageHero
        eyebrow={`${studio.shortName} · Pricing`}
        title="Simple pricing. No surprises."
        lede="Same prices at both studios."
      />

      <section className="bg-cream">
        <div className="container-tight section">
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/pricing/${other.slug}`}
              className="inline-flex items-center rounded-full border border-brown/25 px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brown hover:bg-cement-100"
            >
              Switch to {other.shortName} →
            </Link>
            <Link
              href={`/schedule/${studio.slug}`}
              className="inline-flex items-center rounded-full border border-brown/25 px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brown hover:bg-cement-100"
            >
              See the schedule
            </Link>
          </div>

          {GROUPS.map(({ group, title, lede, cta }) => {
            const tiers = PRICING_TIERS.filter((t) => t.group === group);
            return (
              <div key={group} className="mt-14">
                <h2 className="text-3xl md:text-4xl">{title}</h2>
                <p className="mt-2 text-charcoal/75">{lede}</p>
                <div
                  className={`mt-6 grid gap-4 sm:grid-cols-2 ${
                    tiers.length >= 4 ? "lg:grid-cols-4" : tiers.length === 3 ? "lg:grid-cols-3" : ""
                  } ${tiers.length === 5 ? "xl:grid-cols-5" : ""}`}
                >
                  {tiers.map((tier) => (
                    <article
                      key={tier.name}
                      className={`flex flex-col rounded-sm border p-6 ${
                        tier.featured ? "border-brown bg-brown text-cream" : "border-brown/15 bg-cement-50"
                      }`}
                    >
                      <h3 className={`text-lg ${tier.featured ? "!text-cream" : ""}`}>{tier.name}</h3>
                      <p className={`mt-1 text-sm ${tier.featured ? "text-cream/80" : "text-charcoal/75"}`}>
                        {tier.detail}
                      </p>
                      <p className="mt-4 flex items-baseline gap-1">
                        <span className="tabular text-4xl font-semibold">{tier.price}</span>
                        {tier.unit && <span className="text-sm opacity-75">{tier.unit}</span>}
                      </p>
                      {tier.note && (
                        <p className={`mt-2 text-xs ${tier.featured ? "text-cream/75" : "text-brown/75"}`}>
                          {tier.note}
                        </p>
                      )}
                      <div className="flex-1" />
                      <a
                        href={buyUrl(tier, studio)}
                        aria-label={`${cta} ${tier.name} at ${studio.shortName}, ${tier.price}${tier.unit ?? ""}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                          tier.featured
                            ? "bg-cream text-brown hover:bg-cement-100"
                            : "bg-brown text-cream hover:bg-charcoal"
                        }`}
                      >
                        {cta}
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-14 border-t border-brown/15 pt-8 text-sm text-charcoal/80">
            <p>
              <strong className="font-semibold text-brown">Creche:</strong> {CRECHE.price} a session,{" "}
              {CRECHE.days} at {CRECHE.times.join(" and ")}. Free with an {CRECHE.freeWith} membership.{" "}
              <a
                href={studio.mindbody.crecheUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown underline underline-offset-4"
              >
                Book creche
              </a>
            </p>
            <p className="mt-3 text-xs text-brown/75">
              All prices in AUD. Memberships are billed weekly by direct debit. Purchases are handled by Mindbody.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
