"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

// `animate` stays defined even when reduce is true — see hero.tsx's up()
// for why omitting it entirely can leave an element stuck at its
// SSR-rendered opacity:0 after hydration.
function up(i: number, reduce: boolean) {
  if (reduce) return { initial: false, animate: { opacity: 1, y: 0 } };
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  };
}

/**
 * Contact page introduction — load-time staggered reveal, matching
 * Hero's and ServicesHero's pattern. Kept in the contact/ route folder
 * (not components/) since it's this one page's header only.
 */
export function ContactHero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="hero" className="bg-background pt-(--spacing-section-y) pb-12">
      <Container>
        <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-2 md:gap-(--spacing-gutter) md:items-end">
          <motion.div {...up(0, reduce)}>
            <p className="eyebrow text-foreground-muted">Start a project</p>
            <h1 className="mt-(--spacing-content) font-display text-display text-foreground leading-[1.05] tracking-tight text-balance max-w-[14ch]">
              Let&apos;s build something worth remembering.
            </h1>
          </motion.div>
          <motion.div {...up(1, reduce)} className="md:pb-1">
            <p className="font-sans text-body-lg text-foreground-muted leading-[1.6] max-w-[48ch]">
              Whether you need a new digital presence, ongoing management, or a stronger
              foundation for growth — tell us where you are and where you want to go.
              We&apos;ll start with a conversation.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
