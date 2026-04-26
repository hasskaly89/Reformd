"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { Marquee } from "@/components/ui/marquee";
import { STUDIO_LIST } from "@/lib/constants";

const RIBBON_WORDS = [
  "Reformer",
  "Jumpboard",
  "Dynamic",
  "Sculpt",
  "Stretch",
  "Owner-operated",
  "Cecil Hills",
  "Kings Park",
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden grain bg-cream">
      {/* Layered atmosphere — warm cream → stone gradient with two soft light wells */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cream via-cement-50 to-cement-200" />
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(94,75,64,0.12), transparent 55%), radial-gradient(circle at 82% 70%, rgba(191,184,168,0.55), transparent 60%)",
        }}
      />

      {/* Vertical magazine-edge rail */}
      <div className="pointer-events-none absolute left-4 top-0 hidden h-full items-center md:flex">
        <span className="vertical-rl select-none text-[10px] uppercase tracking-[0.4em] text-brown/40">
          Reformd · Est. South-West Sydney · Vol. 01
        </span>
      </div>

      <div className="container-tight relative z-10 grid min-h-[92vh] grid-cols-12 gap-x-6 py-24 md:py-28 lg:py-32">
        {/* LEFT: editorial copy */}
        <div className="col-span-12 flex flex-col justify-center md:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brown" />
            <span className="text-[10px] uppercase tracking-[0.32em] text-brown/70">
              Boutique reformer Pilates · NSW
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 max-w-[14ch] text-balance text-[2.75rem] leading-[0.92] sm:text-6xl md:text-7xl lg:text-[6.25rem] xl:text-[7rem]"
          >
            Redefine
            <br />
            <span className="italic font-normal lowercase tracking-tight text-brown/85">
              strength,
            </span>
            <br />
            reform
            <br />
            your body.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 max-w-md text-base leading-relaxed text-charcoal/75"
          >
            Two owner-operated studios in Cecil Hills and Kings Park.
            Small classes, sharp instruction, and a room that&rsquo;s
            actually nice to be in.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="#intro-offer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-brown px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-all hover:bg-charcoal hover:gap-4"
            >
              Try 4 sessions for $49
              <span aria-hidden className="text-cement transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="#studios"
              className="link-underline inline-flex items-center gap-2 px-2 py-2 text-sm tracking-wide text-brown"
            >
              Or pick a studio
              <span aria-hidden>↓</span>
            </Link>
          </motion.div>

          {/* Studios — refined editorial pair */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            id="studios"
            className="mt-14 grid max-w-xl grid-cols-2 divide-x divide-brown/15 border-y border-brown/15"
          >
            {STUDIO_LIST.map((s, i) => (
              <Link
                key={s.slug}
                href={`/studios/${s.slug}`}
                className="group flex flex-col gap-2 px-5 py-5 transition-colors hover:bg-cement-100/40"
              >
                <span className="tabular text-[10px] uppercase tracking-[0.3em] text-brown/55">
                  Studio · 0{i + 1}
                </span>
                <span className="font-serif text-2xl text-brown">
                  {s.shortName}
                </span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs tracking-wide text-brown/65 transition-colors group-hover:text-brown">
                  Visit
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: image stack — editorial duo (one tall, one offset) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative col-span-12 mt-16 hidden md:col-span-5 md:mt-0 md:block"
        >
          <div className="sticky top-24">
            <ImageSlot
              aspect="aspect-[4/5]"
              tone="warm"
              label="Hero · interior"
              hint="2400×3000 · jpg or webp"
              priority
              className="rounded-sm"
            />
            <div className="absolute -bottom-12 -left-10 hidden w-[60%] lg:block">
              <ImageSlot
                aspect="aspect-[4/3]"
                tone="dark"
                label="Reformer · close-up"
                hint="1800×1350"
                className="rounded-sm border-4 border-cream shadow-2xl shadow-brown/20"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom ribbon marquee — full bleed */}
      <div className="relative z-10 border-y border-brown/15 bg-cream/40 py-5 backdrop-blur-sm">
        <Marquee speed="slow" repeat={4}>
          {RIBBON_WORDS.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="flex items-center gap-8 px-8 font-serif text-[clamp(2rem,4vw,3rem)] uppercase tracking-tight text-brown/85"
            >
              {w}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brown/40" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
