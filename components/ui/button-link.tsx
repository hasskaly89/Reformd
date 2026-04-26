import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  children: ReactNode;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brown text-cream hover:bg-charcoal",
  secondary:
    "bg-cream text-brown ring-1 ring-inset ring-brown/30 hover:bg-cement-100",
  ghost:
    "text-brown underline-offset-4 hover:underline",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const base =
    variant === "ghost"
      ? "inline-flex items-center gap-1 text-sm tracking-wide transition-colors"
      : "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors";
  return (
    <Link {...rest} className={`${base} ${VARIANTS[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}
