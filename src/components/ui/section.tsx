import type { ReactNode } from "react";

type SectionSurface = "light" | "light-subtle" | "dark";

const surfaceClass: Record<SectionSurface, string> = {
  light: "bg-background text-foreground",
  "light-subtle": "bg-background-subtle text-foreground",
  dark: "bg-surface-dark text-foreground-inverse",
};

interface SectionProps {
  children: ReactNode;
  surface?: SectionSurface;
  className?: string;
}

/**
 * The one place that applies Clouvent's editorial surface rhythm
 * (BRAND_SYSTEM.md §8) — an intentional per-section choice, not an
 * OS dark-mode preference. Also owns vertical section rhythm spacing.
 */
export function Section({ children, surface = "light", className = "" }: SectionProps) {
  return (
    <section className={`py-(--spacing-section-y) ${surfaceClass[surface]} ${className}`}>
      {children}
    </section>
  );
}
