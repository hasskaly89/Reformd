"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional pre-title index, e.g. "01" */
  index?: string;
  /** Tailwind classes for the background */
  bgClassName?: string;
  /** Tone for typography colors when on a dark bg */
  tone?: "dark" | "light";
};

export function PageHero({
  eyebrow,
  title,
  lede,
  index,
  bgClassName = "bg-gradient-to-b from-cream via-cement-50 to-cement-100",
  tone = "dark",
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const labelColor = tone === "dark" ? "text-brown/60" : "text-cream/65";
  const ruleColor = tone === "dark" ? "bg-brown/20" : "bg-cream/25";
  const ledeColor = tone === "dark" ? "text-charcoal/75" : "text-cream/75";
  const indexColor = tone === "dark" ? "text-brown" : "text-cream";

  return (
    <section className={`relative isolate overflow-hidden grain-light ${bgClassName}`}>
      {/* Soft atmospheric wells */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(94,75,64,0.08), transparent 55%), radial-gradient(circle at 80% 75%, rgba(191,184,168,0.45), transparent 60%)",
        }}
      />

      <div className="container-tight relative z-10 py-28 md:py-36">
        {(eyebrow || index) && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            {index && (
              <span
                className={`tabular text-xs font-medium tracking-[0.05em] ${indexColor}`}
              >
                — {index}
              </span>
            )}
            {(index || eyebrow) && (
              <span className={`h-px w-8 ${ruleColor}`} />
            )}
            {eyebrow && (
              <span
                className={`text-[10px] uppercase tracking-[0.32em] ${labelColor}`}
              >
                {eyebrow}
              </span>
            )}
          </motion.div>
        )}

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-7 max-w-4xl text-balance text-[2.5rem] leading-[0.92] sm:text-5xl md:text-6xl lg:text-[5rem] ${
            tone === "light" ? "text-cream" : ""
          }`}
        >
          {title}
        </motion.h1>

        {lede && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className={`mt-10 max-w-2xl text-lg leading-relaxed ${ledeColor}`}
          >
            {lede}
          </motion.p>
        )}
      </div>
    </section>
  );
}
