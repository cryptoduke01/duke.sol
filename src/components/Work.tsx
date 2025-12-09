"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "superteam nigeria",
    role: "core member & community manager",
    description: "driving growth of the solana ecosystem in nigeria. organizing workshops, creating educational content, and connecting developers.",
    tags: ["community", "solana", "education"],
    link: "https://superteam.ng",
  },
  {
    title: "arcium",
    role: "contributor",
    description: "contributing to privacy infrastructure for web3. creating content explaining confidential computing on solana.",
    tags: ["privacy", "infrastructure"],
    link: "#",
  },
  {
    title: "frontend development",
    role: "freelance",
    description: "building responsive web applications using react, next.js, and typescript. focused on web3 integrations.",
    tags: ["react", "next.js", "web3"],
    link: "#",
  },
];

const collaborations = [
  { name: "superteam", role: "contributor" },
  { name: "arcium", role: "creator" },
  { name: "axelar", role: "researcher" },
  { name: "band protocol", role: "creator" },
  { name: "backpack", role: "kol" },
  { name: "paradex", role: "creator" },
  { name: "zama fhe", role: "creator" },
  { name: "skate", role: "ambassador" },
  { name: "glider", role: "creator" },
  { name: "bybit", role: "affiliate" },
  { name: "cenoa", role: "marketer" },
  { name: "duckchain", role: "kol" },
];

const techStack = [
  { name: "react" },
  { name: "next.js" },
  { name: "typescript" },
  { name: "tailwindcss" },
  { name: "solana" },
  { name: "framer" },
  { name: "node.js" },
  { name: "git" },
];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="h-[1px] w-8 bg-[#00FFD1]" />
            <span className="text-xs text-[#00FFD1] tracking-[0.2em] lowercase font-[family-name:var(--font-mono)]">
              work
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-[family-name:var(--font-display)] lowercase">
            selected projects
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid gap-3 mb-16">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="group relative block p-5 glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#666] tracking-[0.15em] lowercase font-[family-name:var(--font-mono)]">
                    {project.role}
                  </span>
                  <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors lowercase">
                    {project.title}
                  </h3>
                </div>
                <ArrowUpRight size={16} className="text-[#666] group-hover:text-[#00FFD1] transition-colors" />
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00FFD1] group-hover:w-full transition-all duration-500" />
            </motion.a>
          ))}
        </div>

        {/* View Content CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 text-center"
        >
          <Link
            href="/content"
            className="inline-flex items-center gap-2 px-5 py-2.5 glass border border-[#00FFD1]/30 text-[#00FFD1] font-[family-name:var(--font-mono)] text-sm hover:bg-[#00FFD1]/10 transition-all lowercase group"
          >
            view threads & articles
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Collaborations - Tight Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-[#1a1a1a]" />
            <span className="text-xs text-[#666] tracking-[0.2em] lowercase font-[family-name:var(--font-mono)]">
              collaborations
            </span>
          </div>

          {/* Tight Grid - all same size */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-[1px] bg-[#1a1a1a]">
            {collaborations.map((collab, i) => (
              <motion.div
                key={collab.name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.03 }}
                whileHover={{ backgroundColor: "rgba(0, 255, 209, 0.05)" }}
                className="bg-black p-4 flex flex-col items-center justify-center text-center group cursor-default aspect-square"
              >
                <div className="w-8 h-8 mb-2 rounded bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#00FFD1]/10 transition-colors">
                  <span className="text-[#00FFD1] text-sm font-semibold font-[family-name:var(--font-display)] lowercase">
                    {collab.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs text-white font-[family-name:var(--font-display)] lowercase group-hover:text-[#00FFD1] transition-colors">
                  {collab.name}
                </span>
                <span className="text-[9px] text-[#666] font-[family-name:var(--font-mono)] lowercase">
                  {collab.role}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack - Tight Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-[#1a1a1a]" />
            <span className="text-xs text-[#666] tracking-[0.2em] lowercase font-[family-name:var(--font-mono)]">
              stack
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-[1px] bg-[#1a1a1a]">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.03 }}
                whileHover={{ backgroundColor: "rgba(0, 255, 209, 0.05)" }}
                className="bg-black p-3 flex flex-col items-center justify-center text-center group cursor-default aspect-square"
              >
                <div className="w-7 h-7 mb-1.5 rounded bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#00FFD1]/10 transition-colors">
                  <span className="text-[#00FFD1] text-xs font-bold font-[family-name:var(--font-display)]">
                    {tech.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-[10px] text-[#666] group-hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-mono)] lowercase">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
