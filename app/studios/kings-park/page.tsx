import type { Metadata } from "next";

import { StudioDetail } from "@/components/sections/studio-detail";
import { STUDIOS } from "@/lib/constants";
import { studioMetadata } from "@/lib/seo";

const studio = STUDIOS["kings-park"];

export const metadata: Metadata = studioMetadata(studio);

export default function KingsParkPage() {
  return <StudioDetail studio={studio} />;
}
