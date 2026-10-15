import type { SiteContent } from "@/lib/content-types";

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: "",
    titleTop: "I build, I research,",
    titleMain: "and I write it all down.",
    subtitle:
      "Consumer and infrastructure products, protocol and security research, and the threads and reports that make it useful to others.",
    quote:
      "Independent Phase 1 audit of Toly's Percolator was quoted by Toly and verified.",
    quoteSource: "https://x.com/toly/status/2020528646163689624",
    profileImage: "/mypfp.jpg",
    location: "Nigeria and remote",
    ctaPrimaryLabel: "View projects",
    ctaPrimaryLink: "/projects",
    ctaSecondaryLabel: "Read highlights",
    ctaSecondaryLink: "https://x.com/dukedotsol/highlights",
    stats: [
      { label: "hackathon wins", value: "3x" },
      { label: "bounty wins", value: "14x" },
      { label: "building since", value: "2023" },
    ],
  },
  testimonials: [
    {
      id: "toly-quote",
      quote:
        "Independent Phase 1 Security Audit of Toly's Percolator was quoted by Toly and verified.",
      author: "Anatoly Yakovenko",
      role: "Co-founder, Solana",
      link: "https://x.com/toly/status/2020528646163689624",
    },
    {
      id: "getblock-firstplace",
      quote:
        "First place. Unanimous winner across the team. Clear, insightful, beautifully designed thread plus an applied doc with 48 hours of hands-on GetBlock research. Congrats, you nailed it.",
      author: "GetBlock",
      role: "Node infrastructure provider",
    },
    {
      id: "nataly-getblock",
      quote:
        "Reviewing the results of our first bounty with Superteam Earn, the talent density in Web3 is really something else. Congrats to duke, you definitely know your way around Web3.",
      author: "Nataly Lahuti",
      role: "GetBlock",
    },
  ],
  updates: [
    {
      id: "gloam-interview",
      title: "Interviewed on building Gloam",
      summary:
        "Sat down with 3rd Variation's Founders Corner on building Gloam, a privacy layer for onchain finance.",
      link: "https://x.com/3rdvariation/status/2107817012017668444",
    },
    {
      id: "smc-head-of-audits",
      title: "Joined SMC Audits as Head of Audits",
      summary:
        "Now leading smart contract and protocol security audits across EVM and Solana, from scoping to responsible disclosure.",
      // TODO: [FILL] add announcement link
    },
    {
      id: "sidetrack-wins",
      title: "3x Superteam Earn sidetrack winner",
      summary:
        "Won three Superteam Earn sidetrack hackathons: Torque Protocol, Sagapad, and Jupiter.",
      // TODO: [FILL] add proof link
    },
  ],
  projects: [
    {
      id: 2,
      title: "Gloam",
      role: "Founder",
      description:
        "Private money on public chains. Private payments and payroll in stablecoins for people, teams, and their agents, with selective disclosure proofs.",
      longDescription:
        "A privacy layer for onchain finance on Tempo and Robinhood Chain, with an MCP server and agent plugins.",
      image: "/site-images/gloam.png",
      github: "https://github.com/cryptoduke01/gloam",
      demo: "https://gloam.trade",
      tags: ["Privacy", "ZK", "Payroll"],
      date: "2026",
      status: "live",
    },
    {
      id: 3,
      title: "Hanko",
      role: "Builder",
      description:
        "Splits a tokenized stock into three tradeable parts, Shield, Core, and Edge, that always recombine into one share. On-chain Solana vault with Pyth settlement.",
      longDescription:
        "The hanko_vault program refracts one tokenized share into three SPL tokens with fixed payoffs, live on Solana devnet.",
      image: "/site-images/hanko.png",
      github: "https://github.com/cryptoduke01/hanko",
      demo: "https://hankolabs.xyz",
      tags: ["Solana", "Tokenized Stocks", "Pyth"],
      date: "2026",
      status: "live",
    },
    {
      id: 7,
      title: "Onca",
      role: "Builder",
      description:
        "A manipulation-resistant DePIN oracle for prediction markets, built as Solana tools for ZeroClaw agents that never hold a key that can spend.",
      longDescription:
        "Reputation-weighted mesh oracle, attestation gate, and x402 payment loop as Rust/WASM tools, proven on Solana devnet.",
      image: "/site-images/onca.png",
      github: "https://github.com/cryptoduke01/onca",
      demo: "https://onca.run",
      tags: ["Solana", "Rust", "Oracle"],
      date: "2026",
      status: "live",
    },
    {
      id: 4,
      title: "Percolator SDK and Audit",
      role: "Security and SDK",
      description:
        "Independent Phase 1 audit of Toly's Percolator, quoted by Anatoly Yakovenko, then shipped the SDK on npm.",
      longDescription:
        "Security research plus the @percolatortool/sdk TypeScript SDK and dashboard for Toly's Percolator risk engine.",
      image: "/site-images/percolator.png",
      github: "https://github.com/cryptoduke01/percolator-cli",
      demo: "https://www.npmjs.com/package/@percolatortool/sdk",
      tags: ["Solana", "Security", "SDK"],
      date: "2025",
      status: "shipped",
    },
    {
      id: 5,
      title: "Keryx",
      role: "Builder",
      description:
        "Pay-per-call monetization layer for AI agents on the x402 protocol with USDC settlement on Arc.",
      longDescription:
        "The toll booth for the agent economy, shipped with a full site, docs, and whitepaper.",
      image: "/site-images/keryx.png",
      github: "https://github.com/cryptoduke01/keryx",
      demo: "https://keryxhq.xyz",
      tags: ["x402", "USDC", "AI Agents"],
      date: "2026",
      status: "live",
    },
    {
      id: 6,
      title: "notch",
      role: "Builder",
      description:
        "A launchpad that ranks and pays creators by survival. A notch is a 24 hour window in which a token really trades, and every fifth notch is a gate.",
      longDescription:
        "Anyone can launch, notch counts what lasts. Live on Robinhood Chain with $NOTCH.",
      image: "/site-images/notch.png",
      github: "",
      demo: "https://gonotch.fun",
      tags: ["Launchpad", "Robinhood Chain", "Chainlink"],
      date: "2026",
      status: "live",
    },
  ],
};
