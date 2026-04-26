import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { STUDIO_LIST } from "@/lib/constants";

export function StudioLocations() {
  return (
    <section className="bg-brown text-cream">
      <div className="container-tight py-24 md:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-cement">
            Two studios
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl text-cream md:text-5xl">
            Find your home in the south-west.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {STUDIO_LIST.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-cream/10 bg-cream/[0.03]">
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-cement-300 via-cement-400 to-cement-700" />
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <h3 className="font-serif text-3xl text-cream">
                    {s.shortName}
                  </h3>
                  <p className="text-sm leading-relaxed text-cream/70">
                    {s.address}
                    <br />
                    {s.suburb} {s.state} {s.postcode}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    <Link
                      href={`/studios/${s.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-cream px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brown transition-colors hover:bg-cement-100"
                    >
                      Visit studio
                    </Link>
                    <Link
                      href={`/schedule/${s.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-cream/30 px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-cream/10"
                    >
                      Schedule
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
