"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_LINKS, PHONE, PHONE_HREF, SOCIAL_LINKS, STUDIO_LIST, type NavLink } from "@/lib/constants";

const BOOK_ITEMS = STUDIO_LIST.map((s) => ({ label: s.shortName, href: `/schedule/${s.slug}` }));

function NavAnchor({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  children: React.ReactNode;
}) {
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Hover + keyboard (focus-within) dropdown, no JS state. */
function Dropdown({
  label,
  items,
  align = "center",
  trigger,
}: {
  label: string;
  items: NonNullable<NavLink["children"]>;
  align?: "center" | "right";
  trigger?: string;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className={
          trigger ??
          "flex items-center gap-1 py-2 text-sm text-charcoal/80 transition-colors hover:text-brown"
        }
      >
        {label}
        {!trigger && (
          <svg aria-hidden width="10" height="10" viewBox="0 0 10 10">
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        )}
      </button>
      <div
        className={`invisible absolute top-full z-50 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${
          align === "right" ? "right-0" : "left-1/2 -translate-x-1/2"
        }`}
      >
        <div className="min-w-[170px] rounded-md border border-cement/40 bg-cream py-2 shadow-lg">
          {items.map((item) => (
            <NavAnchor
              key={item.href}
              href={item.href}
              external={item.external}
              className="block px-4 py-2 text-sm text-charcoal/80 hover:bg-cement/15 hover:text-brown"
            >
              {item.label}
            </NavAnchor>
          ))}
        </div>
      </div>
    </div>
  );
}

const PRIMARY_BTN =
  "inline-flex items-center justify-center rounded-full bg-brown px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-cement/40 bg-cream/95 backdrop-blur">
        <nav className="container-tight flex h-16 items-center justify-between gap-6 md:h-20">
          <Link href="/" className="shrink-0 py-3" aria-label="Reformd Pilates home">
            <Image
              src="/images/logo-brown.svg"
              alt="Reformd Pilates"
              width={140}
              height={26}
              priority
              className="h-5 w-auto md:h-6"
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <Dropdown key={link.label} label={link.label} items={link.children} />
              ) : (
                <NavAnchor
                  key={link.label}
                  href={link.href!}
                  external={link.external}
                  className="py-2 text-sm text-charcoal/80 transition-colors hover:text-brown"
                >
                  {link.label}
                </NavAnchor>
              ),
            )}
          </div>

          <div className="hidden lg:block">
            <Dropdown label="Book now" items={BOOK_ITEMS} align="right" trigger={PRIMARY_BTN} />
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`block h-0.5 w-6 bg-charcoal transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-charcoal transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-charcoal transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="menu-in fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-cream lg:hidden"
        >
          <div className="container-tight flex min-h-full flex-col pb-8 pt-6">
            {/* Studios: every action is per studio, so group by studio */}
            <div className="grid gap-4">
              {STUDIO_LIST.map((s) => (
                <section key={s.slug} className="rounded-2xl border border-brown/15 bg-white/60 p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-2xl">{s.shortName}</h2>
                    <span className="text-xs text-charcoal/60">{s.region.split(", ")[1]}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href={`/schedule/${s.slug}`}
                      className="col-span-2 inline-flex items-center justify-center rounded-full bg-brown px-4 py-3 text-base font-medium text-cream"
                    >
                      Book a class
                    </Link>
                    <Link
                      href={`/pricing/${s.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-brown/25 px-4 py-3 text-sm font-medium text-brown"
                    >
                      Pricing
                    </Link>
                    <Link
                      href={`/studios/${s.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-brown/25 px-4 py-3 text-sm font-medium text-brown"
                    >
                      Studio info
                    </Link>
                  </div>
                </section>
              ))}
            </div>

            {/* Site pages */}
            <ul className="mt-6 border-t border-brown/15">
              {[
                { label: "Classes", href: "/classes" },
                { label: "About", href: "/about" },
              ].map((l) => (
                <li key={l.href} className="border-b border-brown/15">
                  <Link href={l.href} className="flex items-center justify-between py-4 font-display text-2xl font-semibold uppercase text-brown">
                    {l.label} <span aria-hidden className="font-sans text-xl text-brown/50">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <a
                href="/#intro-offer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl bg-brown px-5 py-4 text-cream"
              >
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-cream/70">New here?</span>
                  <span className="mt-1 block font-display text-xl font-semibold uppercase">4 classes for $49</span>
                </span>
                <span aria-hidden className="text-2xl">→</span>
              </a>
              <div className="mt-5 flex items-center justify-between text-sm text-brown">
                <a href={PHONE_HREF} className="py-3 tabular">{PHONE}</a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="py-3">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
