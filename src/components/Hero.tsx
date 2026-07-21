"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { HeroContent } from "@/lib/content-types";
import { defaultSiteContent } from "@/lib/default-site-content";

type HeroProps = {
  content?: HeroContent;
};

export default function Hero({ content = defaultSiteContent.hero }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#00FFD1]/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-4 rounded-full border border-[#00FFD1]/30 px-3 py-1.5 text-xs text-[#00FFD1]"
            >
              {content.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.02] mb-5 font-[family-name:var(--font-serif)]"
            >
              <span className="text-white">{content.titleTop}</span>
              <br />
              <span className="text-[#00FFD1]">{content.titleMain}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-[#9aa] max-w-xl mb-6 leading-relaxed"
            >
              {content.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
            >
              {content.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-[#1a1a1a] p-3">
                  <div className="text-lg text-white font-semibold">{stat.value}</div>
                  <div className="text-xs text-[#666] capitalize">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <motion.a
                href={content.ctaPrimaryLink}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 bg-[#00FFD1] text-black font-semibold text-sm hover:bg-[#00e6bc] transition-all"
              >
                {content.ctaPrimaryLabel}
              </motion.a>
              <motion.a
                href={content.ctaSecondaryLink}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                target={content.ctaSecondaryLink.startsWith("http") ? "_blank" : undefined}
                rel={content.ctaSecondaryLink.startsWith("http") ? "noopener noreferrer" : undefined}
                className="px-4 py-2.5 border border-[#1a1a1a] text-white font-semibold text-sm hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all"
              >
                {content.ctaSecondaryLabel}
              </motion.a>
            </motion.div>
            <a
              href={content.quoteSource}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-[#1a1a1a] p-4 text-sm text-[#b0b0b0] hover:border-[#00FFD1]/40 transition-colors"
            >
              &quot;{content.quote}&quot;
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <div className="absolute inset-0 -m-2 border border-[#00FFD1]/40 rounded-2xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#1a1a1a]">
                <Image
                  src={content.profileImage}
                  alt="duke.sol"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute -bottom-3 left-4 rounded-full bg-black border border-[#1a1a1a] px-3 py-1 text-xs text-[#00FFD1] capitalize">
                {content.location}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
