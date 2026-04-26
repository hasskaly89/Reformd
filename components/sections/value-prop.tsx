import { Reveal } from "@/components/ui/reveal";
import { SectionNumber } from "@/components/ui/section-number";

const VALUES = [
  {
    title: "Owner-operated",
    body: "Ten years of experience on every reformer. You're not training under a brand — you're training with the people who built it.",
  },
  {
    title: "Boutique class sizes",
    body: "Small groups so an instructor actually sees your form and adjusts — never a 30-person grid.",
  },
  {
    title: "Five class formats",
    body: "Reformer, Jumpboard, Dynamic, Sculpt and Stretch — vary the stimulus without leaving the studio.",
  },
  {
    title: "Creche on-site",
    body: "Bring the kids. Cecil Hills runs a creche so the half-hour you carve out for yourself actually happens.",
  },
];

export function ValueProp() {
  return (
    <section className="relative isolate bg-cream">
      <div className="container-tight grid grid-cols-12 gap-x-6 py-28 md:py-36">
        {/* Editorial header — 4 col */}
        <div className="col-span-12 md:col-span-5">
          <Reveal>
            <SectionNumber index="01" label="The studio" />
            <h2 className="mt-8 max-w-md text-balance text-[2.5rem] leading-[0.92] sm:text-5xl">
              A studio designed for the way you actually live.
            </h2>
            <div className="rule mt-10 max-w-xs" />
            <p className="mt-8 max-w-md text-base leading-relaxed text-charcoal/70">
              Reformd isn&rsquo;t a chain. It&rsquo;s two rooms, run by people
              who chose every detail — from the reformer count to the
              pre-class playlist.
            </p>
          </Reveal>
        </div>

        {/* Numbered cards — 7 col, asymmetric stagger */}
        <div className="col-span-12 mt-16 md:col-span-7 md:mt-0">
          <ul className="flex flex-col">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <li
                  className={`group relative grid grid-cols-12 gap-4 border-t border-brown/15 py-7 transition-colors first:border-t-0 hover:bg-cement-100/30 ${
                    i === VALUES.length - 1 ? "border-b border-brown/15" : ""
                  }`}
                >
                  <span className="tabular col-span-2 text-xs font-medium tracking-[0.05em] text-brown/55">
                    0{i + 1}
                  </span>
                  <div className="col-span-10">
                    <h3 className="font-serif text-2xl text-brown md:text-3xl">
                      {v.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/75">
                      {v.body}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brown/0 transition-all group-hover:translate-x-2 group-hover:text-brown/40"
                  >
                    →
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
