import { Reveal } from "@/components/ui/reveal";

const REVIEWS = [
  {
    quote:
      "Absolutely love Reformd Pilates. The studio is stunning, the vibe is always welcoming, and the instructors are so knowledgeable and encouraging. Every class challenges me in the best way and leaves me feeling stronger, more flexible and refreshed.",
    source: "Google review",
  },
  {
    quote:
      "The classes at Reformd are well-structured, balanced and have lots of variety. All instructors are very knowledgeable and super helpful.",
    source: "Google review",
  },
  {
    quote:
      "Best Pilates studio I've been to. The trainers are experienced, very knowledgeable and helpful. The vibes are great and the range of class times available suits everyone's busy schedule.",
    source: "Google review",
  },
];

export function Testimonials() {
  return (
    <section className="container-tight py-24 md:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
          From the community
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">
          The room speaks for itself.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-lg border border-brown/10 bg-cream p-7">
              <span aria-hidden className="font-serif text-5xl leading-none text-cement">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/85">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-brown/60">
                {r.source}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
