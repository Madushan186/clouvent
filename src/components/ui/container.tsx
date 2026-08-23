import type { ReactNode } from "react";

type ContainerWidth = "content" | "wide" | "full";

const widthClass: Record<ContainerWidth, string> = {
  content: "max-w-(--width-content)",
  wide: "max-w-(--width-wide)",
  full: "max-w-none",
};

interface ContainerProps {
  children: ReactNode;
  width?: ContainerWidth;
  className?: string;
}

/**
 * Enforces one of a small set of approved widths + responsive gutters,
 * instead of ad hoc max-w-* classes scattered across sections.
 */
export function Container({ children, width = "wide", className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-(--spacing-gutter) ${widthClass[width]} ${className}`}>
      {children}
    </div>
  );
}
