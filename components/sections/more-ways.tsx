import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { CRECHE } from "@/lib/constants";

// From the 1 Nov local build's homepage "Beyond the schedule" section.
const ITEMS = [
  {
    href: "/creche",
    eyebrow: "Creche",
    title: "Bring the kids.",
    body: `Creche at both studios, ${CRECHE.days} at ${CRECHE.times.join(" and ")}. Free with a ${CRECHE.freeFor}, ${CRECHE.price} for everyone else.`,
    photo: "/images/studios/cecil-hills-detail.jpg",
    alt: "A member training at Reformd Pilates Cecil Hills",
  },
  {
    href: "/private-sessions",
    eyebrow: "Private sessions & events",
    title: "Just you. Or just your people.",
    body: "1:1 and 2:1 reformer sessions tailored to your goals, and private group classes for birthdays, hens and team get-togethers.",
    photo: "/images/shoot/private-session.jpg",
    alt: "Instructor guiding a member through a strap stretch on the reformer",
  },
];

export function MoreWays() {
  return (
    <section className="bg-cream">
      <div className="container-tight section">
        <SectionHeading eyebrow="Beyond the schedule" title="Two more ways to make Reformd fit your life." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group grid grid-cols-5 overflow-hidden rounded-sm bg-cement-50 transition-colors hover:bg-cement-100"
            >
              <div className="col-span-2">
                <ImageSlot src={item.photo} alt={item.alt} aspect="aspect-auto h-full min-h-[9rem]" sizes="(min-width: 768px) 20vw, 40vw" />
              </div>
              <div className="col-span-3 flex flex-col p-5 md:p-7">
                <p className="eyebrow">{item.eyebrow}</p>
                <h3 className="mt-2 text-xl md:text-2xl">{item.title}</h3>
                <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-charcoal/75 sm:block">{item.body}</p>
                <span className="mt-3 text-sm font-medium text-brown group-hover:underline">Find out more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
