import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { SectionNumber } from "@/components/ui/section-number";
import { APP_LINKS, STUDIO_LIST } from "@/lib/constants";

export function IntroOffer() {
  return (
    <section
      id="intro-offer"
      className="relative isolate overflow-hidden grain-light bg-cement-50"
    >
      <div className="container-tight relative z-10 grid grid-cols-12 gap-6 py-28 md:py-36">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <SectionNumber index="05" label="Intro offer" />
            <h2 className="mt-8 text-balance text-5xl leading-[0.92] md:text-6xl lg:text-[5.5rem]">
              <span className="block tabular text-brown/85">$49</span>
              <span className="block">for four</span>
              <span className="block italic font-normal lowercase tracking-tight text-brown/85">
                sessions.
              </span>
            </h2>
            <div className="rule mt-10 max-w-xs" />
            <p className="mt-8 max-w-md text-base leading-relaxed text-charcoal/75">
              New to Reformd? Try us across any class format at either studio.
              Reformer, Jumpboard, Dynamic, Sculpt or Stretch — pick whatever
              fits the day.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {STUDIO_LIST.map((s) => (
                <Link
                  key={s.slug}
                  href={`/schedule/${s.slug}`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brown px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-all hover:bg-charcoal hover:gap-3.5"
                >
                  Claim at {s.shortName}
                  <span aria-hidden className="text-cement transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-5 md:pl-6">
          <Reveal delay={0.15}>
            <div className="relative h-full rounded-sm border border-brown/15 bg-cream/60 p-8 backdrop-blur-sm">
              <span className="tabular text-[10px] uppercase tracking-[0.3em] text-brown/55">
                Or — 06
              </span>
              <p className="mt-3 font-serif text-3xl text-brown">
                Manage from your pocket.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/75">
                The Reformd app handles bookings, waitlists and class history.
                iOS and Android.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={APP_LINKS.ios}
                  aria-label="Download on the App Store"
                  className="inline-flex items-center gap-2 rounded-md border border-brown/25 bg-cream px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] text-brown/80 transition-colors hover:bg-cement-100"
                >
                  App Store
                </a>
                <a
                  href={APP_LINKS.android}
                  aria-label="Get it on Google Play"
                  className="inline-flex items-center gap-2 rounded-md border border-brown/25 bg-cream px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] text-brown/80 transition-colors hover:bg-cement-100"
                >
                  Google Play
                </a>
              </div>

              {/* Decorative corner numeral */}
              <span
                aria-hidden
                className="tabular pointer-events-none absolute bottom-4 right-5 font-serif text-[5rem] leading-none text-brown/10"
              >
                49
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
