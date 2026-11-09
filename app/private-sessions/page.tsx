import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { ImageSlot } from "@/components/ui/image-slot";
import { PHONE, PHONE_HREF, SOCIAL_LINKS } from "@/lib/constants";
import { withOg } from "@/lib/meta";

export const metadata: Metadata = withOg({
  title: "Private Sessions & Events",
  description:
    "Private 1:1 and 2:1 reformer Pilates sessions, plus group events and parties at Reformd Pilates Cecil Hills and Kings Park.",
  alternates: { canonical: "/private-sessions" },
});

const BTN = "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium";

function Enquire() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a href={PHONE_HREF} className={`${BTN} bg-brown text-cream`}>
        Call {PHONE}
      </a>
      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={`${BTN} border border-brown/25 text-brown`}>
        Message us on Instagram
      </a>
    </div>
  );
}

// Copy from the live site's Private Sessions page (via the 1 Nov local build).
// TODO(owner): add pricing and session length when confirmed.
export default function PrivateSessionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Private sessions & events"
        title="The room, on your terms."
        lede="Prefer a more personal pace? Book a private session with one of our instructors. Celebrating something? Take over the studio with your people."
      />

      <section className="container-tight section grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ImageSlot
            src="/images/shoot/private-session.jpg"
            alt="Instructor guiding a member through an overhead strap stretch on the reformer"
            aspect="aspect-[4/3] lg:aspect-[4/5]"
            className="rounded-sm"
          />
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow">Private reformer sessions</p>
          <h2 className="mt-4 text-[2rem] sm:text-4xl">1:1 or 2:1, tailored to your goals.</h2>
          <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-charcoal/80">
            <p>
              Our instructors tailor each session to your goals and needs. Work at your own pace, address individual
              concerns and get results in a supportive, one-on-one environment.
            </p>
            <p>
              Perfect if you prefer a more personal approach: brand new, returning after injury, or wanting to go
              deeper on technique.
            </p>
          </div>
          <Enquire />
        </div>
      </section>

      <section className="bg-cement-50">
        <div className="container-tight section grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:order-2 lg:col-span-5">
            <ImageSlot
              src="/images/shoot/members-lounge.jpg"
              alt="Group of friends laughing together in the studio lounge"
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              className="rounded-sm"
            />
          </div>
          <div className="lg:order-1 lg:col-span-7">
            <p className="eyebrow">Events and parties</p>
            <h2 className="mt-4 text-[2rem] sm:text-4xl">Bring your people.</h2>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-charcoal/80">
              Private group classes for birthdays, hens and team get-togethers. Tell us the date and the crew and
              we&rsquo;ll set up the room.
            </p>
            <Enquire />
          </div>
        </div>
      </section>
    </>
  );
}
