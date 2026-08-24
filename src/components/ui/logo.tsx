import Image from "next/image";

/**
 * `LOGO/CLOVENT LOGO.png` (copied to `public/logo.png`) is a 1080×1080
 * canvas with the actual mark occupying only ~63% of its width and ~11%
 * of its height, centered — measured directly from the PNG's alpha
 * channel, not eyeballed (bbox: x 181–862, y 500–621 of 1080). The
 * asset itself is untouched; this crops it presentationally with a
 * small clear-space margin around the measured bounds, via a scaled/
 * positioned image inside an overflow-hidden box sized to the crop's
 * aspect ratio. No CSS inversion, no fabricated variant — the same
 * single approved black asset, used correctly instead of stretched
 * into an unrelated 4:1 box (the prior bug: width={160} height={40}
 * on a square source).
 */
type LogoVariant = "header" | "footer";

// Header identity should read clearly; footer stays quieter, per
// HOMEPAGE_DESIGN_SPEC.md §11/§12.
const heightClass: Record<LogoVariant, string> = {
  header: "h-8",
  footer: "h-6",
};

export function Logo({
  variant = "header",
  className = "",
  priority = false,
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      // self-start + shrink-0 make this resistant to any parent flex
      // container's align-items/flex-shrink behaviour — a footer
      // container without an explicit items-start on its mobile
      // flex-col state previously stretched this span to full width,
      // and because aspect-ratio was set, height scaled up with it
      // (the "oversized, stretched" footer logo). Fixed at the source
      // in Footer too, but this is now robust even if a future
      // container makes the same omission.
      className={`relative inline-block shrink-0 self-start overflow-hidden ${heightClass[variant]} ${className}`}
      style={{ aspectRatio: "761 / 201", width: "auto" }}
    >
      <Image
        src="/logo.png"
        alt="Clouvent"
        width={1080}
        height={1080}
        priority={priority}
        className="absolute max-w-none"
        style={{
          width: "141.92%",
          height: "537.31%",
          left: "-18.53%",
          top: "-228.86%",
        }}
      />
    </span>
  );
}
