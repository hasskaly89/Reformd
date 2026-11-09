import { SectionHeading } from "@/components/ui/section-heading";

/** Owner-confirmed first-visit facts (9 Nov): 50-minute classes, grip socks required, arrive 10 minutes early, socks and towels sold in studio. */
const STEPS = [
  {
    title: "Start with Balanced",
    body: "Our foundation class. Precision, breath and control, at your pace.",
  },
  {
    title: "Arrive 10 minutes early",
    body: "Time to check in and get settled on your reformer before class starts.",
  },
  {
    title: "Classes run 50 minutes",
    body: "Full-body reformer work from warm-up to final stretch.",
  },
  {
    title: "Grip socks required",
    body: "Forgot yours? Grip socks and towels are for sale at the front desk.",
  },
];

export function FirstVisit() {
  return (
    <section className="border-t border-brown/10 bg-cream">
      <div className="container-tight section">
        <SectionHeading eyebrow="Your first visit" title="First class? Here's what to expect." />
        <ol className="mt-10 grid gap-x-10 border-t border-brown/15 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4 border-b border-brown/15 py-6 lg:flex-col lg:gap-3 lg:border-b-0">
              <span className="font-display text-2xl leading-none text-brown/75 tabular" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg md:text-xl">{s.title}</h3>
                <p className="mt-1.5 text-sm text-charcoal/75">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
