"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, X, ArrowLeft, Download, FileText, Pen } from "lucide-react";
import Link from "next/link";

// Placeholder data - you'll replace these with actual links
const threads = [
  {
    id: 1,
    title: "understanding solana's architecture",
    preview: "a deep dive into how solana achieves 65,000 tps through its unique proof of history consensus mechanism and parallel transaction processing...",
    content: "solana's architecture is fundamentally different from other blockchains. at its core is proof of history (poh), a cryptographic clock that creates a historical record proving that an event occurred at a specific moment in time. this allows validators to process transactions without waiting for network-wide consensus on timing.\n\nthe key innovations include:\n\n1. proof of history - creates timestamps before consensus\n2. tower bft - optimized pbft using poh as a clock\n3. turbine - block propagation protocol\n4. gulf stream - mempool-less transaction forwarding\n5. sealevel - parallel smart contract runtime\n6. pipelining - transaction processing unit optimization\n7. cloudbreak - horizontally-scaled accounts database\n8. archivers - distributed ledger storage\n\nthese eight innovations work together to achieve theoretical throughput of 710,000 tps, though real-world performance typically ranges from 2,000-3,000 tps under normal conditions.",
    date: "dec 2024",
    engagement: "342 likes",
    link: "https://x.com/cryptoduke01",
  },
  {
    id: 2,
    title: "getting started with web3 development",
    preview: "a comprehensive guide for developers looking to transition from web2 to web3. covering wallets, smart contracts, and the solana ecosystem...",
    content: "transitioning from web2 to web3 development can feel overwhelming, but it's more accessible than you might think. here's a roadmap to get started:\n\n**foundation:**\n- understand blockchain fundamentals\n- learn about consensus mechanisms\n- explore different chains (ethereum, solana, etc.)\n\n**tooling:**\n- set up a development wallet (phantom, backpack)\n- learn to use block explorers\n- understand devnet vs mainnet\n\n**for solana specifically:**\n- anchor framework for programs\n- @solana/web3.js for frontend\n- wallet-adapter for connections\n\n**key concepts:**\n- accounts model vs utxo\n- program derived addresses (pdas)\n- cross-program invocations (cpis)\n- token standards (spl tokens)\n\nstart with simple projects like a token faucet or nft minter before moving to complex defi applications.",
    date: "nov 2024",
    engagement: "567 likes",
    link: "https://x.com/cryptoduke01",
  },
  {
    id: 3,
    title: "the future of defi on solana",
    preview: "exploring emerging defi protocols and how solana's speed advantages are creating new possibilities for decentralized finance...",
    content: "solana's high throughput and low fees are enabling a new generation of defi applications that weren't possible on other chains.\n\n**current landscape:**\n- amms: orca, raydium, phoenix\n- lending: marginfi, kamino, solend\n- perps: drift, zeta, mango\n- liquid staking: marinade, jito, blazestake\n\n**emerging trends:**\n\n1. **real-time defi** - order book dexs that rival cex speeds\n2. **compressed nfts** - reducing costs for large-scale drops\n3. **cross-chain bridges** - wormhole, allbridge connecting ecosystems\n4. **payment rails** - solana pay enabling real-world transactions\n5. **intent-based trading** - aggregators finding optimal routes\n\nthe combination of speed, cost, and composability positions solana as a strong contender for mainstream defi adoption.",
    date: "nov 2024",
    engagement: "423 likes",
    link: "https://x.com/cryptoduke01",
  },
  {
    id: 4,
    title: "building user-friendly dapps",
    preview: "ux best practices for blockchain applications. how to make web3 accessible to mainstream users while maintaining decentralization...",
    content: "the biggest barrier to web3 adoption isn't technology—it's user experience. here's how to build dapps that don't feel like dapps:\n\n**reduce friction:**\n- abstract away seed phrases with email/social login\n- sponsor gas fees where possible\n- use human-readable addresses (.sol domains)\n- implement progressive onboarding\n\n**design principles:**\n- familiar ui patterns (don't reinvent the wheel)\n- clear transaction previews\n- loading states that explain what's happening\n- error messages that actually help\n\n**technical approaches:**\n- session keys for repeated actions\n- transaction simulation before signing\n- optimistic ui updates\n- websocket connections for real-time data\n\nthe goal: users shouldn't need to understand blockchain to use your product. the best web3 apps feel like web2 apps with superpowers.",
    date: "oct 2024",
    engagement: "289 likes",
    link: "https://x.com/cryptoduke01",
  },
  {
    id: 5,
    title: "arcium: privacy infrastructure for web3",
    preview: "deep dive into arcium's confidential computing network and how it enables private smart contracts on solana...",
    content: "privacy is the missing piece in blockchain adoption. arcium is building the infrastructure to make confidential computation accessible.\n\n**what is arcium?**\na decentralized confidential computing network that enables encrypted computation without revealing underlying data.\n\n**key technology:**\n- multi-party computation (mpc)\n- threshold encryption\n- secure enclaves\n- zero-knowledge proofs\n\n**use cases:**\n1. private voting/governance\n2. sealed-bid auctions\n3. confidential defi (hidden positions)\n4. private identity verification\n5. secure data marketplaces\n\n**for developers:**\n- arcis: rust-based sdk\n- integration with solana programs\n- composable privacy primitives\n\narcium enables a new paradigm where you can verify computation happened correctly without seeing the inputs or outputs.",
    date: "oct 2024",
    engagement: "512 likes",
    link: "https://x.com/cryptoduke01",
  },
  {
    id: 6,
    title: "superteam nigeria: building in africa",
    preview: "how superteam nigeria is driving blockchain adoption and developer education across the continent...",
    content: "africa represents one of the largest opportunities for blockchain adoption, and superteam nigeria is at the forefront.\n\n**what we do:**\n- developer education and bootcamps\n- hackathons and bounty programs\n- community building and events\n- project incubation and support\n\n**why africa matters for web3:**\n- large unbanked population\n- mobile-first internet users\n- remittance-heavy economies\n- young, tech-savvy demographic\n\n**our impact:**\n- 500+ developers trained\n- 50+ bounties completed\n- multiple funded projects\n- growing ecosystem partners\n\n**challenges we're solving:**\n- fiat on/off ramps\n- education and awareness\n- infrastructure access\n- regulatory clarity\n\nthe future of web3 isn't just being built in silicon valley—it's being built in lagos, nairobi, and across the continent.",
    date: "sep 2024",
    engagement: "678 likes",
    link: "https://x.com/cryptoduke01",
  },
];

