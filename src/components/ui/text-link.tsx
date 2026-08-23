import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Inline prose link — distinct from Button's "text" variant, which is a
 * standalone CTA styled as text. This is for links inside body copy.
 */
export function TextLink({ href, children, className = "", ...props }: TextLinkProps) {
  return (
    // Copper text/underline on Cloud Ivory measures ~2.9:1 — fails WCAG
    // non-text contrast (3:1) at normal link size, so hover emphasis comes
    // from underline weight, not colour, keeping text at a compliant
    // foreground colour throughout.
    <Link
      href={href}
      className={`underline decoration-border-subtle decoration-1 underline-offset-4 transition-[text-decoration-color,text-decoration-thickness] duration-(--duration-fast) ease-(--ease-standard) hover:decoration-foreground hover:decoration-2 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
