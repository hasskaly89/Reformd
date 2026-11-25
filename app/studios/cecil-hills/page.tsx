import type { Metadata } from "next";

import { StudioDetail } from "@/components/sections/studio-detail";
import { STUDIOS } from "@/lib/constants";
import { studioMetadata } from "@/lib/seo";

const studio = STUDIOS["cecil-hills"];

export const metadata: Metadata = studioMetadata(studio);

export default function CecilHillsPage() {
  return <StudioDetail studio={studio} />;
}
