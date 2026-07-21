"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Printer,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const contact = [
  { icon: Mail, label: "thepublicdesigner@gmail.com", href: "mailto:thepublicdesigner@gmail.com" },
  { icon: Phone, label: "+234 704 785 6771", href: "tel:+2347047856771" },
  { icon: MapPin, label: "Jos, Nigeria (Remote)", href: undefined },
  { icon: Globe, label: "iamduke.xyz", href: "https://iamduke.xyz" },
  { icon: Twitter, label: "x.com/cryptoduke01", href: "https://x.com/cryptoduke01" },
  { icon: Github, label: "github.com/cryptoduke01", href: "https://github.com/cryptoduke01" },
  { icon: Linkedin, label: "linkedin.com/in/akachukwuu", href: "https://www.linkedin.com/in/akachukwuu" },
  { icon: MessageCircle, label: "t.me/dukedotsol", href: "https://t.me/dukedotsol" },
];

const experience = [
  {
    role: "Founder and Lead Developer",
    org: "Siren, prediction market trading terminal",
    period: "2025",
    points: [
      "Built a prediction market trading terminal that aggregated Kalshi (via DFlow) and Polymarket, integrating live order placement, position tracking, and closing across providers.",
      "Implemented Privy embedded wallets with real-time USDC and SOL balance reads using Solana web3.js and SPL token accounts.",
      "Built a persistent data layer on Supabase for hedge history and PnL, moving beyond localStorage, with real-time PnL updates in place of polling.",
      "Designed a natural language trading agent covering intent parsing, market matching, and edge-case handling, plus a risk layer for correlation and concentration.",
      "Hardened API routes with error handling and retries; shipped end to end and processed over $2,000 in trading volume.",
    ],
  },
  {
    role: "Independent Builder and Researcher",
    org: "Solana and Circle's Arc",
    period: "2023 — Present",
    points: [
      "Shipped Keryx, a pay-per-call monetization layer for AI agents on the x402 protocol with USDC settlement on Arc, with a full site, docs, and whitepaper.",
      "Published an independent Phase 1 security audit of Toly's Percolator risk engine, quoted and verified by Anatoly Yakovenko, then shipped the Percolator SDK and dashboard on npm as @percolatortool/sdk.",
      "Shipped Gloam (private trading on Robinhood Chain), Onca (Solana agent-payment tooling in Rust), Hanko (claim records for tokenized assets), Swindle (AI chess arena with on-chain USDC wagering), Vector, Bulldropper, crewdeck, and Deriverse.",
    ],
  },
  {
    role: "Core Member and Community",
    org: "Superteam Nigeria",
    period: "2024 — Present",
    points: [
      "Core contributor driving growth of the Solana ecosystem in Nigeria.",
      "Run technical workshops, create educational content, and connect developers with resources and opportunities.",
    ],
  },
  {
    role: "Frontend and Product Developer",
    org: "Freelance and Partner Projects",
    period: "2023 — Present",
    points: [
      "Built responsive React, Next.js, and TypeScript web applications and Web3 product interfaces.",
      "Delivered brand identity and a production e-commerce site for KD Essence, plus landing pages and dashboards that improved performance and engagement.",
    ],
  },
];

const writing = [
  "The Aggregator Inversion (BullpenFi)",
  "The Security Layer for Solana's Agent Economy (Bento Guard)",
  "Prediction Markets Are Not Gambling",
  "The Precision Gap (Trepa)",
  "Building on Bayse",
  "solweekly, weekly Solana ecosystem reports",
];

const achievements = [
  "3x hackathon winner: Superteam Earn sidetracks (Torque Protocol, Sagapad, Jupiter)",
  "14x Superteam Earn bounty winner",
  "Percolator Phase 1 audit quoted by Anatoly Yakovenko (Toly)",
];

const skills = [
  { group: "Languages", items: "TypeScript, JavaScript, Rust (SDK), Node.js" },
  { group: "Frontend", items: "React, Next.js, Tailwind CSS, Framer Motion" },
  { group: "Backend and Infra", items: "Fastify, REST / GraphQL, Supabase (Postgres, Auth, Storage), webhooks" },
  { group: "Solana and Web3", items: "web3.js, Wallet Adapter, SPL / Token-2022, Jito, x402, USDC, Privy, Jupiter, DFlow" },
  { group: "Practice", items: "Security research and auditing, data pipelines, technical writing, Git" },
];

const languages = ["English (Fluent)", "French (Intermediate)", "Igbo (Fluent)"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-[1px] w-6 bg-[#00FFD1]" />
      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#00FFD1]">
        {children}
      </span>
    </div>
  );
}

