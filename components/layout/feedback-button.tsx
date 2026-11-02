"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Preview-only feedback: composes an email with the page, screen size and
 * device already filled in. Shown only on Vercel previews (never production)
 * and only when NEXT_PUBLIC_FEEDBACK_EMAIL is set.
 */
const TO = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL;
const SHOW = !!TO && process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

function deviceLabel() {
  const ua = navigator.userAgent;
  const os = /iPhone|iPad/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Mac/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : "Other";
  const browser = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : /Firefox\//.test(ua) ? "Firefox" : "Other";
  return `${os} · ${browser} · ${window.innerWidth}×${window.innerHeight}`;
}

export function FeedbackButton() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  if (!SHOW) return null;

  function send(e: React.FormEvent) {
    e.preventDefault();
    const page = window.location.href;
    const subject = `Website feedback: ${pathname}`;
    const body = [
      note.trim(),
      "",
      "---",
      `From: ${name.trim() || "(no name)"}`,
      `Page: ${page}`,
      `Device: ${deviceLabel()}`,
      "Tip: attach a screenshot if it helps.",
    ].join("\n");
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpen(false);
    setNote("");
  }

  return (
    <div className="fixed bottom-24 left-4 z-40 print:hidden lg:bottom-4">
      {open ? (
        <form
          onSubmit={send}
          className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-brown/15 bg-cream p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-brown">Feedback on this page</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close feedback"
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-brown/70 hover:bg-cement-100"
            >
              ×
            </button>
          </div>
          <textarea
            required
            autoFocus
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="What should change? Be as specific as you like."
            className="mt-2 w-full rounded-lg border border-brown/25 bg-white p-3 text-base outline-none focus:border-brown"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="mt-2 h-11 w-full rounded-lg border border-brown/25 bg-white px-3 text-base outline-none focus:border-brown"
          />
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-brown px-5 py-3 text-sm font-medium text-cream"
          >
            Send feedback
          </button>
          <p className="mt-2 text-xs text-charcoal/60">Opens your email with this page&rsquo;s details filled in.</p>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-3 text-sm font-medium text-cream shadow-lg"
        >
          <span aria-hidden>✎</span> Feedback
        </button>
      )}
    </div>
  );
}
