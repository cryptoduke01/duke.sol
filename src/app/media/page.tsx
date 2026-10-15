"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";

const items = [
  {
    title: "Privacy in onchain finance",
    outlet: "Superteam Startup Village",
    kind: "Talk",
    date: "2026",
    blurb:
      "Spoke on privacy in onchain finance at Superteam Startup Village: why transparent ledgers leak positions, and what a practical privacy layer for payments looks like.",
    href: undefined,
  },
  {
    title: "Founders Corner Ep. 01: building Gloam",
    outlet: "3rd Variation",
    kind: "Video interview",
    date: "Oct 2026",
    blurb:
      "Sat down with 3rd Variation's Founders Corner at the Colosseum hackathon to talk through Gloam, a privacy layer for onchain finance on Robinhood Chain and Tempo.",
    href: "https://x.com/3rdvariation/status/2107817012017668444",
  },
  {
    title: "Percolator audit quoted by Toly",
    outlet: "Anatoly Yakovenko",
    kind: "Recognition",
    date: "2025",
    blurb:
      "My independent Phase 1 security audit of Toly's Percolator risk engine was quoted and verified by Anatoly Yakovenko, co-founder of Solana.",
    href: "https://x.com/toly/status/2020528646163689624",
  },
];

export default function MediaPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden scanlines noise">
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#00FFD1]/5 rounded-full blur-[200px] pointer-events-none" />

      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#00FFD1]" />
            <span className="text-sm font-medium text-[#00FFD1] tracking-[0.3em]">Media</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white font-[family-name:var(--font-serif)] mb-4">
            Talks and Media
          </h1>
          <p className="text-[#666] max-w-lg text-sm">
            Interviews, talks, and recognition. Technical walkthroughs and tutorials are next on the list.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, i) => {
            const inner = (
              <>
                <div className="flex items-center gap-3 mb-3 text-xs text-[#666]">
                  <span className="text-[#00FFD1]">{item.kind}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#00FFD1] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#00FFD1] mb-3">{item.outlet}</p>
                <p className="text-sm text-[#777] leading-relaxed">{item.blurb}</p>
                {item.href && (
                  <ArrowUpRight
                    size={16}
                    className="absolute top-6 right-6 text-[#666] group-hover:text-[#00FFD1] transition-colors"
                  />
                )}
              </>
            );
            const className =
              "group relative block border border-[#1a1a1a] p-6 transition-colors" +
              (item.href ? " hover:border-[#00FFD1]/50" : "");
            const motionProps = {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.1 + i * 0.05 },
            };
            return item.href ? (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                {...motionProps}
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div key={item.title} className={className} {...motionProps}>
                {inner}
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
