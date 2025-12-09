"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "superteam nigeria",
    role: "core member & community manager",
    description: "driving growth of the solana ecosystem in nigeria. organizing workshops, creating educational content, and driving adoption.",
    tags: ["community", "solana", "education"],
    link: "https://x.com/SuperteamNG",
    image: "/superteam.png",
  },
  {
    title: "arcium",
    role: "contributor",
    description: "contributing to privacy infrastructure for web3. creating content explaining confidential computing on solana.",
    tags: ["privacy", "infrastructure"],
    link: "https://x.com/Arcium",
    image: "/arcium.png",
  },
  {
    title: "frontend development",
    role: "freelance",
    description: "building responsive web applications using next.js, and typescript. focused on solana web3 integrations and wallet connectivity.",
    tags: ["solana", "next.js", "web3"],
    link: "https://github.com/cryptoduke01",
    image: "/github-dev.png",
  },
];

const collaborations = [
  { name: "superteamng", role: "core member. creator", image: "/collab-1-superteamng.png", isFormer: false },
  { name: "arcium", role: "contributor", image: "/collab-2-arcium.png", isFormer: false },
  { name: "superteam earn", role: "creator", image: "/collab-3-superteam-earn.png", isFormer: false },
  { name: "skate chain", role: "contributor", image: "/collab-4-skate-chain.png", isFormer: true },
  { name: "xpow", role: "dev. partner", image: "/collab-5-xpow.png", isFormer: true },
  { name: "warden protocol", role: "contributor", image: "/collab-6-warden-protocol.png", isFormer: true },
  { name: "nosana ai", role: "builder. creator. ambassador", image: "/collab-7-nosana-ai.png", isFormer: false },
  { name: "getblock", role: "creator. ambassador", image: "/collab-8-getblock.png", isFormer: false },
  { name: "scribble dao", role: "creator", image: "/collab-9-scribble-dao.png", isFormer: false },
  { name: "regenerates", role: "dev. member", image: "/collab-10-regenerates.png", isFormer: false },
  { name: "solana collective", role: "creator", image: "/collab-11-solana-collective.png", isFormer: false },
  { name: "web3 kingsmen", role: "co-founder. moderator", image: "/collab-12-web3-kingsmen.png", isFormer: false },
  { name: "allora network", role: "dev contributor. creator", image: "/collab-13-allora-network.png", isFormer: true },
  // Placeholders for upcoming projects
  { name: "coming soon", role: "project", image: null, isPlaceholder: true },
  { name: "coming soon", role: "project", image: null, isPlaceholder: true },
  { name: "coming soon", role: "project", image: null, isPlaceholder: true },
  { name: "coming soon", role: "project", image: null, isPlaceholder: true },
];

