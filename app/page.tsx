import { ClassFormats } from "@/components/sections/class-formats";
import { Hero } from "@/components/sections/hero";
import { IntroOffer } from "@/components/sections/intro-offer";
import { StudioLocations } from "@/components/sections/studio-locations";
import { Testimonials } from "@/components/sections/testimonials";
import { ValueProp } from "@/components/sections/value-prop";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProp />
      <ClassFormats />
      <Testimonials />
      <StudioLocations />
      <IntroOffer />
    </>
  );
}
