import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { APP_LINKS, STUDIO_LIST } from "@/lib/constants";

export function IntroOffer() {
  return (
    <section id="intro-offer" className="bg-brown text-cream">
      <div className="container-tight grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-cement">
            Intro offer
          </p>
          <h2 className="mt-4 text-4xl text-cream md:text-5xl">
            4 sessions for $49.
          </h2>
          <p className="mt-6 max-w-md text-cream/75">
            New to Reformd? Try us across any class format at either studio.
            Reformer, Jumpboard, Dynamic, Sculpt or Stretch — pick whatever
            fits the day.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {STUDIO_LIST.map((s) => (
              <Link
                key={s.slug}
                href={`/schedule/${s.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-medium tracking-wide text-brown transition-colors hover:bg-cement-100"
              >
                Claim at {s.shortName}
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg border border-cream/15 bg-cream/5 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-cement">
              Or download the app
            </p>
            <p className="mt-3 text-cream/80">
              Manage your bookings, waitlist and class history from your
              pocket. Available on iOS and Android.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={APP_LINKS.ios}
                aria-label="Download on the App Store"
                className="inline-flex items-center gap-2 rounded-md border border-cream/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/80 transition-colors hover:bg-cream/10"
              >
                <span aria-hidden></span>
                <span>App Store</span>
              </a>
              <a
                href={APP_LINKS.android}
                aria-label="Get it on Google Play"
                className="inline-flex items-center gap-2 rounded-md border border-cream/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/80 transition-colors hover:bg-cream/10"
              >
                <span aria-hidden>▶</span>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
