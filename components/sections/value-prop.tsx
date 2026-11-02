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
    <section className="bg-cream">
      <div className="container-tight section grid gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <p className="eyebrow">The studio</p>
          <h2 className="mt-4 text-balance text-4xl md:text-5xl">
            A studio designed for the way you actually live.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/75">
            Reformd isn&rsquo;t a chain. It&rsquo;s two rooms, run by people who
            chose every detail — from the reformer count to the pre-class
            playlist.
          </p>
        </div>

        <ul className="divide-y divide-brown/15 border-y border-brown/15">
          {VALUES.map((v) => (
            <li key={v.title} className="py-6">
              <h3 className="text-xl md:text-2xl">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
