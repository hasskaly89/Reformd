import { SectionHeading } from "@/components/ui/section-heading";

// TODO(owner): confirm these are verbatim Google reviews before launch.
const REVIEWS = [
  {
    quote:
      "Absolutely love Reformd Pilates. The studio is stunning, the vibe is always welcoming, and the instructors are so knowledgeable and encouraging.",
    initials: "S.M.",
  },
  {
    quote:
      "The classes at Reformd are well-structured, balanced and have lots of variety. All instructors are very knowledgeable and super helpful.",
    initials: "A.K.",
  },
  {
    quote:
      "Best Pilates studio I've been to. The trainers are experienced, very knowledgeable and helpful.",
    initials: "J.D.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream">
      <div className="container-tight section">
        <SectionHeading eyebrow="From the room" title="The room speaks for itself." />
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {REVIEWS.map((r) => (
            <figure key={r.initials} className="flex flex-col border-t border-brown/15 pt-6">
              <blockquote className="flex-1 text-base leading-relaxed text-charcoal/85">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.2em] text-brown/60">
                {r.initials} · Google review
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
