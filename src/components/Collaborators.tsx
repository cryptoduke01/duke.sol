"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const collaborators = [
  { name: "GetBlock", href: "https://getblock.io" },
  { name: "BullpenFi", href: "https://x.com/dukedotsol/status/2071574396913799179" },
  { name: "Bento Guard", href: "https://x.com/dukedotsol/status/2058928188869251544" },
  { name: "Trepa", href: "https://x.com/dukedotsol/status/2053380243105153478" },
  { name: "Bayse", href: "https://x.com/dukedotsol/status/2041825264334753812" },
  { name: "Superteam", href: "https://superteam.fun" },
];

export default function Collaborators() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-10 md:py-14" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-[#00FFD1]" />
          <span className="text-xs text-[#00FFD1] tracking-[0.2em] uppercase">
            Worked with and wrote for
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:gap-x-12">
          {collaborators.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="link-line text-xl md:text-2xl font-medium tracking-tight text-[#777] hover:text-white transition-colors"
            >
              {c.name}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
