"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_LINKS, STUDIO_LIST, type NavLink } from "@/lib/constants";

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

/** Hover + keyboard (focus-within) dropdown — no JS state. */
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
    <header className="sticky top-0 z-40 border-b border-cement/40 bg-cream/95 backdrop-blur">
      <nav className="container-tight flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="shrink-0" aria-label="Reformd Pilates home">
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
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`block h-px w-6 bg-charcoal transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-charcoal transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-charcoal transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden">
          <div className="container-tight max-h-[calc(100vh-4rem)] overflow-y-auto pb-8">
            <ul className="divide-y divide-cement/30">
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="py-4">
                  {link.children ? (
                    <>
                      <p className="eyebrow">{link.label}</p>
                      <div className="mt-2 flex gap-6">
                        {link.children.map((c) => (
                          <NavAnchor key={c.href} href={c.href} external={c.external} className="text-base text-charcoal/90">
                            {c.label}
                          </NavAnchor>
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavAnchor href={link.href!} external={link.external} className="text-base text-charcoal/90">
                      {link.label}
                    </NavAnchor>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {BOOK_ITEMS.map((b) => (
                <Link key={b.href} href={b.href} className={PRIMARY_BTN}>
                  Book {b.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
