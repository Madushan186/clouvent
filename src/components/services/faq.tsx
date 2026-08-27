"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { faqCategories } from "./faq-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * FAQ — Studio White. One continuous numbered sequence (01–10), no tab
 * rail or category switcher — that pattern doesn't exist anywhere else
 * on the site, and Build/Manage/Grow's own numbering already proves a
 * plain sequence reads fine at this length. Multiple rows can stay
 * open at once; forcing single-open would add friction for anyone
 * comparing two related answers.
 *
 * Each row is a real <button> with aria-expanded/aria-controls — no
 * custom keyboard handling needed, native tab order is sufficient.
 * The open/close transition uses grid-template-rows (not max-height)
 * so it never needs a magic-number height guess.
 */
export function FAQ() {
  const reduce = useReducedMotion();
  const uid = useId();
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    // duration is gated too, not just delay — initial:false alone still
    // lets whileInView tween in over the full duration once triggered,
    // which is a real prefers-reduced-motion gap (found via measured
    // opacity mid-transition, not assumed) shared by every whileInView
    // reveal on the site; fixed here, flagged sitewide in the summary.
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section className="bg-background-subtle py-(--spacing-section-y)">
      <Container width="content">
        <motion.div {...reveal(0)} className="border-b border-border-subtle pb-(--spacing-content)">
          <p className="eyebrow text-foreground-muted">Frequently asked</p>
          <h2 className="mt-(--spacing-content) font-display text-h1 text-foreground leading-[1.1] max-w-[18ch]">
            Answers before the enquiry.
          </h2>
        </motion.div>

        <div className="mt-(--spacing-section-y) flex flex-col">
          {faqCategories.map((category, ci) => (
            <motion.div
              key={category.num}
              {...reveal(0.05 + ci * 0.02)}
              className="py-(--spacing-content) border-t border-border-subtle first:border-t-0 first:pt-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-accent">
                  {category.num}
                </span>
                <h3 className="font-display text-h3 italic text-foreground leading-[1.2]">
                  {category.title}
                </h3>
              </div>

              <div className="mt-(--spacing-content)">
                {category.items.map((item, ii) => {
                  const key = `${category.num}-${ii}`;
                  const panelId = `${uid}-panel-${key}`;
                  const btnId = `${uid}-btn-${key}`;
                  const open = openKeys.has(key);

                  return (
                    <div key={key} className="border-t border-border-subtle last:border-b">
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => toggle(key)}
                        className="group flex w-full items-center justify-between gap-6 py-[1.15rem] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="flex items-center font-sans text-body font-semibold text-foreground transition-colors duration-(--duration-fast) group-hover:text-accent">
                          {item.essential && (
                            <span
                              aria-hidden="true"
                              className="mr-2.5 h-[5px] w-[5px] shrink-0 rounded-full bg-accent"
                            />
                          )}
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className="relative h-3.5 w-3.5 shrink-0"
                        >
                          <span
                            className={`absolute left-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-foreground-muted transition-colors duration-(--duration-standard) group-hover:bg-accent ${open ? "bg-accent" : ""}`}
                          />
                          <span
                            className={`absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 bg-foreground-muted transition-[opacity,background-color] duration-(--duration-standard) group-hover:bg-accent ${open ? "opacity-0" : "opacity-100"}`}
                          />
                        </span>
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className="grid overflow-hidden transition-[grid-template-rows] duration-(--duration-standard) ease-(--ease-standard)"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="max-w-(--width-content) pb-[1.15rem] font-sans text-body text-foreground-muted leading-[1.7]">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
