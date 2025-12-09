"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, X, ArrowLeft, Github, ExternalLink, Calendar, Twitter, MessageCircle, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Helper function to format date
const formatDate = (dateString: string): string => {
  if (!dateString) return "date unknown";
  // If it's just a year like "2025", return it as is
  if (/^\d{4}$/.test(dateString)) {
    return dateString;
  }
  try {
    const date = new Date(dateString);
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return "date unknown";
  }
};

// Project data
const projects = [
  {
    id: 1,
    title: "Artvault",
    description: "Discover, Share, And Sell Digital Art. A secure marketplace for digital artists to showcase and sell their creations directly to art enthusiasts.",
    longDescription: "A secure marketplace for digital artists to showcase and sell their creations directly to art enthusiasts. Powered by secure authentication and hassle-free crypto payments.",
    image: "/site-images/Macbook-Air-theartvault.vercel.app.png",
    github: "",
    demo: "https://theartvault.vercel.app/",
    tags: ["Next.js", "NFT", "Marketplace", "Web3"],
    date: "2025",
    status: "completed",
  },
  {
    id: 2,
    title: "Regenerates",
    description: "Establishing God's Kingdom in Web3. A community of believers with the mandate to establish God's Kingdom in the web3 space.",
    longDescription: "About the Regenerates\n\nThe Regenerates are a budding community of believers with a mandate to establish the kingdom of GOD in the web3 space.\n\nThe vision of the Regenerates as given by GOD is to provide a conclave for believers in the web3 space, like a goshen in Egypt, a safe space for believers who are already in the space to learn and continue to grow with other like-minded christians.\n\nWe, the Regenerates, believe that financial security allows us to better serve GOD, and our primary mission is to empower christians in this space to fulfill this mission:\n\n• To bring as many believers into wealth in the web3 space.\n• To provide a safe space for believers to learn and grow.\n• To equip newbies in the space with the requisite knowledge to navigate the web3 space.\n\nWe are the Regenerates, in web3 for HIS glory!",
    image: "/site-images/Macbook-Air-www.regener8s.com (1).png",
    github: "https://github.com/cryptoduke01/devbuddies_buildspace",
    demo: "https://www.regener8s.com/",
    tags: ["Next.js", "Web3", "Community", "Solana"],
    date: "2025",
    status: "completed",
  },
  {
    id: 3,
    title: "stable.fun",
    description: "Transform your wealth by creating your own stablecoins backed by yield-bearing stablebonds and start earning.",
    longDescription: "Transform your wealth by creating your own stablecoins backed by yield-bearing stablebonds and start earning.",
    image: "/site-images/Macbook-Air-stablefun.vercel.app.png",
    github: "https://github.com/cryptoduke01/stable.fun",
    demo: "https://stablefun.vercel.app/",
    tags: ["Next.js", "DeFi", "Stablecoins", "Solana"],
    date: "2025",
    status: "in progress",
  },
  {
    id: 4,
    title: "pulse.fun",
    description: "Your wallet tells your story. The social network for crypto traders. Connect your wallet and let your transactions become your social content.",
    longDescription: "How pulse.fun Works\n\nTransform your wallet activity into a living social profile\n\nConnect Your Wallet\nLink your wallet securely and watch as your trading history automatically generates your profile.\n\nAuto-Generated Profile\nYour portfolio value, trading style, and performance metrics create a unique social identity.\n\nFollow & Discover\nFollow successful traders, discover new strategies, and build your crypto network.",
    image: "/site-images/Macbook-Air-pulsedotfun.vercel.app.png",
    github: "https://github.com/cryptoduke01/pulse.fun",
    demo: "https://pulsedotfun.vercel.app/",
    tags: ["Next.js", "Social", "Web3", "Solana"],
    date: "2025",
    status: "in progress",
  },
  {
    id: 5,
    title: "Blockfest Leaderboard",
    description: "Leaderboard for Africa's biggest web3 festival.",
    longDescription: "A real-time leaderboard system for Blockfest, Africa's biggest web3 festival. Track participants, scores, and rankings throughout the event.",
    image: "/site-images/Macbook-Air-blockfestboard.vercel.app.png",
    github: "https://github.com/cryptoduke01/blockfest-leaderboard",
    demo: "https://blockfestboard.vercel.app/",
    tags: ["Next.js", "Leaderboard", "Web3", "Event"],
    date: "2025",
    status: "completed",
  },
  {
    id: 6,
    title: "Tactical Crypto Arena",
    description: "A next-generation blockchain gaming experience built on Solana with Honeycomb Protocol integration and Verxio loyalty infrastructure.",
    longDescription: "Overview\n\nTactical Crypto Arena is a comprehensive blockchain game that combines hero collection, automated battles, on-chain loyalty systems, and DeFi quests. Built with Next.js 14, TypeScript, and Tailwind CSS, it features a modern Solana-themed UI with real-time battle mechanics and blockchain integration.",
    image: "/site-images/Macbook-Air-tactical-mocha.vercel.app.png",
    github: "https://github.com/cryptoduke01/tactical",
    demo: "https://tactical-mocha.vercel.app/",
    tags: ["Next.js", "Gaming", "Solana", "DeFi"],
    date: "2025",
    status: "in progress",
  },
  {
    id: 7,
    title: "Warden Co-Pilot",
    description: "Your Crypto Co-Pilot - Create Personalized Warden Protocol Visual Themes.",
    longDescription: "Create personalized Warden Protocol visual themes to share and showcase your crypto journey.",
    image: "/site-images/Macbook-Air-wardenisfor.vercel.app.png",
    github: "https://github.com/cryptoduke01/wardendotfun",
    demo: "https://wardenisfor.vercel.app/",
    tags: ["Next.js", "Web3", "Visual", "Solana"],
    date: "2025",
    status: "completed",
  },
  {
    id: 8,
    title: "Fundrr",
    description: "Supercharge Nigerian Creatives with Solana-Powered Funding. Solana Powered Funding for Web3 Creatives.",
    longDescription: "Fundrr uses Solana for fast and low-cost transactions, enabling Nigerian creatives to access funding through Web3 technology.",
    image: "/site-images/Macbook-Air-fundrr.vercel.app.png",
    github: "https://github.com/cryptoduke01/fundrr",
    demo: "https://fundrr.vercel.app/",
    tags: ["Next.js", "Solana", "Funding", "Web3"],
    date: "2025",
    status: "in progress",
  },
  {
    id: 9,
    title: "Snappgram",
    description: "Social media photo app for sharing photos and lifestyle.",
    longDescription: "A social media platform focused on photo sharing and lifestyle content, built for the Web3 generation.",
    image: "/site-images/Macbook-Air-snappgram.vercel.app.png",
    github: "https://github.com/akachukwu-eth/snapgram",
    demo: "https://snappgram.vercel.app/",
    tags: ["Next.js", "Social Media", "Web3", "Photos"],
    date: "2025",
    status: "completed",
  },
  {
    id: 10,
    title: "Sui Mockup",
    description: "Create customized Sui blockchain-themed visuals to share.",
    longDescription: "Create customized Sui blockchain-themed visuals to share with your community.",
    image: "/site-images/Macbook-Air-suisfor-git-main-trojancodes-projects-6d77485c.vercel.app.png",
    github: "https://github.com/cryptoduke01/suisfor",
    demo: "https://suisfor-git-main-trojancodes-projects-6d77485c.vercel.app/",
    tags: ["Next.js", "Sui", "Visual", "Web3"],
    date: "2025",
    status: "completed",
  },
  {
    id: 11,
    title: "TUF Society",
    description: "Founded in 2024, The Uncalled Family™ emerged as a collective of visionaries, developers, and creators united by a shared passion for Web3 innovation.",
    longDescription: "Founded in 2024, The Uncalled Family™ emerged as a collective of visionaries, developers, and creators united by a shared passion for Web3 innovation.\n\nOur mission is to build a thriving ecosystem where creativity meets technology, fostering groundbreaking initiatives that shape the future of digital communities.",
    image: "/site-images/Macbook-Air-tufsociety.vercel.app.png",
    github: "https://github.com/cryptoduke01/tuf-society",
    demo: "https://tufsociety.vercel.app/",
    tags: ["Next.js", "Community", "Web3", "Innovation"],
    date: "2025",
    status: "completed",
  },
  {
    id: 12,
    title: "Solana Analytics Dashboard",
    description: "Real-time ecosystem metrics and liquidity flow visualization.",
    longDescription: "Real-time ecosystem metrics and liquidity flow visualization for the Solana blockchain.",
    image: "/site-images/Macbook-Air-solanaboard.vercel.app.png",
    github: "https://github.com/cryptoduke01/solana-analytics-board",
    demo: "https://solanaboard.vercel.app/",
    tags: ["Next.js", "Analytics", "Solana", "Dashboard"],
    date: "2025",
    status: "completed",
  },
  {
    id: 13,
    title: "Fundrr Waitlist",
    description: "Supercharge Nigerian Creatives with Solana-Powered Funding.",
    longDescription: "Join the waitlist for Fundrr - Supercharge Nigerian Creatives with Solana-Powered Funding.",
    image: "/site-images/Macbook-Air-usefundrr.vercel.app.png",
    github: "https://github.com/cryptoduke01/flofi-waitlist",
    demo: "https://usefundrr.vercel.app/",
    tags: ["Next.js", "Waitlist", "Solana", "Funding"],
    date: "2025",
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
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col glass border border-[#1a1a1a]"
            >
              {/* Project Image */}
              {selectedProject.image && (
                <div className="relative w-full h-64 flex-shrink-0 overflow-hidden bg-[#0a0a0a]">
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
              <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a] flex-shrink-0">
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
                  className="p-2 text-[#666] hover:text-white transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
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
              <div className="p-6 border-t border-[#1a1a1a] flex items-center gap-4 flex-shrink-0">
                {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FFD1] text-black font-semibold text-sm font-[family-name:var(--font-display)] hover:bg-[#00e6bc] transition-all lowercase"
                >
                  view on github
                  <Github size={14} />
                </a>
                )}
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

      {/* Footer */}
      <footer className="relative mt-20 md:mt-32 pt-12 md:pt-16 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 md:pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Logo column */}
            <div className="col-span-2 sm:col-span-1">
              <Link href="/" className="inline-block mb-3 md:mb-4">
                <span className="text-lg md:text-xl font-semibold tracking-tight font-[family-name:var(--font-display)]">
                  <span className="text-white">duke</span>
                  <span className="text-[#00FFD1]">.sol</span>
                </span>
              </Link>
              <p className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] leading-relaxed lowercase">
                frontend developer & web3 builder based in nigeria and remote.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] tracking-[0.2em] mb-3 md:mb-4 lowercase">
                navigation
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link href="/" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line">
                    home
                  </Link>
                </li>
                <li>
                  <Link href="/#work" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line">
                    work
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line">
                    projects
                  </Link>
                </li>
                <li>
                  <Link href="/content" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line">
                    content
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line">
                    contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] tracking-[0.2em] mb-3 md:mb-4 lowercase">
                socials
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a
                    href="https://x.com/cryptoduke01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line group"
                  >
                    <Twitter size={12} className="md:w-3.5 md:h-3.5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                    <span>twitter / x</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/cryptoduke01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line group"
                  >
                    <MessageCircle size={12} className="md:w-3.5 md:h-3.5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                    <span>telegram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/cryptoduke01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line group"
                  >
                    <Github size={12} className="md:w-3.5 md:h-3.5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                    <span>github</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/akachukwuu?originalSubdomain=ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line group"
                  >
                    <Linkedin size={12} className="md:w-3.5 md:h-3.5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                    <span>linkedin</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] tracking-[0.2em] mb-3 md:mb-4 lowercase">
                resources
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a
                    href="/resume-dev.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line"
                  >
                    dev resume
                  </a>
                </li>
                <li>
                  <a
                    href="/resume-writing.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line"
                  >
                    writing resume
                  </a>
                </li>
                <li>
                  <a
                    href="https://superteam.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line"
                  >
                    superteam ng
                  </a>
                </li>
                <li>
                  <Link href="/content" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line">
                    threads
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-[#1a1a1a]">
            <span className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] lowercase text-center sm:text-left">
              {new Date().getFullYear()} duke.sol. built with <span className="text-[#00FFD1]">❤️</span> by me
            </span>

            <span className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] lowercase text-center sm:text-right">
              nigeria and remote / available worldwide
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

