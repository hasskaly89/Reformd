import { ImageSlot } from "@/components/ui/image-slot";

const VALUES = [
  { title: "Owner-operated", body: "Run by its owners, not a head office." },
  { title: "Small classes", body: "One room per studio, so your instructor sees every rep." },
  { title: "Five formats", body: "From Stretch to Jumpboard. No two weeks the same." },
  { title: "On-site creche", body: "At Cecil Hills, so you actually make it to class." },
];

export function ValueProp() {
  return (
    <section className="bg-cream">
      <div className="container-tight section grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <ImageSlot
          src="/images/studios/cecil-hills-detail.jpg"
          alt="Reformd Pilates member on the reformer box with a resistance strap"
          aspect="aspect-[4/5]"
          className="rounded-sm"
        />
        <div>
          <p className="eyebrow">The studio</p>
          <h2 className="mt-4 text-balance text-4xl md:text-5xl">Boutique by design.</h2>
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
