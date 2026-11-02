"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { STUDIO_LIST, STUDIOS, type StudioSlug } from "@/lib/constants";

const STORAGE_KEY = "reformd-intro-popup";
const SUPPRESS_DAYS = 7;
const DELAY_MS = 12_000;
const SCROLL_TRIGGER = 0.45;
/** Pages where people are already buying: never interrupt them */
const EXCLUDED = ["/pricing", "/schedule", "/privacy", "/api"];

const store = {
  suppressed(): boolean {
    try {
      const t = Number(localStorage.getItem(STORAGE_KEY));
      return !!t && Date.now() - t < SUPPRESS_DAYS * 86_400_000;
    } catch {
      return false;
    }
  },
  suppress() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  },
};

type Status = "idle" | "sending" | "done" | "fallback";

export function IntroPopup() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [studio, setStudio] = useState<StudioSlug | "">("");
  const firstField = useRef<HTMLInputElement>(null);
  const excluded = EXCLUDED.some((p) => pathname.startsWith(p));

  // Preselect the studio when the visitor is on that studio's page
  useEffect(() => {
    const match = STUDIO_LIST.find((s) => pathname.includes(s.slug));
    if (match) setStudio(match.slug);
  }, [pathname]);

  const show = useCallback(() => {
    if (excluded || store.suppressed()) return;
    setOpen(true);
  }, [excluded]);

  // Triggers: 12s on page, 45% scroll, or desktop exit intent. Whichever first.
  useEffect(() => {
    if (excluded || store.suppressed()) return;
    const timer = window.setTimeout(show, DELAY_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SCROLL_TRIGGER) show();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [excluded, show]);

  const close = useCallback(() => {
    setOpen(false);
    store.suppress();
  }, []);

  // Esc to close, focus the first field, lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstField.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.get("firstName"),
          phone: form.get("phone"),
          studio: form.get("studio"),
          consent: form.get("consent") === "on",
          company: form.get("company"),
          page: pathname,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        store.suppress();
      } else if (data.fallback) {
        setStatus("fallback");
      } else {
        setStatus("idle");
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("fallback");
    }
  }

  if (!open) return null;
  const chosen = studio ? STUDIOS[studio] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/50 sm:items-center sm:p-6" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-popup-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-cream px-6 pb-8 pt-7 shadow-2xl sm:max-w-md sm:rounded-2xl sm:px-8"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none text-brown/70 hover:bg-cement-100"
        >
          ×
        </button>

        {status === "done" || status === "fallback" ? (
          <div className="pr-8">
            <p className="eyebrow">{status === "done" ? "You're in" : "Almost there"}</p>
            <h2 id="intro-popup-title" className="mt-3 text-3xl">
              {status === "done" ? "Check your phone." : "Claim it here."}
            </h2>
            <p className="mt-3 text-base text-charcoal/80">
              {status === "done"
                ? "We've texted you the link. Or grab your 4 classes for $49 right now:"
                : "We couldn't send the text just now, but you can claim your 4 classes for $49 directly:"}
            </p>
            <div className="mt-6 grid gap-3">
              {(chosen ? [chosen] : STUDIO_LIST).map((s) => (
                <a
                  key={s.slug}
                  href={s.mindbody.introOfferUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brown px-6 py-3.5 text-sm font-medium text-cream hover:bg-charcoal"
                >
                  Claim at {s.shortName} <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow">New to Reformd?</p>
            <h2 id="intro-popup-title" className="mt-3 pr-8 text-3xl sm:text-4xl">
              4 classes for $49.
            </h2>
            <p className="mt-3 text-base text-charcoal/80">
              Pop in your details and we&rsquo;ll text you the link to claim it.
            </p>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
              <label className="grid gap-1.5 text-sm font-medium text-brown">
                First name
                <input
                  ref={firstField}
                  name="firstName"
                  required
                  autoComplete="given-name"
                  className="h-12 rounded-lg border border-brown/25 bg-white px-4 text-base font-normal text-charcoal outline-none focus:border-brown focus:ring-2 focus:ring-brown/20"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-brown">
                Mobile
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  placeholder="0412 345 678"
                  className="h-12 rounded-lg border border-brown/25 bg-white px-4 text-base font-normal text-charcoal outline-none focus:border-brown focus:ring-2 focus:ring-brown/20"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-brown">
                Studio
                <select
                  name="studio"
                  required
                  value={studio}
                  onChange={(e) => setStudio(e.target.value as StudioSlug)}
                  className="h-12 rounded-lg border border-brown/25 bg-white px-4 text-base font-normal text-charcoal outline-none focus:border-brown focus:ring-2 focus:ring-brown/20"
                >
                  <option value="" disabled>
                    Choose your studio
                  </option>
                  {STUDIO_LIST.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.shortName}
                    </option>
                  ))}
                </select>
              </label>

              {/* Honeypot: hidden from people, filled by bots */}
              <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

              <label className="flex items-start gap-3 text-xs leading-relaxed text-charcoal/75">
                <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-brown" />
                <span>
                  I agree to receive SMS from Reformd Pilates about this offer. Reply STOP to opt out. See our{" "}
                  <Link href="/privacy" className="underline underline-offset-2" onClick={close}>
                    privacy policy
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <p role="alert" className="text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center rounded-full bg-brown px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Text me the offer"}
              </button>
              <button type="button" onClick={close} className="py-2 text-sm text-brown/70 underline-offset-4 hover:underline">
                No thanks
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
