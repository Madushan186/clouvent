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
    <Link
      href={href}
      className={`underline decoration-border-subtle underline-offset-4 transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:decoration-accent hover:text-accent ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
