import Image from "next/image";
import Link from "next/link";

import { SOCIAL_LINKS, STUDIO_LIST } from "@/lib/constants";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Classes", href: "/classes" },
  { label: "Instructors", href: "/instructors" },
  { label: "Private Sessions", href: "/private-sessions" },
  { label: "Creche", href: "/creche" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-brown text-cream/80">
      <div className="container-tight grid gap-12 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" aria-label="Reformd Pilates home">
            <Image
              src="/images/logo-cement.svg"
              alt="Reformd Pilates"
              width={200}
              height={36}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
            Where fitness meets luxury, and everyone is invited to find their
            strength. Boutique reformer Pilates in South-West Sydney.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-cream/70 transition-colors hover:text-cement"
            >
              Instagram
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-cream/70 transition-colors hover:text-cement"
            >
              Facebook
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cement">
            Studios
          </p>
          <ul className="mt-4 space-y-4 text-sm">
            {STUDIO_LIST.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/studios/${s.slug}`}
                  className="font-medium text-cream transition-colors hover:text-cement"
                >
                  {s.shortName}
                </Link>
                <p className="mt-1 text-xs leading-relaxed text-cream/60">
                  {s.address}
                  <br />
                  {s.suburb} {s.state} {s.postcode}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cement">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/70 transition-colors hover:text-cement"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-tight flex flex-col items-start justify-between gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Reformd Pilates. All rights reserved.</p>
          <p>Cecil Hills + Kings Park, NSW</p>
        </div>
      </div>
    </footer>
  );
}
