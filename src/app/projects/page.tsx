"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Github, ExternalLink, Calendar, Twitter, MessageCircle, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

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
  // Featured flagship work
  {
    id: 104,
    featured: true,
    title: "Siren",
    description: "Prediction market trading terminal on Solana that aggregated Kalshi (via DFlow) and Polymarket into one feed, with adaptive YES and NO execution, live PnL tracking, a natural language trading agent, and a risk layer. Founder and lead developer.",
    longDescription: "I was the founder and lead developer of Siren, a prediction market trading terminal built on Solana that processed over $2,000 in trading volume. It aggregated live markets from Kalshi (via DFlow) and Polymarket into a single feed spanning politics, sports, crypto, finance, and entertainment, plus crypto price bracket markets for BTC, ETH, SOL, and more.\n\nTraders could buy and sell YES and NO positions with adaptive execution and partial fill fallback, track live positions, PnL, and execution history, and trade in plain English through the Siren Agent, for example 'Buy $20 YES on Bitcoin above 100k'. A risk intelligence layer flagged correlation across positions, concentration, and thin liquidity.\n\nStack: Next.js frontend, Fastify API, Supabase, DFlow and the Polymarket API for execution, Jupiter for onchain swaps, and Privy for embedded wallets with real-time USDC and SOL balance reads via Solana web3.js and SPL token accounts.",
    image: "/site-images/siren.png",
    github: "https://github.com/cryptoduke01/siren",
    demo: "https://app.onsiren.xyz/terminal",
    tags: ["Solana", "Prediction Markets", "Privy", "Supabase", "Fastify"],
    date: "2025",
    status: "founder",
    caseStudy: {
      problem:
        "Prediction market liquidity was fragmented across Kalshi and Polymarket, with no single place to trade YES/NO positions, manage risk, and track PnL.",
      built:
        "As founder and lead developer, I built a trading terminal aggregating Kalshi (via DFlow) and Polymarket, with adaptive execution, live position and PnL tracking, a natural language trading agent, and a risk layer for correlation and concentration alerts.",
      stack:
        "Next.js, Fastify, Supabase, DFlow, Polymarket API, Jupiter, and Privy embedded wallets with real-time USDC/SOL balances via Solana web3.js and SPL token accounts.",
      outcome:
        "Shipped end to end and processed over $2,000 in trading volume. Archived after the startup wound down; the code and live terminal stay verifiable.",
    },
  },
  {
    id: 101,
    featured: true,
    title: "Keryx",
    description: "Keryx is the toll booth for the agent economy, a pay-per-call monetization layer for AI agents built on the x402 protocol with USDC settlement on Arc, shipped with a full site, docs, and whitepaper.",
    longDescription: "Keryx is the toll booth for the agent economy, a pay-per-call monetization layer for AI agents built on the x402 protocol with USDC settlement on Arc, shipped with a full site, docs, and whitepaper.",
    image: "/site-images/keryx.png",
    github: "https://github.com/cryptoduke01/keryx",
    demo: "https://keryxhq.xyz",
    tags: ["Next.js", "x402", "USDC", "AI Agents"],
    date: "2026",
    status: "live",
    caseStudy: {
      problem:
        "AI agents call tools and APIs all day, but the publishers behind those tools had no clean way to get paid per call.",
      built:
        "A pay-per-call monetization layer on the x402 protocol: agents pay USDC per request, publishers price and meter access. Shipped with a full site, docs, and a whitepaper.",
      stack: "Next.js, x402 protocol, USDC settlement on Circle's Arc.",
      outcome: "Live on Arc testnet as the toll booth for the agent economy.",
    },
  },
  {
    id: 102,
    featured: true,
    title: "Swindle",
    description: "Swindle is an AI chess arena on Solana where autonomous agents compete and users wager USDC on the outcome, a consumer app with wallet connection and real on-chain money flows.",
    longDescription: "Swindle is an AI chess arena on Solana where autonomous agents compete and users wager USDC on the outcome, a consumer app with wallet connection and real on-chain money flows.",
    image: "/site-images/swindle.png",
    github: "https://github.com/cryptoduke01/swindle",
    demo: "https://playswindle.fun",
    tags: ["Next.js", "Solana", "USDC", "AI"],
    date: "2026",
    status: "live",
    caseStudy: {
      problem:
        "Consumer crypto rarely puts real money flows in front of everyday users in a way that feels like a game.",
      built:
        "An AI chess arena where autonomous agents compete and users wager USDC on the outcome, with wallet connection and on-chain settlement.",
      stack: "Next.js, Solana, USDC, Wallet Adapter, AI agents.",
      outcome: "Live consumer app with real on-chain wagering.",
    },
  },
  {
    id: 103,
    featured: true,
    title: "Percolator SDK & Audit",
    description: "Independent Phase 1 security audit of Toly's Percolator protocol, quoted and verified by Anatoly Yakovenko, followed by shipping the Percolator SDK and dashboard, published on npm as @percolatortool/sdk.",
    longDescription: "Independent Phase 1 security audit of Toly's Percolator protocol, quoted and verified by Anatoly Yakovenko, followed by shipping the Percolator SDK and dashboard, published on npm as @percolatortool/sdk.\n\nnpm: https://www.npmjs.com/package/@percolatortool/sdk\ntweet: https://x.com/toly/status/2020528646163689624",
    image: "/site-images/percolator.png",
    github: "https://github.com/cryptoduke01/percolator-cli",
    demo: "https://www.npmjs.com/package/@percolatortool/sdk",
    tags: ["Solana", "Security", "SDK", "Rust"],
    date: "2025",
    status: "shipped",
    caseStudy: {
      problem:
        "Toly's Percolator risk engine had no independent review, and integrators had no typed way to build on it without hand-rolling instruction layouts.",
      built:
        "An independent Phase 1 security audit, quoted and verified by Anatoly Yakovenko, followed by the Percolator SDK and dashboard published on npm.",
      stack: "Rust, TypeScript SDK, Solana, npm (@percolatortool/sdk).",
      outcome:
        "Audit quoted by Toly; SDK shipped so integrators can build wrappers and bots without reimplementing wire formats.",
    },
  },
  // Standard projects
  {
    id: 112,
    title: "Gloam",
    description: "Private trading and money movement on Robinhood Chain. Hold, move, and trade stocks and memes without printing your book to a public chain.",
    longDescription: "Gloam is private money on Robinhood Chain, a sealed chamber for anything liquid: stocks, memes, and more, held, moved, and traded without exposing your positions on a transparent ledger. Shipped with a full site, app, docs, and whitepaper.",
    image: "/site-images/gloam.png",
    github: "https://github.com/cryptoduke01/gloam",
    demo: "https://gloam.trade",
    tags: ["Robinhood Chain", "Privacy", "Trading", "TypeScript"],
    date: "2026",
    status: "live",
    caseStudy: {
      problem:
        "Public ledgers leak your positions and balances. Trading and holding on transparent chains means printing your book to anyone watching.",
      built:
        "A private trading and payments app on Robinhood Chain that lets users hold, move, and trade stocks and memes without exposing their positions, shipped with site, app, docs, and whitepaper.",
      stack: "Next.js, TypeScript, Robinhood Chain.",
      outcome: "Live at gloam.trade with a working testnet app.",
    },
  },
  {
    id: 113,
    title: "Onca",
    description: "Solana-native tool plugins for the ZeroClaw agent runtime that let an AI agent handle money safely: it proposes a payment request a person signs, never holding a key that can spend.",
    longDescription: "Onca is a set of Solana tools for the ZeroClaw agent runtime, shipped as wasm32-wasip2 WIT components in Rust. The tools let an agent read the chain and build payment requests a person signs, so the agent proposes and the user disposes, never a key that can spend on its own.",
    image: "/site-images/onca.png",
    github: "https://github.com/cryptoduke01/onca",
    demo: "https://onca.run",
    tags: ["Solana", "Rust", "AI Agents", "WASM"],
    date: "2026",
    status: "live",
    caseStudy: {
      problem:
        "Letting an AI agent move money is dangerous if it holds a spendable key. Agents need to transact without becoming a custody risk.",
      built:
        "Solana tool plugins for the ZeroClaw runtime, as Rust wasm32-wasip2 WIT components, that read the chain and build payment requests a human signs in their own wallet.",
      stack: "Rust, wasm32-wasip2 (WIT components), Solana, ZeroClaw runtime.",
      outcome: "Live at onca.run with the plugins open-sourced.",
    },
  },
  {
    id: 114,
    title: "Hanko",
    description: "Claim records for every tokenized asset on Solana. Public label pages for tokenized equities, graded from primary documents, that make the legal structure behind a token real.",
    longDescription: "Hanko is the stamp that makes the legal structure of a tokenized asset real. Every tokenized stock has a price, a chart, a ticker, and a legal structure, but your wallet only shows three. Hanko is a production v1 web app of public label pages for tokenized equities, graded from primary documents, with live market data where a mint is known.",
    image: "/site-images/hanko.png",
    github: "https://github.com/cryptoduke01/hanko",
    demo: "https://hankolabs.xyz",
    tags: ["Solana", "RWA", "Tokenized Assets", "Next.js"],
    date: "2026",
    status: "live",
    caseStudy: {
      problem:
        "Tokenized equities show a price, chart, and ticker, but the legal structure behind the token is invisible to holders.",
      built:
        "A production web app of public label pages for tokenized equities, graded from primary documents, with search, structure filters, and live market data where a mint is known.",
      stack: "Next.js, TypeScript, Solana, public DEX market data.",
      outcome: "Live at hankolabs.xyz as a v1 index of graded tokenized assets.",
    },
  },
  {
    id: 108,
    title: "Vector",
    description: "Vector is an autonomous AI trading agent with a four-channel signal jury that votes before the LLM decides, plus deterministic TypeScript risk layers that enforce sizing, alignment gates, and hard caps.",
    longDescription: "Vector is an autonomous AI trading agent with a four-channel signal jury that votes before the LLM decides, plus deterministic TypeScript risk layers that enforce sizing, alignment gates, and hard caps.",
    image: "/site-images/vector.png",
    github: "https://github.com/cryptoduke01/vector",
    demo: "https://vector-demo-qzdb.onrender.com",
    tags: ["AI", "Trading", "TypeScript"],
    date: "2026",
    status: "shipped",
    caseStudy: {
      problem:
        "LLM trading agents tend to hallucinate conviction and blow through risk limits.",
      built:
        "An autonomous agent with a four-channel signal jury that votes before the LLM decides, plus deterministic TypeScript risk layers enforcing sizing, alignment gates, and hard caps.",
      stack: "TypeScript, LLM reasoning, deterministic risk engine.",
      outcome: "Shipped with a live demo dashboard showing the signal jury and reconciliation.",
    },
  },
  {
    id: 109,
    title: "crewdeck",
    description: "crewdeck is a marketing agency marketplace built on Supabase Postgres, Auth, and Storage, with agency dashboards, a messaging system, image uploads, and email notifications.",
    longDescription: "crewdeck is a marketing agency marketplace built on Supabase Postgres, Auth, and Storage, with agency dashboards, a messaging system, image uploads, and email notifications.",
    image: "/site-images/crewdeck.png",
    github: "https://github.com/cryptoduke01/crewdeck",
    demo: "https://crewdeck.xyz",
    tags: ["Next.js", "Supabase", "Marketplace"],
    date: "2025",
    status: "shipped",
    caseStudy: {
      problem:
        "Web3 projects had no vetted, searchable place to find marketing agencies and KOLs.",
      built:
        "A marketplace with agency dashboards, a messaging system, image uploads, and email notifications.",
      stack: "Next.js, Supabase (Postgres, Auth, Storage), email notifications.",
      outcome: "Shipped and live at crewdeck.xyz.",
    },
  },
  {
    id: 110,
    title: "bulldropper",
    description: "Bulldropper scans X for viral posts on any cashtag or Solana mint, surfaces author wallets, and runs batched custody-free airdrops with full Token-2022 support, ATA creation, and Jito bundles.",
    longDescription: "Bulldropper scans X for viral posts on any cashtag or Solana mint, surfaces author wallets, and runs batched custody-free airdrops with full Token-2022 support, ATA creation, and Jito bundles.",
    image: "/site-images/bulldropper.png",
    github: "https://github.com/cryptoduke01/bulldropper",
    demo: "https://bulldropper.xyz",
    tags: ["Solana", "SPL", "Airdrop", "Privy"],
    date: "2026",
    status: "shipped",
    caseStudy: {
      problem:
        "Rewarding the people who make a token loud meant manual wallet hunting and custodial airdrop tooling.",
      built:
        "A tool that scans X for viral posts on a cashtag or mint, surfaces author wallets, and runs batched custody-free airdrops with Token-2022 support, ATA creation, and Jito bundles.",
      stack: "Solana, SPL / Token-2022, Jito bundles, Privy.",
      outcome: "Shipped and live at bulldropper.xyz.",
    },
  },
  {
    id: 111,
    title: "Deriverse Dashboard",
    description: "Trading analytics that decodes raw Solana wallet transaction history into structured trades, PnL, drawdown, and session analysis.",
    longDescription: "Trading analytics that decodes raw Solana wallet transaction history into structured trades, PnL, drawdown, and session analysis.",
    image: "/site-images/deriverse.png",
    github: "https://github.com/cryptoduke01/deriverse-dashboard",
    demo: "https://deriverseboard.vercel.app/",
    tags: ["Next.js", "Solana", "Analytics"],
    date: "2025",
    status: "shipped",
    caseStudy: {
      problem:
        "Traders on Deriverse had no view of their real PnL, win rate, drawdown, or session performance.",
      built:
        "Analytics that decode raw Solana wallet transaction history into structured trades, PnL, drawdown, and session analysis.",
      stack: "Next.js, Solana RPC decoding, analytics pipeline.",
      outcome: "Shipped as a live dashboard, with a full write-up on Substack.",
    },
  },
  {
    id: 106,
    title: "solweekly",
    description: "solweekly is a weekly Solana ecosystem reporting and publication resource for developers.",
    longDescription: "solweekly is a weekly Solana ecosystem reporting and publication resource for developers.",
    image: "/site-images/solweekly.png",
    github: "", // TODO: [FILL or omit if private] add solweekly github
    demo: "https://solweekly.xyz",
    tags: ["Solana", "Content", "Media"],
    date: "2025",
    status: "live",
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
    id: 107,
    title: "KD Essence",
    description: "KD Essence brand and storefront, a freelance client project delivering brand identity and a production e-commerce site.",
    longDescription: "KD Essence brand and storefront, a freelance client project delivering brand identity and a production e-commerce site.",
    image: "/site-images/kdessence.png",
    github: "", // KD Essence is an organization, no public github
    demo: "https://kdessence.vercel.app",
    tags: ["Next.js", "Client", "E-commerce"],
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
  featured?: boolean;
  caseStudy?: {
    problem: string;
    built: string;
    stack: string;
    outcome: string;
  };
};

