interface MediaPlaceholderProps {
  label: string;
  className?: string;
}

/**
 * Stands in for licensed Once Upon a Time Photography imagery, which
 * isn't in the project yet (PROJECT_BRIEF.md §10, §21 — [NEEDS INPUT]).
 * Deliberately flat and labeled so it reads as an unfinished development
 * placeholder, never as real client work or stock photography.
 */
export function MediaPlaceholder({ label, className = "" }: MediaPlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-border-subtle bg-background-subtle ${className}`}
    >
      <p className="eyebrow px-(--spacing-content) text-center text-foreground-muted">{label}</p>
    </div>
  );
}