const articles = [
  {
    id: 1,
    title: "a complete guide to solana development",
    preview: "everything you need to know to start building on solana, from environment setup to deploying your first program.",
    content: "this comprehensive guide walks you through the entire process of becoming a solana developer...",
    date: "dec 2024",
    readTime: "12 min",
    link: "#",
    platform: "mirror",
  },
  {
    id: 2,
    title: "understanding token standards on solana",
    preview: "spl tokens, nfts, and the token-2022 program explained for developers.",
    content: "solana's token ecosystem is built on the spl token program...",
    date: "nov 2024",
    readTime: "8 min",
    link: "#",
    platform: "hashnode",
  },
  {
    id: 3,
    title: "web3 security best practices",
    preview: "common vulnerabilities in smart contracts and how to protect your users.",
    content: "security in web3 is paramount. this guide covers the most common attack vectors...",
    date: "oct 2024",
    readTime: "15 min",
    link: "#",
    platform: "dev.to",
  },
];

const resumes = [
  {
    title: "developer resume",
    description: "frontend & web3 development experience, technical skills, and project highlights.",
    icon: FileText,
    downloadLink: "/resume-dev.pdf",
  },
  {
    title: "writing resume",
    description: "content creation, technical writing, and community management experience.",
    icon: Pen,
    downloadLink: "/resume-writing.pdf",
  },
];

