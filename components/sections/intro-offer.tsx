import { ImageSlot } from "@/components/ui/image-slot";
import { INTRO_OFFER_BUY_URL } from "@/lib/constants";

export function IntroOffer() {
  return (
    <section id="intro-offer" className="bg-cement-50">
      <div className="container-tight section grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <p className="eyebrow">Intro offer</p>
          <h2 className="mt-4 text-5xl md:text-6xl">
            $49 for <br className="hidden md:block" />4 classes.
          </h2>
          <p className="mt-6 text-base text-charcoal/75">
            New to Reformd? Book any class at either studio. First-timers only.
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
        <ImageSlot
          src="/images/studios/kings-park-studio.jpg"
          alt="Reformers and Pilates rings set up for class at Reformd Pilates Kings Park"
          aspect="aspect-[4/3] md:aspect-[4/5]"
          className="rounded-sm"
        />
      </div>
    </section>
  );
}
