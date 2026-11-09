import { ImageSlot } from "@/components/ui/image-slot";

const VALUES = [
  { title: "Owner-operated", body: "Run by its owners, not a head office." },
  { title: "Small classes", body: "One room per studio, so your instructor sees every rep." },
  { title: "Five class types", body: "From Recharge to Ignite. No two weeks the same." },
  { title: "Weekday creche", body: "At both studios, so you actually make it to class." },
];

export function ValueProp() {
  return (
    <section className="bg-cream">
      <div className="container-tight section grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <ImageSlot
          src="/images/shoot/community-group.jpg"
          alt="A group of smiling members gathered together on the reformers"
          position="50% 10%"
          aspect="aspect-[4/3] md:aspect-[4/5]"
          className="rounded-sm"
        />
        <div>
          <p className="eyebrow">The studio</p>
          <h2 className="mt-4 text-4xl lg:text-5xl">Boutique by design.</h2>
          <ul className="mt-8 divide-y divide-brown/15 border-y border-brown/15">
            {VALUES.map((v) => (
              <li key={v.title} className="py-4 sm:py-5">
                <h3 className="text-lg md:text-xl">{v.title}</h3>
                <p className="mt-1.5 hidden text-sm text-charcoal/75 sm:block">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