type ContentItem = {
  id: number;
  title: string;
  preview: string;
  content: string;
  date: string;
  engagement?: string;
  readTime?: string;
  link: string;
  platform?: string;
};

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<"threads" | "articles" | "resume">("threads");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "threads" as const, label: "threads" },
    { id: "articles" as const, label: "articles" },
    { id: "resume" as const, label: "resume" },
  ];

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
              content
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white font-[family-name:var(--font-display)] lowercase mb-4">
            threads & articles
          </h1>
          <p className="text-[#666] max-w-lg font-[family-name:var(--font-display)] text-sm lowercase">
            sharing knowledge about web3, blockchain technology, and the solana ecosystem through educational content.
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
            { label: "threads written", value: "200+" },
            { label: "total engagement", value: "50k+" },
            { label: "bounties won", value: "13x" },
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

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-2 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium font-[family-name:var(--font-display)] transition-all duration-300 lowercase ${
                activeTab === tab.id
                  ? "bg-[#00FFD1] text-black"
                  : "glass text-[#666] hover:text-white border border-[#1a1a1a] hover:border-[#00FFD1]/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Threads Tab */}
        {activeTab === "threads" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {threads.map((thread, i) => (
              <motion.button
                key={thread.id}
                onClick={() => setSelectedContent(thread)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -5 }}
                className="group block p-6 glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#666] font-[family-name:var(--font-display)] lowercase">
                    {thread.date}
                  </span>
                  <span className="text-xs text-[#00FFD1] font-[family-name:var(--font-display)] lowercase opacity-0 group-hover:opacity-100 transition-opacity">
                    read
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors lowercase">
                  {thread.title}
                </h3>

                <p className="text-sm text-[#666] mb-4 font-[family-name:var(--font-display)] leading-relaxed lowercase line-clamp-2">
                  {thread.preview}
                </p>

                <span className="text-xs text-[#00FFD1] font-[family-name:var(--font-display)] lowercase">
                  {thread.engagement}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Articles Tab */}
        {activeTab === "articles" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article, i) => (
              <motion.button
                key={article.id}
                onClick={() => setSelectedContent(article)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -5 }}
                className="group block p-6 glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs glass text-[#00FFD1] font-[family-name:var(--font-display)] lowercase">
                    {article.platform}
                  </span>
                  <span className="text-xs text-[#666] font-[family-name:var(--font-display)] lowercase">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors lowercase">
                  {article.title}
                </h3>

                <p className="text-sm text-[#666] mb-4 font-[family-name:var(--font-display)] leading-relaxed lowercase">
                  {article.preview}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666] font-[family-name:var(--font-display)] lowercase">
                    {article.date}
                  </span>
                  <span className="text-xs text-[#00FFD1] font-[family-name:var(--font-display)] lowercase opacity-0 group-hover:opacity-100 transition-opacity">
                    read
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Resume Tab */}
        {activeTab === "resume" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6 max-w-3xl"
          >
            {resumes.map((resume, i) => (
              <motion.a
                key={resume.title}
                href={resume.downloadLink}
                download
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group block p-8 glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 hover:border-glow transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center glass border border-[#1a1a1a] group-hover:border-[#00FFD1]/50 transition-colors">
                    <resume.icon size={20} className="text-[#00FFD1]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors lowercase">
                      {resume.title}
                    </h3>
                    <p className="text-sm text-[#666] font-[family-name:var(--font-display)] leading-relaxed lowercase mb-4">
                      {resume.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#00FFD1]">
                      <Download size={14} />
                      <span className="text-xs font-[family-name:var(--font-display)] lowercase">
                        download pdf
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedContent && (
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
              onClick={() => setSelectedContent(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden glass border border-[#1a1a1a]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
                <div>
                  <span className="text-xs text-[#00FFD1] font-[family-name:var(--font-display)] lowercase mb-1 block">
                    {selectedContent.date} {selectedContent.engagement && `/ ${selectedContent.engagement}`}
                  </span>
                  <h2 className="text-xl font-semibold text-white font-[family-name:var(--font-display)] lowercase">
                    {selectedContent.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="p-2 text-[#666] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <div className="text-[#999] font-[family-name:var(--font-display)] text-sm leading-relaxed lowercase whitespace-pre-line">
                  {selectedContent.content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#1a1a1a]">
                <a
                  href={selectedContent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FFD1] text-black font-semibold text-sm font-[family-name:var(--font-display)] hover:bg-[#00e6bc] transition-all lowercase"
                >
                  read full thread on x
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

