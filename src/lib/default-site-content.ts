import type { SiteContent } from "@/lib/content-types";

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: "Solana builder since 2023",
    titleTop: "i build, i research,",
    titleMain: "and i write it all down.",
    subtitle:
      "I build consumer and infrastructure products on Solana and Circle's Arc, from AI agent payment rails to on-chain apps with real USDC flows. I do protocol and security research, including an independent Percolator audit quoted by Toly, and I write the threads, articles, and weekly ecosystem reports that turn what I learn into something others can use. Solana builder since 2023, Core Member at Superteam Nigeria, 3x hackathon winner, 14+ Superteam Earn bounty wins.",
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
  ],
  updates: [
    {
      id: "okx-genesis-hack",
      title: "Building for the OKX AI Genesis Hack",
      summary:
        "Currently heads-down building for the OKX AI Genesis Hackathon.",
      // TODO: [FILL] add OKX AI Genesis project link
    },
    {
      id: "bitget-lepton-hack",
      title: "Bitget AI and Lepton Agents Hackathon",
      summary:
        "Submitted to the Bitget AI and Lepton Agents Hackathon.",
      // TODO: [FILL] add Bitget / Lepton submission link
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
