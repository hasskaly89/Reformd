"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { STUDIO_LIST } from "@/lib/constants";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden">
      {/* Placeholder background — swap for hero image later */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-cement-100 to-cement-200" />
      <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,rgba(70,58,46,0.12),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(181,172,157,0.4),transparent_60%)]" />

      <div className="container-tight flex min-h-[88vh] flex-col justify-center py-24 md:py-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-[0.3em] text-brown/70"
        >
          Cecil Hills · Kings Park
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 max-w-4xl text-balance text-[2.5rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-[5rem]"
        >
          Redefine strength,
          <br className="hidden sm:block" /> reform your body.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-charcoal/75"
        >
          Boutique reformer Pilates for the modern mover. Owner-operated studios
          in Cecil Hills and Kings Park — small classes, sharp instruction, and
          a room that&rsquo;s actually nice to be in.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <ButtonLink href="#intro-offer" variant="primary">
            Try 4 sessions for $49
          </ButtonLink>
          <ButtonLink href="#studios" variant="ghost">
            Or pick a studio →
          </ButtonLink>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          id="studios"
          className="mt-16 grid max-w-2xl gap-3 sm:grid-cols-2"
        >
          {STUDIO_LIST.map((s) => (
            <Link
              key={s.slug}
              href={`/studios/${s.slug}`}
              className="group flex items-center justify-between rounded-md border border-brown/15 bg-cream/70 px-5 py-4 backdrop-blur-sm transition-colors hover:border-brown/40 hover:bg-cream"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brown/60">
                  Studio
                </p>
                <p className="mt-1 font-serif text-2xl text-brown">
                  {s.shortName}
                </p>
              </div>
              <span
                aria-hidden
                className="text-brown/40 transition-transform group-hover:translate-x-1 group-hover:text-brown"
              >
                →
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
