import type { SiteContent } from "@/lib/content-types";

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: "Solana builder and writer",
    titleTop: "I build products,",
    titleMain: "ship threads, and document the process.",
    subtitle:
      "13x Superteam Earn bounty winner. I turn research into clear content and usable tooling.",
    quote:
      "Independent Phase 1 audit of Toly's Percolator was quoted by Toly and verified.",
    quoteSource: "https://x.com/toly/status/2020528646163689624",
    profileImage: "/mypfp.jpg",
    location: "Nigeria and remote",
    ctaPrimaryLabel: "View projects",
    ctaPrimaryLink: "/projects",
    ctaSecondaryLabel: "Read highlights",
    ctaSecondaryLink: "https://x.com/cryptoduke01/highlights",
    stats: [
      { label: "bounty wins", value: "13x" },
      { label: "focus", value: "Solana" },
      { label: "mode", value: "build -> write -> ship" },
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
  ],
  updates: [
    {
      id: "percolator-audit",
      title: "Independent audit of Toly's Percolator",
      summary:
        "Published the Phase 1 risk-engine audit, then got quoted by Toly. Followed up by shipping Percolator SDK helpers and dashboard updates.",
      link: "https://x.com/cryptoduke01/status/2020527640801653028",
    },
    {
      id: "portfolio-refresh",
      title: "Portfolio refresh shipped",
      summary:
        "Updated central portfolio hub for experiments, threads, writings, and active builds.",
      link: "https://dukesol.vercel.app/",
    },
    {
      id: "solweekly",
      title: "Solweekly in active development",
      summary: "Building a weekly Solana ecosystem reporting and publication flow.",
      link: "https://solweekly.xyz",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Personal Portfolio",
      role: "Builder",
      description: "Central hub for experiments, content, and Web3 writings.",
      longDescription:
        "A single place for work history, shipped products, threads, and writing designed as proof-of-work.",
      image: "/mypfp.jpg",
      github: "https://github.com/cryptoduke01/",
      demo: "https://dukesol.vercel.app/",
      tags: ["Next.js", "TypeScript", "Portfolio"],
      date: "2026",
      status: "active",
    },
  ],
};
