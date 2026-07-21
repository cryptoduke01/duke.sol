"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ProjectItem, UpdateItem } from "@/lib/content-types";
import { defaultSiteContent } from "@/lib/default-site-content";

type WorkProps = {
  projects?: ProjectItem[];
  updates?: UpdateItem[];
};

export default function Work({
  projects = defaultSiteContent.projects,
  updates = defaultSiteContent.updates,
}: WorkProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
            <div className="h-[1px] w-6 md:w-8 bg-[#00FFD1]" />
            <span className="text-xs md:text-sm text-[#00FFD1] tracking-[0.2em] font-[family-name:var(--font-display)]">
              Work
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white font-[family-name:var(--font-serif)]">
            Projects and Updates
          </h2>
        </motion.div>

        <div className="grid gap-4 md:gap-6 mb-12 md:mb-16">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.demo || project.github || "/projects"}
              target={(project.demo || project.github || "").startsWith("http") ? "_blank" : undefined}
              rel={(project.demo || project.github || "").startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="group relative block border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 p-4 md:p-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#1a1a1a]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-xs text-[#666] tracking-[0.15em] mb-1 block">
                    {project.role}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#00FFD1] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs text-[#666] border border-[#1a1a1a] group-hover:border-[#00FFD1]/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 md:top-6 right-4 md:right-6">
                  <ArrowUpRight size={16} className="md:w-5 md:h-5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00FFD1] group-hover:w-full transition-all duration-500" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-12"
        >
          <h3 className="text-lg text-white mb-4">Latest Updates</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {updates.map((update) => (
              <a
                key={update.id}
                href={update.link || "#"}
                target={update.link?.startsWith("http") ? "_blank" : undefined}
                rel={update.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="border border-[#1a1a1a] p-4 hover:border-[#00FFD1]/40 transition-colors"
              >
                <p className="text-sm text-white mb-2">{update.title}</p>
                <p className="text-xs text-[#777]">{update.summary}</p>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 text-center"
        >
          <Link
            href="/content"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#00FFD1]/30 text-[#00FFD1] text-sm hover:bg-[#00FFD1]/10 transition-all group"
          >
            View Threads & Articles
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
