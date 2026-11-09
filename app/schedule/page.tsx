import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { StudioChooser } from "@/components/sections/studio-chooser";
import { withOg } from "@/lib/meta";

export const metadata: Metadata = withOg({
  title: "Class Schedule",
  description: "Live reformer Pilates timetables for Reformd Cecil Hills and Kings Park. Choose your studio to book.",
  alternates: { canonical: "/schedule" },
});

export default function SchedulePicker() {
  return (
    <>
      <PageHero eyebrow="Schedule" title="Choose your studio." lede="See this week's classes and book your spot." />
      <StudioChooser href={(s) => `/schedule/${s.slug}`} cta="Schedule" />
    </>
  );
}
