"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, X, ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Helper function to format date
const formatDate = (dateString: string): string => {
  if (!dateString) return "date unknown";
  try {
    const date = new Date(dateString);
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return "date unknown";
  }
};

// Dummy project data
const projects = [
  {
    id: 1,
    title: "Solana Wallet Integration",
    description: "A comprehensive wallet adapter implementation for Solana dApps with multi-wallet support including Phantom, Backpack, and Solflare.",
    longDescription: "Built a robust wallet integration system that supports multiple Solana wallets. The implementation includes automatic wallet detection, connection handling, transaction signing, and error management. Features include:\n\n- Multi-wallet support (Phantom, Backpack, Solflare)\n- Automatic wallet detection\n- Transaction simulation before signing\n- Error handling and user feedback\n- Session persistence\n\nBuilt with React, TypeScript, and @solana/wallet-adapter.",
    image: "/github-dev.png",
    github: "https://github.com/cryptoduke01",
    demo: "https://example.com",
    tags: ["React", "TypeScript", "Solana", "Web3"],
    date: "2024-12-01",
    status: "completed",
  },
  {
    id: 2,
    title: "NFT Marketplace Frontend",
    description: "A modern NFT marketplace interface built on Solana with real-time updates, filtering, and seamless wallet integration.",
    longDescription: "Developed a full-featured NFT marketplace frontend with real-time data updates, advanced filtering options, and smooth wallet integration. Key features:\n\n- Real-time NFT listings and updates\n- Advanced filtering (price, collection, traits)\n- Wallet integration for purchases\n- Responsive design for all devices\n- Optimistic UI updates\n\nTechnologies: Next.js, TypeScript, Tailwind CSS, Solana Web3.js",
    image: "/github-dev.png",
    github: "https://github.com/cryptoduke01",
    demo: "https://example.com",
    tags: ["Next.js", "TypeScript", "Solana", "NFT"],
    date: "2024-11-15",
    status: "completed",
  },
  {
    id: 3,
    title: "DeFi Dashboard",
    description: "A comprehensive DeFi dashboard displaying portfolio analytics, yield farming opportunities, and protocol interactions on Solana.",
    longDescription: "Created an advanced DeFi dashboard that aggregates data from multiple Solana protocols. Features include:\n\n- Portfolio value tracking\n- Yield farming opportunities\n- Protocol interaction history\n- Real-time price updates\n- Transaction history\n\nBuilt with React, TypeScript, and various Solana DeFi APIs.",
    image: "/github-dev.png",
    github: "https://github.com/cryptoduke01",
    demo: "https://example.com",
    tags: ["React", "DeFi", "Solana", "Analytics"],
    date: "2024-10-20",
    status: "completed",
  },
  {
    id: 4,
    title: "Token Swap Interface",
    description: "A sleek token swap interface with price routing, slippage protection, and multi-DEX aggregation for optimal rates.",
    longDescription: "Developed a token swap interface that aggregates liquidity from multiple DEXs on Solana. Features:\n\n- Multi-DEX routing (Orca, Raydium, Phoenix)\n- Best price finding algorithm\n- Slippage protection\n- Transaction simulation\n- Real-time price updates\n\nTechnologies: Next.js, TypeScript, Solana Web3.js",
    image: "/github-dev.png",
    github: "https://github.com/cryptoduke01",
    demo: "https://example.com",
    tags: ["Next.js", "TypeScript", "DeFi", "DEX"],
    date: "2024-09-10",
    status: "completed",
  },
  {
    id: 5,
    title: "DAO Governance Platform",
    description: "A governance platform for DAOs with proposal creation, voting mechanisms, and on-chain execution on Solana.",
    longDescription: "Built a comprehensive DAO governance platform enabling communities to manage proposals and voting. Features:\n\n- Proposal creation and management\n- Voting mechanisms (weighted, quadratic)\n- On-chain execution\n- Proposal history and analytics\n- Member management\n\nBuilt with React, TypeScript, and Solana program integration.",
    image: "/github-dev.png",
    github: "https://github.com/cryptoduke01",
    demo: "https://example.com",
    tags: ["React", "DAO", "Governance", "Solana"],
    date: "2024-08-05",
    status: "completed",
  },
  {
    id: 6,
    title: "Cross-Chain Bridge UI",
    description: "A user-friendly interface for cross-chain asset transfers with real-time status tracking and transaction history.",
    longDescription: "Developed a cross-chain bridge interface that simplifies asset transfers between blockchains. Features:\n\n- Multi-chain support\n- Real-time transaction status\n- Transaction history\n- Fee estimation\n- Error handling and recovery\n\nTechnologies: Next.js, TypeScript, Wormhole SDK",
    image: "/github-dev.png",
    github: "https://github.com/cryptoduke01",
    demo: "https://example.com",
    tags: ["Next.js", "Cross-Chain", "Bridge", "Web3"],
    date: "2024-07-15",
    status: "completed",
  },
];

