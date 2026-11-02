import { ImageSlot } from "@/components/ui/image-slot";

const VALUES = [
  { title: "Owner-operated", body: "Train with the people who built it." },
  { title: "Small classes", body: "Your instructor actually sees your form." },
  { title: "Five formats", body: "Reformer, Jumpboard, Dynamic, Sculpt, Stretch." },
  { title: "Creche on-site", body: "Bring the kids to Cecil Hills." },
];

export function ValueProp() {
  return (
    <section className="bg-cream">
      <div className="container-tight section grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <ImageSlot
          src="/images/gallery/cecil-hills-community.jpg"
          alt="Members training on the reformer at Reformd Pilates Cecil Hills"
          aspect="aspect-[4/5]"
          className="rounded-sm"
        />
        <div>
          <p className="eyebrow">The studio</p>
          <h2 className="mt-4 text-balance text-4xl md:text-5xl">Not a chain. One room per studio, done properly.</h2>
          <ul className="mt-8 divide-y divide-brown/15 border-y border-brown/15">
            {VALUES.map((v) => (
              <li key={v.title} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <h3 className="text-lg sm:w-48 sm:shrink-0">{v.title}</h3>
                <p className="text-sm text-charcoal/75">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
