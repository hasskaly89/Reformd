import { Reveal } from "@/components/ui/reveal";

const VALUES = [
  {
    label: "Owner-operated",
    body: "Ten years of experience on every reformer. You're not training under a brand — you're training with the people who built it.",
  },
  {
    label: "Boutique class sizes",
    body: "Small groups so an instructor actually sees your form and adjusts — never a 30-person grid.",
  },
  {
    label: "Five class formats",
    body: "Reformer, Jumpboard, Dynamic, Sculpt and Stretch — vary the stimulus without leaving the studio.",
  },
  {
    label: "Creche on-site",
    body: "Bring the kids. Cecil Hills runs a creche so the half-hour you carve out for yourself actually happens.",
  },
];

export function ValueProp() {
  return (
    <section className="container-tight py-24 md:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brown/60">
          More than just a workout
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl md:text-5xl">
          A studio designed for the way you actually live.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
        {VALUES.map((v, i) => (
          <Reveal key={v.label} delay={i * 0.05}>
            <div className="border-l border-brown/20 pl-6">
              <p className="text-xs uppercase tracking-[0.2em] text-cement-700">
                {v.label}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-charcoal/80">
                {v.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
