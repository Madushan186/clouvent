"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Route-change fade — deliberately not AnimatePresence/exit-animated.
 * Next.js already swaps the DOM instantly on navigation; an exit
 * animation (mode="wait") would add real latency before the new page
 * becomes visible, which reads as slower, not more premium. Keying a
 * plain motion.div by pathname remounts it on every navigation, so the
 * new page's *entrance* plays automatically with zero added delay.
 * Header/Footer live outside this wrapper in layout.tsx and stay put.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
