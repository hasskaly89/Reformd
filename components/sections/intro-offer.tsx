import { INTRO_OFFER_BUY_URL } from "@/lib/constants";

export function IntroOffer() {
  return (
    <section id="intro-offer" className="bg-cement-50">
      <div className="container-tight section grid gap-8 md:grid-cols-2 md:items-end md:gap-12">
        <div>
          <p className="eyebrow">Intro offer</p>
          <h2 className="mt-4 text-5xl md:text-6xl">
            $49 for <br className="hidden md:block" />4 classes.
          </h2>
        </div>
        <div>
          <p className="max-w-md text-base leading-relaxed text-charcoal/75">
            New to Reformd? Try any class format at either studio — Reformer,
            Jumpboard, Dynamic, Sculpt or Stretch. First-timers only.
          </p>
          <a
            href={INTRO_OFFER_BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-brown px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal"
          >
            Claim the intro offer <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
