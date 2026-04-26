"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_LINKS, STUDIO_LIST } from "@/lib/constants";

type DesktopDropdownProps = {
  label: string;
  items: ReadonlyArray<{ label: string; href: string }>;
};

function DesktopDropdown({ label, items }: DesktopDropdownProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 py-2 text-sm tracking-wide text-charcoal/80 transition-colors hover:text-brown"
      >
        {label}
        <svg
          aria-hidden
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className="transition-transform group-hover:rotate-180"
        >
          <path
            d="M2 4l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="min-w-[180px] rounded-md border border-cement/30 bg-cream py-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-charcoal/80 transition-colors hover:bg-cement/10 hover:text-brown"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookNowButton({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);
  const base =
    "inline-flex items-center justify-center rounded-full bg-brown px-6 py-2.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-charcoal";

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50">
          Book Now
        </p>
        {STUDIO_LIST.map((s) => (
          <Link
            key={s.slug}
            href={`/schedule/${s.slug}`}
            className={base + " w-full"}
          >
            Book {s.shortName}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={base}
      >
        Book Now
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-md border border-cement/30 bg-cream py-2 shadow-lg">
          <p className="px-4 pb-2 text-xs uppercase tracking-[0.2em] text-charcoal/50">
            Choose a studio
          </p>
          {STUDIO_LIST.map((s) => (
            <Link
              key={s.slug}
              href={`/schedule/${s.slug}`}
              className="block px-4 py-2 text-sm text-charcoal/80 transition-colors hover:bg-cement/10 hover:text-brown"
            >
              {s.shortName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? "border-b border-cement/30 bg-cream/95 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav className="container-tight flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="Reformd Pilates home">
          <Image
            src="/images/logo-brown.svg"
            alt="Reformd Pilates"
            width={140}
            height={26}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) =>
            "children" in link ? (
              <DesktopDropdown
                key={link.label}
                label={link.label}
                items={link.children}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-charcoal/80 transition-colors hover:text-brown"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden lg:block">
          <BookNowButton />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-charcoal transition-transform duration-200 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-charcoal transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-charcoal transition-transform duration-200 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden">
          <div className="container-tight max-h-[calc(100vh-5rem)] overflow-y-auto py-6">
            <ul className="flex flex-col divide-y divide-cement/20">
              {NAV_LINKS.map((link) =>
                "children" in link ? (
                  <li key={link.label} className="py-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-charcoal/50">
                      {link.label}
                    </p>
                    <ul className="flex flex-col gap-2 pl-1">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-base text-charcoal/80 transition-colors hover:text-brown"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={link.href} className="py-4">
                    <Link
                      href={link.href}
                      className="text-base text-charcoal/90 transition-colors hover:text-brown"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <div className="mt-6">
              <BookNowButton variant="mobile" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
