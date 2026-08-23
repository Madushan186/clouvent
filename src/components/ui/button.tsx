import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "text";

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-body font-medium " +
  "transition-colors duration-(--duration-standard) ease-(--ease-standard) " +
  "disabled:opacity-40 disabled:pointer-events-none";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "rounded-(--radius-control) bg-accent text-foreground-inverse px-6 py-3 hover:bg-accent-hover",
  secondary:
    "rounded-(--radius-control) border border-border-subtle px-6 py-3 hover:bg-background-subtle",
  text: "underline-offset-4 hover:underline",
};

interface CommonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Renders a link (next/link) when `href` is given, otherwise a native
 * button. Visual variants only — no client-side state, so this stays a
 * Server Component.
 */
export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const classes = `${base} ${variantClass[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
