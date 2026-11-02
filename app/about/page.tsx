import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Owner-operated boutique reformer Pilates in South-West Sydney. The story behind Reformd Pilates and how we came to be.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={<>Redefining Pilates for the modern mover.</>}
        lede="At Reformd, our mission is to empower every individual to build strength, flexibility and confidence through precise, purposeful movement — in a studio that feels like a refuge, not a franchise."
      />

      <section className="container-tight section">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
              The founder
            </p>
            <h2 className="mt-3 text-4xl">A decade on the reformer.</h2>
          </div>

          <div>
            <div className="space-y-6 text-lg leading-relaxed text-charcoal/80">
              <p>
                {/* Placeholder — swap in the founder's story here. */}
                Reformd started with a single instructor, a decade of
                experience teaching reformer Pilates across Sydney, and a
                conviction that the boutique studios already on offer were
                either too corporate or too intimidating for the people who
                most needed them.
              </p>
              <p>
                That instructor wanted a studio that felt like a refuge — warm
                walls, lighting that didn&rsquo;t make you self-conscious, an
                instructor who knew your name by your second class. Premium,
                yes. Polished, absolutely. But never cold.
              </p>
              <p>
                Today Reformd is two studios — Cecil Hills and Kings Park —
                and a team of instructors hand-picked for their teaching, not
                their following count. Same studio philosophy at both: small
                classes, sharp instruction, and a room that&rsquo;s actually nice to
                be in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cement-50">
        <div className="container-tight section">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
              How we started
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl">
              From one reformer in Cecil Hills to two studios across the
              south-west.
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                year: "Day one",
                title: "Cecil Hills opens",
                body: "A boutique reformer studio in the heart of Cecil Hills, with on-site creche and a class roster built around real-life schedules.",
              },
              {
                year: "Year one",
                title: "Five formats, one room",
                body: "Reformer, Jumpboard, Dynamic, Sculpt and Stretch — five formats so members never out-grow the room, and so the body keeps adapting.",
              },
              {
                year: "Today",
                title: "Kings Park joins",
                body: "Same standard, second postcode. Kings Park brings the Reformd experience to Sydney's west — same boutique sizes, same instructor quality.",
              },
            ].map((m) => (
              <div key={m.year}>
                <article className="border-l border-brown/20 pl-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-cement-700">
                    {m.year}
                  </p>
                  <h3 className="mt-2 text-2xl">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                    {m.body}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-tight section">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
            What we believe
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl">
            Boutique isn&rsquo;t a price point. It&rsquo;s a standard of attention.
          </h2>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {[
            {
              h: "Small rooms, sharp instruction",
              b: "Class sizes capped so every member gets corrections — not just front-of-room cues you have to translate yourself.",
            },
            {
              h: "Hospitality, not just fitness",
              b: "The lighting, the music, the towels, the way you're greeted on the way in. The little things compound into how a session feels.",
            },
            {
              h: "Inclusive by design",
              b: "Beginner welcome, post-natal welcome, intimidated-by-gyms welcome. Strength is for everyone — and everyone is invited.",
            },
            {
              h: "Owner-operated, always",
              b: "We're not a franchise. The standard at Reformd is set by the people teaching in the room, not a head office two cities away.",
            },
          ].map((v) => (
            <div key={v.h}>
              <div>
                <h3 className="text-xl">{v.h}</h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal/75">
                  {v.b}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brown text-cream">
        <div className="container-tight flex flex-col items-start gap-6 py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-cream text-3xl md:text-4xl">
              See it for yourself.
            </h2>
            <p className="mt-3 max-w-md text-cream/70">
              Four sessions for $49 — try us at either studio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/studios/cecil-hills" variant="secondary">
              Cecil Hills
            </ButtonLink>
            <Link
              href="/studios/kings-park"
              className="inline-flex items-center justify-center rounded-full border border-cream/30 px-7 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-cream/10"
            >
              Kings Park
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
