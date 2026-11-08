import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MindbodySchedule } from "@/components/sections/mindbody-schedule";
import { PageHero } from "@/components/sections/page-hero";
import {
  STUDIOS,
  type StudioSlug,
} from "@/lib/constants";
import { withOg } from "@/lib/meta";

type Props = { params: { studio: string } };

const isStudioSlug = (s: string): s is StudioSlug =>
  s === "cecil-hills" || s === "kings-park";

export function generateStaticParams() {
  return [{ studio: "cecil-hills" }, { studio: "kings-park" }];
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isStudioSlug(params.studio)) return {};
  const studio = STUDIOS[params.studio];
  return withOg({
    title: `Reformer Pilates Timetable ${studio.suburb}`,
    description: `Live class timetable for Reformd Pilates ${studio.shortName}. Book Balanced, Dynamic, Ignite, Lift and Recharge reformer classes online.`,
    alternates: { canonical: `/schedule/${studio.slug}` },
  });
}

export default function SchedulePage({ params }: Props) {
  if (!isStudioSlug(params.studio)) notFound();
  const studio = STUDIOS[params.studio];
  const otherSlug: StudioSlug =
    studio.slug === "cecil-hills" ? "kings-park" : "cecil-hills";
  const other = STUDIOS[otherSlug];
  const mindbodyTimetableUrl = `https://clients.mindbodyonline.com/classic/mainclass?studioid=${studio.mindbody.studioId}`;

  return (
    <>
      <PageHero
        eyebrow={`${studio.shortName} · Live schedule`}
        title={<>Book your next class.</>}
        lede="Tap a class to reserve your spot."
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
                href={studio.mindbody.introOfferUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-brown px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-charcoal"
              >
                New here? 4 classes for $49
              </a>
              <a
                href={mindbodyTimetableUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-brown/25 bg-cream px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brown transition-colors hover:bg-cement-100"
              >
                Open in Mindbody ↗
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
              <MindbodySchedule widgetId={studio.mindbody.scheduleWidgetId} fallbackUrl={mindbodyTimetableUrl} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
