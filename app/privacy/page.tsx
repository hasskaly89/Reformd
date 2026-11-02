import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Reformd Pilates collects and uses your personal information.",
  alternates: { canonical: "/privacy" },
};

// TODO(owner): review with your adviser before launch.
const SECTIONS = [
  {
    h: "What we collect",
    b: "When you request an offer or book with us, we collect your first name, mobile number and preferred studio. Bookings and payments are handled by Mindbody under its own privacy policy.",
  },
  {
    h: "How we use it",
    b: "To send you the offer you asked for, follow up about your first classes, and manage your membership. We use a customer management system to store your details and send SMS.",
  },
  {
    h: "SMS",
    b: "We only text you if you agree to it. Every message identifies Reformd Pilates, and you can reply STOP at any time to opt out.",
  },
  {
    h: "Sharing",
    b: "We don't sell your information. We share it only with the service providers that run our bookings, messaging and website, and only so they can do that job.",
  },
  {
    h: "Access and questions",
    b: "You can ask to see, correct or delete the information we hold about you at any time.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Your information." />
      <section className="container-tight section max-w-3xl">
        <div className="grid gap-8">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl">{s.h}</h2>
              <p className="mt-2 text-base leading-relaxed text-charcoal/80">{s.b}</p>
            </div>
          ))}
          <p className="text-base text-charcoal/80">
            Contact us on{" "}
            <a href={PHONE_HREF} className="tabular text-brown underline underline-offset-4">
              {PHONE}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
