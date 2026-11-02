import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, PHONE, PHONE_HREF, SOCIAL_LINKS, STUDIO_LIST } from "@/lib/constants";

const FOOTER_LINKS = [
  ...NAV_LINKS.flatMap((l) => (l.href ? [{ label: l.label, href: l.href }] : [])),
  { label: "Contact", href: "/contact" },
  { label: "Creche", href: "/creche" },
  { label: "Private sessions", href: "/private-sessions" },
  { label: "Member login", href: "/login" },
];

export function SiteFooter() {
  return (
    <footer className="bg-brown text-sm text-cream/70">
      <div className="container-tight grid gap-8 py-10 md:grid-cols-[1fr_auto_auto] md:items-start md:gap-14">
        <div>
          <Link href="/" aria-label="Reformd Pilates home">
            <Image src="/images/logo-cement.svg" alt="Reformd Pilates" width={140} height={26} className="h-5 w-auto" />
          </Link>
          <a href={PHONE_HREF} className="mt-3 inline-block py-2.5 tabular text-cream hover:text-cement">
            {PHONE}
          </a>
          <div className="flex gap-5">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="inline-block py-2.5 hover:text-cream">
              Instagram
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="inline-block py-2.5 hover:text-cream">
              Facebook
            </a>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:gap-x-10">
          {STUDIO_LIST.map((s) => (
            <li key={s.slug}>
              <Link href={`/studios/${s.slug}`} className="font-medium text-cream hover:text-cement">
                {s.shortName}
              </Link>
              <p className="mt-1 text-sm leading-relaxed text-cream/70">
                {s.address}
                <br />
                {s.suburb} {s.state} {s.postcode}
              </p>
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-2 gap-x-6 md:grid-cols-1">
          {FOOTER_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block py-2 hover:text-cream">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-cream/10">
        <p className="container-tight py-4 text-sm text-cream/60">
          © {new Date().getFullYear()} Reformd Pilates · Cecil Hills + Kings Park, NSW ·{" "}
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
