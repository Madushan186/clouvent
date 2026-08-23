import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

/**
 * Restrained per HOMEPAGE_DESIGN_SPEC.md §12. Entity name, ABN, base
 * location, and a confirmed email are all [NEEDS INPUT] in PROJECT_BRIEF.md
 * — deliberately omitted here rather than fabricated, not shown as a
 * broken placeholder.
 *
 * Surface is deliberately light, not dark: only a black logo variant
 * exists (see Phase 3 logo audit). A dark footer would require either
 * inventing a white variant (explicitly prohibited this phase) or
 * CSS-inverting the real asset into an unapproved fake variant — neither
 * is "using the real asset safely available." Light surface sidesteps
 * both and needed no image manipulation.
 */
export function Footer() {
  return (
    <footer className="bg-background-subtle text-foreground">
      <div className="mx-auto flex w-full max-w-(--width-wide) flex-col gap-(--spacing-content) px-(--spacing-gutter) py-(--spacing-content) md:flex-row md:items-center md:justify-between">
        <Image src="/logo.png" alt="Clouvent" width={160} height={40} className="h-6 w-auto opacity-90" />

        <nav className="flex flex-wrap gap-6" aria-label="Footer">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-small text-foreground-muted transition-colors duration-(--duration-fast) hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-6">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-small text-foreground-muted transition-colors duration-(--duration-fast) hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