type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  github: string;
  demo: string;
  tags: string[];
  date: string;
  status: string;
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden scanlines noise">
      {/* Page Loading */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="w-8 h-8 border-2 border-transparent border-t-[#00FFD1] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-xs text-[#666] font-[family-name:var(--font-display)] lowercase">loading</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#00FFD1]/5 rounded-full blur-[200px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#666] hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-[family-name:var(--font-display)] lowercase">back</span>
            </Link>

            <span className="text-xl font-semibold tracking-tight font-[family-name:var(--font-display)]">
              <span className="text-white">duke</span>
              <span className="text-[#00FFD1]">.sol</span>
            </span>

            <a
              href="https://x.com/cryptoduke01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 glass border border-[#00FFD1]/30 text-[#00FFD1] text-sm font-[family-name:var(--font-display)] hover:bg-[#00FFD1]/10 transition-all lowercase"
            >
              x
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#00FFD1]" />
            <span className="text-xs font-medium text-[#00FFD1] tracking-[0.3em] lowercase font-[family-name:var(--font-display)]">
              projects
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white font-[family-name:var(--font-display)] lowercase mb-4">
            development projects
          </h1>
          <p className="text-[#666] max-w-lg font-[family-name:var(--font-display)] text-sm lowercase">
            a collection of web3 projects built on solana. from dapps to defi interfaces.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-8 mb-12"
        >
          {[
            { label: "projects built", value: "20+" },
            { label: "technologies", value: "15+" },
            { label: "github stars", value: "500+" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold text-[#00FFD1] font-[family-name:var(--font-display)] lowercase">
                {stat.value}
              </div>
              <div className="text-xs text-[#666] font-[family-name:var(--font-display)] lowercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              whileHover={{ y: -5 }}
              className="group block overflow-hidden glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300 cursor-pointer"
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative w-full h-48 overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[#666]">
                      <Calendar size={12} />
                      <span className="text-xs font-[family-name:var(--font-display)]">
                        {formatDate(project.date)}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] glass text-[#00FFD1] font-[family-name:var(--font-display)] lowercase">
                      {project.status}
                    </span>
                  </div>
                  <span className="text-xs text-[#00FFD1] font-[family-name:var(--font-display)] opacity-0 group-hover:opacity-100 transition-opacity">
                    view
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-sm text-[#666] mb-4 font-[family-name:var(--font-display)] leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-[9px] text-[#666] glass border border-[#1a1a1a] font-[family-name:var(--font-display)] lowercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-[#00FFD1] hover:text-[#00e6bc] transition-colors"
                  >
                    <Github size={12} />
                    <span className="text-xs font-[family-name:var(--font-display)] lowercase">github</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[#00FFD1] hover:text-[#00e6bc] transition-colors"
                    >
                      <ExternalLink size={12} />
                      <span className="text-xs font-[family-name:var(--font-display)] lowercase">demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden glass border border-[#1a1a1a]"
            >
              {/* Project Image */}
              {selectedProject.image && (
                <div className="relative w-full h-64 overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
                </div>
              )}

              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1.5 text-[#666]">
                      <Calendar size={12} />
                      <span className="text-xs font-[family-name:var(--font-display)]">
                        {formatDate(selectedProject.date)}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] glass text-[#00FFD1] font-[family-name:var(--font-display)] lowercase">
                      {selectedProject.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-[#666] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <div className="text-[#999] font-[family-name:var(--font-display)] text-sm leading-relaxed whitespace-pre-line mb-4">
                  {selectedProject.longDescription}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-[#666] glass border border-[#1a1a1a] font-[family-name:var(--font-display)] lowercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#1a1a1a] flex items-center gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FFD1] text-black font-semibold text-sm font-[family-name:var(--font-display)] hover:bg-[#00e6bc] transition-all lowercase"
                >
                  view on github
                  <Github size={14} />
                </a>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 glass border border-[#1a1a1a] text-white font-semibold text-sm font-[family-name:var(--font-display)] hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all lowercase"
                  >
                    view demo
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

