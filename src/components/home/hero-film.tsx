"use client";

import { useState } from "react";

const VIDEO_SRC = "/videos/clouvent-hero.mp4";

/**
 * Hero's cinematic brand film — atmosphere, not a project preview (that
 * concept moved to Selected Work). Small client boundary (Hero itself
 * stays a Server Component) — needed only for the reduced-motion check
 * and the one-time entrance reveal.
 *
 * No poster asset exists for this video (none was supplied) — reduced-
 * motion simply omits `autoPlay`, so the browser renders the video's own
 * first frame as a natural static state instead of inventing a poster
 * path. A dedicated poster could still be added later for a guaranteed
 * pre-load frame; not required for this to look intentional.
 */
export function HeroFilm() {
  // Lazy initializer instead of an effect+setState pair (flagged by
  // react-hooks/set-state-in-effect) — computes once, on first render.
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`h-full w-full overflow-hidden bg-background-subtle transition-[opacity,transform] duration-(--duration-deliberate) ease-(--ease-standard) ${
        ready ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
      }`}
    >
      <video
        className="h-full w-full object-cover"
        style={{ objectPosition: "50% 40%" }}
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onCanPlay={() => setReady(true)}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
