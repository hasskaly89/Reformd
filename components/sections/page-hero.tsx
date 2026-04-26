"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Tailwind classes for the background */
  bgClassName?: string;
};

export function PageHero({
  eyebrow,
  title,
  lede,
  bgClassName = "bg-gradient-to-b from-cream via-cement-100 to-cement-200",
}: PageHeroProps) {
  const reduce = useReducedMotion();
  return (
    <section className={`relative isolate overflow-hidden ${bgClassName}`}>
      <div className="container-tight py-24 md:py-32">
        {eyebrow && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-brown/70"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl text-balance text-[2.25rem] leading-[0.95] sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {lede && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-charcoal/75"
          >
            {lede}
          </motion.p>
        )}
      </div>
    </section>
  );
}
