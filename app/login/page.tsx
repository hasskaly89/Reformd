import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { StudioChooser } from "@/components/sections/studio-chooser";
import { withOg } from "@/lib/meta";

export const metadata: Metadata = withOg({
  title: "Member Login",
  description: "Log in to manage your Reformd Pilates bookings and membership.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
});

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Members"
        title="Log in to book."
        lede="Choose your studio to sign in to Mindbody and manage your classes. You can also use the Reformd app."
      />
      <StudioChooser href={(s) => s.mindbody.scheduleUrl} cta="Sign in" external />
    </>
  );
}
