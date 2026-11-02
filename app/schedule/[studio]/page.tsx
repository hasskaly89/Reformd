import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MindbodySchedule } from "@/components/sections/mindbody-schedule";
import { PageHero } from "@/components/sections/page-hero";
import {
  INTRO_OFFER_BUY_URL,
  STUDIOS,
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
    title: `${studio.shortName} Schedule`,
    description: `Live class schedule and bookings for Reformd Pilates ${studio.shortName}. Reformer, Jumpboard, Dynamic, Sculpt and Stretch.`,
  };
}

export default function SchedulePage({ params }: Props) {
  if (!isStudioSlug(params.studio)) notFound();
  const studio = STUDIOS[params.studio];
  const otherSlug: StudioSlug =
    studio.slug === "cecil-hills" ? "kings-park" : "cecil-hills";
  const other = STUDIOS[otherSlug];

  return (
    <>
      <PageHero
        eyebrow={`${studio.shortName} · Live schedule`}
        title={<>Book your next class.</>}
        lede={
          <>
            Live class schedule for {studio.name}. Tap any class to reserve your
            spot — bookings are powered by Mindbody, the same system that runs
            in-studio.
          </>
        }
      />

      <section className="bg-cream">
        <div className="container-tight section">
          <div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/schedule/${other.slug}`}
                className="inline-flex items-center rounded-full border border-brown/25 bg-cream px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brown transition-colors hover:bg-cement-100"
              >
                Switch to {other.shortName} →
              </Link>
              <a
                href={INTRO_OFFER_BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-brown px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-charcoal"
              >
                New here? 4 classes for $49
              </a>
              <Link
                href={`/pricing/${studio.slug}`}
                className="inline-flex items-center rounded-full border border-brown/25 bg-cream px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brown transition-colors hover:bg-cement-100"
              >
                See pricing
              </Link>
            </div>
          </div>

          <div>
            <div className="mt-10 rounded-lg border border-brown/10 bg-cement-50 p-4 md:p-8">
              <MindbodySchedule widgetId={studio.mindbody.scheduleWidgetId} />
            </div>
          </div>

          <div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-brown/55">
              Schedule loading? Refresh the page or{" "}
              <a
                href={`https://clients.mindbodyonline.com/classic/mainclass?studioid=${studio.mindbody.studioId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                view it directly on Mindbody
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