export default function CVPage() {
  return (
    <main className="relative min-h-screen bg-black text-[#e0e0e0]">
      {/* Screen-only controls */}
      <div className="no-print sticky top-0 z-50 border-b border-[#1a1a1a] bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#666] transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to site
          </Link>
          <a
            href="/resume.pdf"
            download="duke-sol-cv.pdf"
            className="inline-flex items-center gap-2 border border-[#00FFD1]/30 bg-[#00FFD1]/10 px-4 py-2 text-sm text-[#00FFD1] transition-colors hover:bg-[#00FFD1]/20"
          >
            <Printer size={15} />
            Download PDF
          </a>
        </div>
      </div>

      {/* CV sheet */}
      <div className="cv-sheet mx-auto max-w-4xl px-6 py-10 sm:px-10 sm:py-14">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-6 border-b border-[#1a1a1a] pb-8 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[#1a1a1a]">
            <Image src="/mypfp.jpg" alt="duke.sol" fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="font-[family-name:var(--font-serif)] text-4xl leading-none text-white sm:text-5xl">
              <span className="text-white">duke</span>
              <span className="text-[#00FFD1]">.sol</span>
            </h1>
            <p className="mt-2 text-sm text-[#9aa]">
              Solana Builder, Researcher, and Writer
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#666]">
              Consumer and infrastructure products, protocol and security research, and the threads
              and reports that make it useful to others.
            </p>
          </div>
        </header>

        {/* Contact row */}
        <div className="mb-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {contact.map(({ icon: Icon, label, href }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-[#9aa]">
              <Icon size={13} className="flex-shrink-0 text-[#00FFD1]" />
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-[#00FFD1]"
                >
                  {label}
                </a>
              ) : (
                <span>{label}</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.7fr_1fr]">
          {/* Main column */}
          <div>
            <section className="mb-9">
              <SectionLabel>Profile</SectionLabel>
              <p className="text-sm leading-relaxed text-[#b0b0b0]">
                I ship consumer and infrastructure products across Solana and Circle&apos;s Arc. Most
                recently I founded and led Siren, a prediction market trading terminal that integrated
                Kalshi and Polymarket, Privy embedded wallets, and real-time PnL over live USDC and SOL
                balances, the same shape of problem as production prediction-market apps. I also run
                protocol and security research, including an independent Phase 1 audit of Toly&apos;s
                Percolator that was quoted and verified by Anatoly Yakovenko, and I write the threads,
                articles, and weekly reports that make the work useful to others. Solana builder since
                2023 and Core Member at Superteam Nigeria.
              </p>
            </section>

            <section className="mb-9">
              <SectionLabel>Experience</SectionLabel>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.role} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                      <span className="text-xs text-[#666]">{exp.period}</span>
                    </div>
                    <p className="mb-2 text-sm text-[#00FFD1]">{exp.org}</p>
                    <ul className="space-y-1.5">
                      {exp.points.map((p, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed text-[#999]">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#00FFD1]" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="break-inside-avoid">
              <SectionLabel>Selected Writing</SectionLabel>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {writing.map((w) => (
                  <li key={w} className="flex gap-2 text-sm leading-relaxed text-[#999]">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#00FFD1]" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <section className="mb-9 break-inside-avoid">
              <SectionLabel>Achievements</SectionLabel>
              <ul className="space-y-2">
                {achievements.map((a) => (
                  <li key={a} className="flex gap-2 text-sm leading-relaxed text-[#b0b0b0]">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#00FFD1]" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-9 break-inside-avoid">
              <SectionLabel>Skills</SectionLabel>
              <div className="space-y-3">
                {skills.map((s) => (
                  <div key={s.group}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white">
                      {s.group}
                    </p>
                    <p className="text-sm leading-relaxed text-[#999]">{s.items}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-9 break-inside-avoid">
              <SectionLabel>Languages</SectionLabel>
              <ul className="space-y-1">
                {languages.map((l) => (
                  <li key={l} className="text-sm text-[#999]">
                    {l}
                  </li>
                ))}
              </ul>
            </section>

            <section className="break-inside-avoid">
              <SectionLabel>Education</SectionLabel>
              <p className="text-sm font-semibold text-white">Secondary School Certificate</p>
              <p className="text-sm text-[#00FFD1]">St. Paul&apos;s Academy, Jos</p>
              <p className="text-xs text-[#666]">2017 — 2023, Science and Mathematics</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
