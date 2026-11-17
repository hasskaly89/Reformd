import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  children: ReactNode;
};

const VARIANTS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-outline",
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
      ? "inline-flex items-center gap-1 text-sm transition-colors"
      : "btn";
  return (
    <Link {...rest} className={`${base} ${VARIANTS[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}
