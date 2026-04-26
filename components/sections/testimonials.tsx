import { Reveal } from "@/components/ui/reveal";
import { SectionNumber } from "@/components/ui/section-number";

const REVIEWS = [
  {
    quote:
      "Absolutely love Reformd Pilates. The studio is stunning, the vibe is always welcoming, and the instructors are so knowledgeable and encouraging. Every class challenges me in the best way and leaves me feeling stronger, more flexible and refreshed.",
    source: "Google review",
    initials: "S.M.",
  },
  {
    quote:
      "The classes at Reformd are well-structured, balanced and have lots of variety. All instructors are very knowledgeable and super helpful.",
    source: "Google review",
    initials: "A.K.",
  },
  {
    quote:
      "Best Pilates studio I've been to. The trainers are experienced, very knowledgeable and helpful. The vibes are great and the range of class times available suits everyone's busy schedule.",
    source: "Google review",
    initials: "J.D.",
  },
];

export function Testimonials() {
  return (
    <section className="relative isolate bg-cream">
      <div className="container-tight py-28 md:py-36">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <SectionNumber index="03" label="From the room" />
              <h2 className="mt-8 max-w-md text-balance text-[2.5rem] leading-[0.92] sm:text-5xl md:text-[3.25rem]">
                The room
                <br />
                speaks for
                <br />
                <span className="italic font-normal lowercase tracking-tight text-brown/85">
                  itself.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Featured pull quote — large */}
          <div className="col-span-12 md:col-span-7 md:pl-6">
            <Reveal delay={0.1}>
              <figure className="border-l border-brown/20 pl-6 md:pl-8">
                <span
                  aria-hidden
                  className="font-serif text-[6rem] leading-[0.7] text-brown/25 md:text-[8rem]"
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-6 max-w-xl text-2xl font-light leading-[1.35] text-charcoal/90 md:text-3xl">
                  {REVIEWS[0].quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-brown/65">
                  <span className="tabular">{REVIEWS[0].initials}</span>
                  <span className="h-px w-8 bg-brown/30" />
                  <span>{REVIEWS[0].source}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* Secondary quotes — slim editorial pair */}
        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {REVIEWS.slice(1).map((r, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <figure className="flex h-full flex-col">
                <span className="tabular text-[10px] uppercase tracking-[0.25em] text-brown/55">
                  0{i + 2} · Review
                </span>
                <blockquote className="mt-5 flex-1 text-lg leading-[1.5] text-charcoal/85">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-brown/55">
                  <span className="tabular">{r.initials}</span>
                  <span className="h-px w-6 bg-brown/30" />
                  <span>{r.source}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