const techStack = [
  { name: "react.js", image: "/tech-react.png" },
  { name: "next.js", image: "/tech-nextjs.png" },
  { name: "typescript", image: "/tech-typescript.png" },
  { name: "tailwindcss", image: "/tech-tailwindcss.png" },
  { name: "solana", image: "/tech-solana.png" },
  { name: "rust", image: "/tech-rust.png" },
  { name: "node.js", image: "/tech-nodejs.png" },
  { name: "git", image: "/tech-git.png" },
];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
            <div className="h-[1px] w-6 md:w-8 bg-[#00FFD1]" />
            <span className="text-[10px] md:text-xs text-[#00FFD1] tracking-[0.2em] lowercase font-[family-name:var(--font-display)]">
              work
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-[family-name:var(--font-display)] lowercase">
            selected projects
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid gap-4 md:gap-6 mb-12 md:mb-16">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="group relative block glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 p-4 md:p-6">
                {/* Project Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0">
                  {/* Outer ring */}
                  <div className="absolute inset-0 -m-1 md:-m-2 border-2 border-[#00FFD1]/50 rounded-lg pulse-ring" />
                  
                  {/* Image container with glow effect */}
                  <div className="relative w-full h-full rounded-lg overflow-hidden border-glow scratch-effect">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/30 via-[#00FFD1]/10 to-[#00FFD1]/20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,255,209,0.08)_2px,rgba(0,255,209,0.08)_4px)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[#00FFD1]/5" />
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] md:text-[10px] text-[#666] tracking-[0.15em] lowercase font-[family-name:var(--font-display)] mb-1 md:mb-2 block">
                    {project.role}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors lowercase mb-2 md:mb-3">
                    {project.title}
                  </h3>
                  
                  {/* Description - now visible */}
                  <p className="text-xs sm:text-sm text-[#666] font-[family-name:var(--font-display)] leading-relaxed lowercase mb-3 md:mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 md:px-3 py-1 text-[9px] md:text-[10px] text-[#666] glass border border-[#1a1a1a] font-[family-name:var(--font-display)] lowercase group-hover:border-[#00FFD1]/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-4 md:top-6 right-4 md:right-6">
                  <ArrowUpRight size={16} className="md:w-5 md:h-5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                </div>
              </div>

              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00FFD1] group-hover:w-full transition-all duration-500" />
            </motion.a>
          ))}
        </div>

        {/* View Content CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 md:mb-16 text-center"
        >
          <Link
            href="/content"
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 glass border border-[#00FFD1]/30 text-[#00FFD1] font-[family-name:var(--font-display)] text-xs md:text-sm hover:bg-[#00FFD1]/10 transition-all lowercase group"
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
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="h-[1px] w-6 md:w-8 bg-[#1a1a1a]" />
            <span className="text-[10px] md:text-xs text-[#666] tracking-[0.2em] lowercase font-[family-name:var(--font-display)]">
              collaborations
            </span>
          </div>

          {/* Tight Grid - all same size */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-[1px] bg-[#1a1a1a]">
            {collaborations.map((collab, i) => (
              <motion.div
                key={`${collab.name}-${i}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.03 }}
                whileHover={!collab.isPlaceholder ? { backgroundColor: "rgba(0, 255, 209, 0.05)" } : {}}
                className={`bg-black p-3 md:p-4 flex flex-col items-center justify-center text-center group cursor-default aspect-square relative ${collab.isFormer ? "opacity-60" : ""} ${collab.isPlaceholder ? "opacity-40" : ""}`}
              >
                {collab.isPlaceholder ? (
                  <>
                    <div className="relative w-8 h-8 md:w-10 md:h-10 mb-1.5 md:mb-2 rounded border border-dashed border-[#1a1a1a] flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-[#333] rounded" />
                    </div>
                    <span className="text-[10px] md:text-xs text-[#333] font-[family-name:var(--font-display)] lowercase">
                      {collab.name}
                    </span>
                    <span className="text-[8px] md:text-[9px] text-[#1a1a1a] font-[family-name:var(--font-display)] lowercase">
                      {collab.role}
                    </span>
                  </>
                ) : (
                  <>
                    {/* Image with glow effect */}
                    {collab.image && (
                      <div className="relative w-8 h-8 md:w-10 md:h-10 mb-1.5 md:mb-2 rounded overflow-hidden border border-[#00FFD1]/30 scratch-effect">
                        <Image
                          src={collab.image}
                          alt={collab.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/20 via-[#00FFD1]/5 to-[#00FFD1]/10 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,255,209,0.06)_2px,rgba(0,255,209,0.06)_4px)] pointer-events-none" />
                      </div>
                    )}
                    
                    <span className="text-[10px] md:text-xs text-white font-[family-name:var(--font-display)] lowercase group-hover:text-[#00FFD1] transition-colors">
                      {collab.name}
                    </span>
                    <span className="text-[8px] md:text-[9px] text-[#666] font-[family-name:var(--font-display)] lowercase">
                      {collab.role}
                    </span>
                    
                    {/* Former badge */}
                    {collab.isFormer && (
                      <span className="absolute top-1 right-1 px-1 py-0.5 text-[6px] md:text-[7px] text-[#666] border border-[#1a1a1a] bg-black/80 font-[family-name:var(--font-display)] lowercase">
                        former
                      </span>
                    )}
                  </>
                )}
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
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="h-[1px] w-6 md:w-8 bg-[#1a1a1a]" />
            <span className="text-[10px] md:text-xs text-[#666] tracking-[0.2em] lowercase font-[family-name:var(--font-display)]">
              tech stack
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-[1px] bg-[#1a1a1a]">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.03 }}
                whileHover={{ backgroundColor: "rgba(0, 255, 209, 0.05)" }}
                className="bg-black p-2.5 md:p-3 flex flex-col items-center justify-center text-center group cursor-default aspect-square"
              >
                {/* Image with glow effect */}
                <div className="relative w-7 h-7 md:w-8 md:h-8 mb-1 md:mb-1.5 rounded overflow-hidden border border-[#00FFD1]/30 scratch-effect">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/20 via-[#00FFD1]/5 to-[#00FFD1]/10 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,255,209,0.06)_2px,rgba(0,255,209,0.06)_4px)] pointer-events-none" />
                </div>
                <span className="text-[9px] md:text-[10px] text-[#666] group-hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase">
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
