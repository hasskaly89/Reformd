import { ImageSlot } from "@/components/ui/image-slot";
import { STUDIO_LIST } from "@/lib/constants";

export function IntroOffer() {
  return (
    <section id="intro-offer" className="scroll-mt-16 bg-cement-50 md:scroll-mt-20">
      <div className="container-tight section grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="eyebrow">Intro offer</p>
          <h2 className="mt-4 text-[2.75rem] sm:text-5xl lg:text-6xl">
            $49 for <br className="hidden lg:block" />4 classes.
          </h2>
          <p className="mt-6 text-base text-charcoal/75">
            New to Reformd? Any class at your studio. New clients only. Valid 14 days from first use.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {STUDIO_LIST.map((st) => (
              <a
                key={st.slug}
                href={st.mindbody.introOfferUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brown px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal"
              >
                Claim at {st.shortName} <span aria-hidden>→</span>
              </a>
            ))}
          </div>
        </div>
        <ImageSlot
          src="/images/shoot/front-desk-welcome.jpg"
          alt="Reformd team member welcoming people at the front desk"
          position="50% 35%"
          aspect="aspect-[4/3] lg:aspect-[4/5]"
          className="rounded-sm"
        />
      </div>
    </section>
  );
}
