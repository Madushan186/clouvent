import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 auto-generates/appends agent-instruction content into a
  // root CLAUDE.md on `next dev`/`next build`. This project's CLAUDE.md is
  // the Clouvent development constitution, not a Next.js scratch file —
  // disabled to prevent it from being silently modified.
  agentRules: false,
};

export default nextConfig;
