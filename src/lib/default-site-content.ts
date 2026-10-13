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
      id: 1,
      title: "Siren",
      role: "Founder and Lead Developer",
      description:
        "Prediction market trading terminal aggregating Kalshi and Polymarket, with adaptive execution, real-time PnL, and a risk layer.",
      longDescription:
        "A prediction market trading terminal on Solana that aggregated Kalshi (via DFlow) and Polymarket, with Privy embedded wallets and real-time PnL over live balances.",
      image: "/site-images/siren.png",
      github: "https://github.com/cryptoduke01/siren",
      demo: "https://app.onsiren.xyz/terminal",
      tags: ["Solana", "Prediction Markets", "Supabase"],
      date: "2025",
      status: "founder",
    },
    {
      id: 2,
      title: "Gloam",
      role: "Founder",
      description:
        "Private trading and payments on Robinhood Chain. Hold, move, and trade without printing your book to a public chain.",
      longDescription:
        "A privacy layer for onchain finance, shipped with a full site, app, docs, and whitepaper.",
      image: "/site-images/gloam.png",
      github: "https://github.com/cryptoduke01/gloam",
      demo: "https://gloam.trade",
      tags: ["Privacy", "Payments", "ZK"],
      date: "2026",
      status: "live",
    },
    {
      id: 3,
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
      title: "Hanko",
      role: "Builder",
      description:
        "Claim records for every tokenized asset on Solana. Public label pages graded from primary documents.",
      longDescription:
        "The stamp that makes the legal structure behind a tokenized asset real, with live market data where a mint is known.",
      image: "/site-images/hanko.png",
      github: "https://github.com/cryptoduke01/hanko",
      demo: "https://hankolabs.xyz",
      tags: ["Solana", "RWA", "Tokenized Assets"],
      date: "2026",
      status: "live",
    },
    {
      id: 6,
      title: "Bulldropper",
      role: "Builder",
      description:
        "Scans X for viral posts on any cashtag or Solana mint, then runs batched custody-free airdrops.",
      longDescription:
        "Token-2022 airdrop tooling with ATA creation and Jito bundles, no custody required.",
      image: "/site-images/bulldropper.png",
      github: "https://github.com/cryptoduke01/bulldropper",
      demo: "https://bulldropper.xyz",
      tags: ["Solana", "SPL", "Airdrop"],
      date: "2026",
      status: "live",
    },
  ],
};