type ProjectCardProps = {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
};

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      onClick={() => onSelect(project)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
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
            <span className="px-2 py-0.5 text-[9px] glass text-[#00FFD1] font-[family-name:var(--font-display)]">
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
              className="px-2 py-1 text-[9px] text-[#666] glass border border-[#1a1a1a] font-[family-name:var(--font-display)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[#00FFD1] hover:text-[#00e6bc] transition-colors"
            >
              <Github size={12} />
              <span className="text-xs font-[family-name:var(--font-display)]">github</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[#00FFD1] hover:text-[#00e6bc] transition-colors"
            >
              <ExternalLink size={12} />
              <span className="text-xs font-[family-name:var(--font-display)]">demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("/api/content/site")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.projects) && data.projects.length) {
          setProjectList(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  // Status filter, ordered; only statuses present in the data show up as chips
  const statusOrder = ["all", "live", "shipped", "in progress", "completed", "archived"];
  const filters = statusOrder.filter(
    (status) => status === "all" || projectList.some((project) => project.status === status)
  );
  const visibleProjects =
    activeFilter === "all"
      ? projectList
      : projectList.filter((project) => project.status === activeFilter);
  const featuredProjects = visibleProjects.filter((project) => project.featured);
  const standardProjects = visibleProjects.filter((project) => !project.featured);

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
              <span className="text-xs text-[#666] font-[family-name:var(--font-display)]">Loading</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#00FFD1]/5 rounded-full blur-[200px] pointer-events-none" />

      {/* Navigation */}
      <Navigation />

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
            <span className="text-sm font-medium text-[#00FFD1] tracking-[0.3em] font-[family-name:var(--font-display)]">
              Projects
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white font-[family-name:var(--font-serif)] mb-4">
            Development Projects
          </h1>
          <p className="text-[#666] max-w-lg font-[family-name:var(--font-display)] text-sm">
            A collection of Web3 projects built on Solana. From dApps to DeFi interfaces.
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
            { label: "projects built", value: String(projectList.length) },
            { label: "technologies", value: "15+" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold text-[#00FFD1] font-[family-name:var(--font-display)]">
                {stat.value}
              </div>
              <div className="text-xs text-[#666] font-[family-name:var(--font-display)] capitalize">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3 py-1.5 text-xs font-[family-name:var(--font-display)] capitalize border transition-colors ${
                activeFilter === status
                  ? "border-[#00FFD1] text-[#00FFD1] bg-[#00FFD1]/10"
                  : "border-[#1a1a1a] text-[#666] hover:border-[#00FFD1]/40 hover:text-[#999]"
              }`}
            >
              {status}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects (only in the unfiltered "all" view) */}
        {activeFilter === "all" && featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#00FFD1]" />
              <span className="text-xs font-medium text-[#00FFD1] tracking-[0.3em] font-[family-name:var(--font-display)]">
                Featured
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onSelect={setSelectedProject}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Development Projects Grid */}
        {activeFilter === "all" && featuredProjects.length > 0 && (
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-[#00FFD1]" />
            <span className="text-xs font-medium text-[#00FFD1] tracking-[0.3em] font-[family-name:var(--font-display)]">
              All Projects
            </span>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(activeFilter === "all" ? standardProjects : visibleProjects).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
          ))}
        </motion.div>

        {/* Startup Projects - Disabled section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-16"
        >
          <h2 className="text-xl font-semibold text-white mb-4 font-[family-name:var(--font-display)]">
            Startup Projects
          </h2>
          <div className="rounded-xl glass border border-[#1a1a1a] p-8 text-center opacity-60 pointer-events-none select-none">
            <p className="text-[#888] font-[family-name:var(--font-display)]">
              We will resume later.
            </p>
          </div>
        </motion.section>
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
                    <span className="px-2 py-0.5 text-[9px] glass text-[#00FFD1] font-[family-name:var(--font-display)]">
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

                {/* Case study */}
                {selectedProject.caseStudy && (
                  <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { label: "Problem", value: selectedProject.caseStudy.problem },
                      { label: "What I built", value: selectedProject.caseStudy.built },
                      { label: "Stack", value: selectedProject.caseStudy.stack },
                      { label: "Outcome", value: selectedProject.caseStudy.outcome },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="border border-[#1a1a1a] p-3 font-[family-name:var(--font-display)]"
                      >
                        <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#00FFD1]">
                          {row.label}
                        </div>
                        <div className="text-sm leading-relaxed text-[#999]">{row.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-[#666] glass border border-[#1a1a1a] font-[family-name:var(--font-display)]"
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FFD1] text-black font-semibold text-sm font-[family-name:var(--font-display)] hover:bg-[#00e6bc] transition-all"
                >
                  View on GitHub
                  <Github size={14} />
                </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 glass border border-[#1a1a1a] text-white font-semibold text-sm font-[family-name:var(--font-display)] hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all"
                  >
                    View Demo
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
              <p className="text-xs md:text-sm text-[#666] font-[family-name:var(--font-display)] leading-relaxed">
                Frontend Developer & Web3 Builder based in Nigeria and Remote.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] tracking-[0.2em] mb-3 md:mb-4">
                navigation
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link href="/" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line">
                    home
                  </Link>
                </li>
                <li>
                  <Link href="/#work" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line">
                    work
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line">
                    projects
                  </Link>
                </li>
                <li>
                  <Link href="/content" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line">
                    content
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line">
                    contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] tracking-[0.2em] mb-3 md:mb-4">
                socials
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a
                    href="https://x.com/cryptoduke01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line group"
                  >
                    <Twitter size={12} className="md:w-3.5 md:h-3.5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                    <span>twitter / x</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/dukedotsol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line group"
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
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line group"
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
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line group"
                  >
                    <Linkedin size={12} className="md:w-3.5 md:h-3.5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                    <span>linkedin</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] tracking-[0.2em] mb-3 md:mb-4">
                resources
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link
                    href="/cv"
                    className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line"
                  >
                    cv
                  </Link>
                </li>
                <li>
                  <a
                    href="https://superteam.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line"
                  >
                    superteam ng
                  </a>
                </li>
                <li>
                  <Link href="/content" className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line">
                    threads
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-[#1a1a1a]">
            <span className="text-xs md:text-sm text-[#666] font-[family-name:var(--font-display)] text-center sm:text-left">
              {new Date().getFullYear()} duke.sol. Built with <span className="text-[#00FFD1]">❤️</span> by me
            </span>

            <span className="text-xs md:text-sm text-[#666] font-[family-name:var(--font-display)] text-center sm:text-right capitalize">
              Nigeria and Remote / Available Worldwide
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

