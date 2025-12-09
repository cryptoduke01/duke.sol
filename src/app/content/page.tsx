"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, X, ArrowLeft, Download, FileText, Pen, Calendar, Heart, MessageCircle, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Helper function to format date
const formatDate = (dateString: string): string => {
  if (!dateString || dateString === "N/A (Fetch failed)") return "date unknown";
  try {
    const date = new Date(dateString);
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return "date unknown";
  }
};

// Helper function to parse date for sorting
const parseDate = (dateString: string): number => {
  if (!dateString || dateString === "N/A (Fetch failed)") return 0;
  try {
    return new Date(dateString).getTime();
  } catch {
    return 0;
  }
};

// Thread data with all details - will be sorted by date
const threadsData = [
  {
    id: 1,
    link: "https://x.com/cryptoduke01/status/1888051718660739337",
    image: "/thread-images/thread-1.jpg",
    date: "Sat, 08 Feb 2025 02:26:22 GMT",
    likes: 96,
    comments: 26,
    bookmarks: 16,
    hook: "Open Source Developers Deserve Recognition",
    firstTweet: "As a developer, I keep wondering why I contribute to open-source projects without getting recognized or a dime aside from my career development.\n\nBut thoughts are mostly problems with a solution we haven't found yet.\n\nFortunately, @DeTAProtocol is presenting me with a solution.",
  },
  {
    id: 2,
    link: "https://x.com/cryptoduke01/status/1899156234646741112",
    image: "/thread-images/thread-2.jpg",
    date: "Mon, 10 Mar 2025 17:51:45 GMT",
    likes: 82,
    comments: 16,
    bookmarks: 2,
    hook: "AI Models Trained on Poor Data Are Destined for Failure",
    firstTweet: "AI models trained on poor data are destined for failure!\n\nI struggled with AI models, which sometimes failed to deliver results, until I learned about the significance of high-quality data.\n\nThis may be why your AI assistant is underperforming without you even realizing it!\n\nThe issue isn't with the model, whether it's ChatGPT, Grok, or Deepseek; it's all about the data.\n\nHere's how everything is changing:",
  },
  {
    id: 3,
    link: "https://x.com/cryptoduke01/status/1902798281509322797",
    image: "/thread-images/thread-3.jpg",
    date: "Thu, 20 Mar 2025 19:03:57 GMT",
    likes: 66,
    comments: 15,
    bookmarks: 3,
    hook: "Blockchain Betting Just Got Easier",
    firstTweet: "You won't believe that placing bets on the blockchain is now much more straightforward.\n\nA massive combination of sports, NFTs, and crypto makes it interesting at this point where the March Madness is about to begin, and you have the chance to win huge prices on @DivvyBet.\n\nBut let me walk you through the \"March Madness\"",
  },
  {
    id: 4,
    link: "https://x.com/cryptoduke01/status/1927908240882385262",
    image: "/thread-images/thread-4.jpg",
    date: "Thu, 29 May 2025 02:01:58 GMT",
    likes: 170,
    comments: 81,
    bookmarks: 11,
    hook: "I Start Building Apps And Stop Halfway",
    firstTweet: "I start building apps and stop halfway!\n\nI don't have a problem starting them!\n\nMy problem is just trying to get real-world or real-time data into this \"thing\" and make it work.\n\nThis has been a big issue for me until I found @switchboardxyz,\n\nHere is the real gist",
  },
  {
    id: 5,
    link: "https://x.com/cryptoduke01/status/1935531684704735319",
    image: "/thread-images/thread-5.jpg",
    date: "Thu, 19 Jun 2025 02:54:48 GMT",
    likes: 112,
    comments: 50,
    bookmarks: 4,
    hook: "Sending $200 to Nairobi Just Got Easier",
    firstTweet: "Have you tried sending your girl $200 that stays in Nairobi?\n\nUSDT on Ethereum may cost you around $15 in fees and slow processing. Probably her local exchange doesn't even support it.\n\nUSDC may work, but you've seen accounts frozen without warning.\n\nSending stablecoins shouldn't be that hard!\n\nThat's where the $USDG from the @global_dollar network comes in. With low fees, no freeze riskand fully compliant for global use, let's see how it works",
  },
  {
    id: 6,
    link: "https://x.com/cryptoduke01/status/1945108835154137485",
    image: "/thread-images/thread-6.jpg",
    date: "Tue, 15 Jul 2025 13:10:59 GMT",
    likes: 108,
    comments: 46,
    bookmarks: 8,
    hook: "Ripple Co-founder Drops $10M on this Platform!",
    firstTweet: "Ripple Co-founder Drops $10M on this Platform!\n\nChris Larsen, the co-founder of Ripple, just led a $10 million seed funding round for Yellow Network.\n\nWhen someone who has built one of the most successful blockchain companies invests this much money in a project, you have no choice other than to pay attention.\n\nHere's why this Layer-3 protocol is about to optimize applications",
  },
  {
    id: 7,
    link: "https://x.com/cryptoduke01/status/1945774342341877822",
    image: "/thread-images/thread-7.jpg",
    date: "Thu, 17 Jul 2025 09:15:28 GMT",
    likes: 89,
    comments: 19,
    bookmarks: 17,
    hook: "Over 696K Gamers Just Discovered This Gaming Secret",
    firstTweet: "Over 696K Gamers Just Discovered This Gaming Secret\n\nNearly 400,000 people have already joined this new network where you make money while playing games.\n\nInstead of paying $15 a month for cloud gaming, you're getting paid to play.\n\nYour gaming PC that sits idle most of the day? It's now earning you money while you play AAA games on your phone with zero lag.\n\nThis peer-to-peer network is already working for thousands of gamers. They're getting ready to launch their token soon.\n\nBut here's why you should pay attention\n\n@playonshaga @SuperteamEarn",
  },
  {
    id: 8,
    link: "https://x.com/cryptoduke01/status/1947137430844211394",
    image: "/thread-images/thread-8.jpg",
    date: "Mon, 21 Jul 2025 03:31:54 GMT",
    likes: 17,
    comments: 9,
    bookmarks: 0,
    hook: "600 Million Indians Still Lack Internet Access!",
    firstTweet: "600 Million Indians Still Lack Internet Access!\n\nHalf of India still can't get online in 2025.\n\nBut the solution isn't coming from Google or Meta. It's coming from BONK (the dog meme coin).\n\nHere's how @DabbaNetwork is using Solana's viral meme to connect half a billion people",
  },
  {
    id: 9,
    link: "https://x.com/cryptoduke01/status/1949437873544892464",
    image: "/thread-images/thread-9.jpg",
    date: "Sun, 27 Jul 2025 11:53:02 GMT",
    likes: 72,
    comments: 29,
    bookmarks: 7,
    hook: "Why You're Losing Money on Bridges and How to Solve It",
    firstTweet: "Why You're Losing Money on Bridges and How to Solve It\n\nCross-chain bridging costs you more than it should.\n\nTraditional bridges lock funds for minutes, charge fees of $5-20, and involve complex processes, causing users to abandon transactions.\n\nThis separation kills user experience and limits DeFi growth.\n\nHowever, here's how @AcrossProtocol changes everything by providing a 2-second bridging solution for under $1, along with an intent-based system for instant fulfillment.\n\n#WWF @scribble_dao",
  },
  {
    id: 10,
    link: "https://x.com/cryptoduke01/status/1962664781212451044",
    image: "/thread-images/thread-10.jpg",
    date: "Mon, 01 Sep 2025 23:52:03 GMT",
    likes: 155,
    comments: 48,
    bookmarks: 38,
    hook: "I Nearly Abandoned My Solana Project",
    firstTweet: "I nearly abandoned my Solana project last month due to constant node failures.\n\nI began to doubt my development abilities entirely.\n\nThen I discovered this tool that changed everything and saved my project.\n\nHere's my complete experience",
  },
  {
    id: 11,
    link: "https://x.com/cryptoduke01/status/1965230358967804097",
    image: "/thread-images/thread-11.jpg",
    date: "Tue, 09 Sep 2025 01:46:44 GMT",
    likes: 111,
    comments: 52,
    bookmarks: 14,
    hook: "I Built A Solana DApp in 5 Minutes",
    firstTweet: "I Built A Solana DApp in 5 Minutes\n\nMonths ago, I bookmarked 47 tutorials on Solana development but never opened one.\n\nLast week, I typed a sentence to AI and watched my idea become a live dApp without a line of code.\n\nHere's how I was able to do it with a very simple tool",
  },
  {
    id: 12,
    link: "https://x.com/cryptoduke01/status/1969100752590164360",
    image: "/thread-images/thread-12.jpg",
    date: "Fri, 19 Sep 2025 18:06:18 GMT",
    likes: 85,
    comments: 54,
    bookmarks: 7,
    hook: "89% of Bitcoin is Sitting Idle",
    firstTweet: "Did you know that 89% of Bitcoin is sitting idle, while the $150B stablecoin market ignores it?\n\n$1.2T Bitcoin is also locked because holders won't trust custodians or bridges\n\nStablecoins keep dominating DeFi with zero Bitcoin backing\n\nHere's how @Ducatstable is changing that",
  },
  {
    id: 13,
    link: "https://x.com/cryptoduke01/status/1975197136661975101",
    image: "/thread-images/thread-13.jpg",
    date: "Mon, 06 Oct 2025 13:51:09 GMT",
    likes: 77,
    comments: 46,
    bookmarks: 3,
    hook: "¡El Hackathon Cypherpunk ya está disponible!",
    firstTweet: "¡El Hackathon Cypherpunk ya está disponible!\n\nEsta es tu oportunidad de crear algo real en Solana.\n\nProductos que la gente usará, no solo código basura en GitHub.\n\nTienes hasta el 30 de octubre para hacer realidad tu idea.",
  },
  {
    id: 14,
    link: "https://x.com/cryptoduke01/status/1978997645629661537",
    image: "/thread-images/thread-14.jpg",
    date: "Fri, 17 Oct 2025 01:33:01 GMT",
    likes: 89,
    comments: 14,
    bookmarks: 18,
    hook: "This Solana DEX Trades Faster Than Most CEXS",
    firstTweet: "Most centralized exchanges offer fast trading but poses risks and custody loss.\n\nDecentralized exchanges are usually slower with higher slippage.\n\nBut a new Solana-based DEX solved this by ensuring fast order execution while giving users full control over their wallets.",
  },
  {
    id: 15,
    link: "https://x.com/cryptoduke01/status/1981172563578421600",
    image: "/thread-images/thread-15.png",
    date: "Thu, 23 Oct 2025 01:35:22 GMT",
    likes: 44,
    comments: 10,
    bookmarks: 4,
    hook: "Carrot - The Yield Aggregator Transforming Solana Stablecoins",
    firstTweet: "Your stablecoins sit idle, earning nothing, or you're jumping between five protocols chasing yields that disappear overnight.\n\nThe smarter way to farm on Solana is here, and @DeFiCarrot is automating the entire process.\n\nJust wrote a complete breakdown of how this yield aggregator automates returns across the biggest protocols on Solana.\n\nRead here: ↓\nhttps://t.co/e7o2D3xUVt",
  },
  {
    id: 16,
    link: "https://x.com/cryptoduke01/status/1988432633643016570",
    image: "/thread-images/thread-16.jpg",
    date: "Wed, 12 Nov 2025 02:24:17 GMT",
    likes: 37,
    comments: 8,
    bookmarks: 3,
    hook: "A Solana DEX Offering Better Pricing Than Binance",
    firstTweet: "A decentralized exchange is now offering better pricing than Binance on major trading pairs, processing $1.7 billion yesterday and surpassing many tier-two exchanges with narrower price gaps.\n\nHowever, the developments on Solana are impossible to overlook and here's the turnout",
  },
  {
    id: 17,
    link: "https://x.com/cryptoduke01/status/1991319820802093467",
    image: "/thread-images/thread-17.jpg",
    date: "Thu, 20 Nov 2025 01:36:56 GMT",
    likes: 142,
    comments: 40,
    bookmarks: 11,
    hook: "My Friends Gamble And I Get Paid For It",
    firstTweet: "My friends gamble, but I figured out how to get paid for it.\n\nEvery time they deposit or place a bet, a percentage is deposited into my wallet, and I'm not even gambling or risking anything.\n\nI'm just watching my earnings continue to grow, and let me show you how ↓",
  },
  {
    id: 18,
    link: "https://x.com/cryptoduke01/status/1996666291831427407",
    image: "/thread-images/thread-18.jpg",
    date: "N/A (Fetch failed)",
    likes: 0,
    comments: 0,
    bookmarks: 0,
    hook: "Earn 70% APR on Solana Without Wallets or Gas",
    firstTweet: "You can now earn up to 70% APR on Solana without setting up wallets, buying gas, and signing transactions.\n\nBybit just removed all of that now with the yield system where you stake once and everything is handled on-chain and you collect the yields.\n\nHere's how it works.",
  },
  {
    id: 19,
    link: "https://x.com/cryptoduke01/status/1995683911930896651",
    image: "/thread-images/thread-19.jpg",
    date: "Tue, 02 Dec 2025 02:38:17 GMT",
    likes: 38,
    comments: 7,
    bookmarks: 3,
    hook: "Black Friday For Web3 Developers is Finally Here",
    firstTweet: "Black Friday is special for builders because while buyers hunt for gadget discounts, smart developers are locking in deals for their 2026 projects.\n\nIf you're changing RPC providers or starting a new project, act fast as GetBlock's biggest sale ends December 2nd.\n\nWhat to note",
  },
  {
    id: 20,
    link: "https://x.com/cryptoduke01/status/1994812297144144295",
    image: "/thread-images/thread-20.jpg",
    date: "Sat, 29 Nov 2025 16:54:48 GMT",
    likes: 60,
    comments: 21,
    bookmarks: 7,
    hook: "Polymarket Made Billions But Users Made Pennies",
    firstTweet: "The 2024 election cycle saw over $20 billion flow through prediction markets, yet some people who made the actual predictions barely made any money.\n\nBut a prediction market on Solana wants you to actually get paid with leverage when you're right, and here's how it's unfolding.",
  },
  {
    id: 21,
    link: "https://x.com/cryptoduke01/status/1978491986848972982",
    image: "/thread-images/thread-21.png",
    date: "Wed, 15 Oct 2025 16:03:42 GMT",
    likes: 45,
    comments: 9,
    bookmarks: 9,
    hook: "Comprehensive Guide on @ArciumHQ",
    firstTweet: "Comprehensive Guide on @ArciumHQ\n\nArcium is an encrypted supercomputer on Solana.\n\nIt lets apps run computations on fully encrypted data and your data never gets exposed.\n\nThe Phase 2 Testnet is live and here's everything you need to start contributing.",
  },
  {
    id: 22,
    link: "https://x.com/cryptoduke01/status/1961481893976633737",
    image: "/thread-images/thread-22.jpg",
    date: "Fri, 29 Aug 2025 17:31:40 GMT",
    likes: 28,
    comments: 2,
    bookmarks: 0,
    hook: "ChatGPT is Speaking With Stolen Words",
    firstTweet: "Every time you use ChatGPT, it's speaking with stolen words?\n\nAI models rely on unpaid creativity, while companies report record profits without compensating these creators.\n\nBut pay attention to @campnetworkxyz and what they're doing to change this.",
  },
  {
    id: 23,
    link: "https://x.com/cryptoduke01/status/1954255301701485025",
    image: "/thread-images/thread-23.jpg",
    date: "Sat, 09 Aug 2025 18:55:46 GMT",
    likes: 135,
    comments: 61,
    bookmarks: 15,
    hook: "How I Went From Losing $2K to 250% Gains in 3 Weeks",
    firstTweet: "How I Went From Losing $2K to 250% Gains in 3 Weeks\n\nThree weeks ago, I was down $2K chasing random meme trades and fake KOL calls.\n\nNow, I'm up 250% weekly, thanks to a shift in strategy I took with this tool.\n\nHere's how this trade transformation was possible with @snapx_co",
  },
  {
    id: 24,
    link: "https://x.com/cryptoduke01/status/1947253269115384209",
    image: "/thread-images/thread-24.jpg",
    date: "Mon, 21 Jul 2025 11:12:12 GMT",
    likes: 12,
    comments: 1,
    bookmarks: 1,
    hook: "Allora Network Simplified",
    firstTweet: "Allora Network Simplified\n\nWhat Is Allora Network?\n\nThink of it as a global brain where thousands of AI models work together to make better predictions than any single AI could make alone.\n\nAllora is simply a self-improving, decentralized AI network that harnesses community-built machine learning models for highly accurate, context-aware predictions.",
  },
  {
    id: 25,
    link: "https://x.com/cryptoduke01/status/1915826173839388768",
    image: "/thread-images/thread-25.jpg",
    date: "Fri, 25 Apr 2025 17:52:08 GMT",
    likes: 89,
    comments: 17,
    bookmarks: 4,
    hook: "Solana Chain Analysis Dashboard",
    firstTweet: "I spent quite a number of days researching and analyzing transactions on the Solana Chain.\n\nSo, to simplify which sectors are driving the most real economic value and what this signals for Solana's future, I hard-coded these dashboards using on-chain data as of April 2025.",
  },
  {
    id: 26,
    link: "https://x.com/cryptoduke01/status/1821891690094837826",
    image: "/thread-images/thread-26.jpg",
    date: "Fri, 09 Aug 2024 12:50:02 GMT",
    likes: 13,
    comments: 4,
    bookmarks: 0,
    hook: "𝗜 𝗝𝘂𝘀𝘁 𝗚𝗼𝘁 𝗧𝗵𝗲 𝗣𝗲𝗿𝗳𝗲𝗰𝘁 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻 𝗧𝗼 𝗘𝗻𝗵𝗮𝗻𝗰𝗲 𝗬𝗼𝘂𝗿 𝗖𝗿𝘆𝗽𝘁𝗼 𝗥𝗲𝘀𝗲𝗮𝗿𝗰𝗵!",
    firstTweet: "𝗜 𝗝𝘂𝘀𝘁 𝗚𝗼𝘁 𝗧𝗵𝗲 𝗣𝗲𝗿𝗳𝗲𝗰𝘁 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻 𝗧𝗼 𝗘𝗻𝗵𝗮𝗻𝗰𝗲 𝗬𝗼𝘂𝗿 𝗖𝗿𝘆𝗽𝘁𝗼 𝗥𝗲𝘀𝗲𝗮𝗿𝗰𝗵!\n\nHave you ever lost sleep over crypto research?\nEndless Scrolling and all that, I've been there too!\n\nBut I finally found a game changer. @Filter_AI A",
  },
  {
    id: 27,
    link: "https://x.com/cryptoduke01/status/1820933036000616525",
    image: "/thread-images/thread-27.png",
    date: "Tue, 06 Aug 2024 21:20:41 GMT",
    likes: 13,
    comments: 3,
    bookmarks: 1,
    hook: "Physical Assets on the Blockchain",
    firstTweet: "This interesting project is opening up the possibilities of how physical assets could be made part of the blockchain.\n\nWhat about acquiring just a piece of the Eiffel Tower, or swapping a Picasso on stock through an Smartphone?\n\n@sailingprotocol is here for you\n\nLike & Retweet",
  },
];

// Sort threads by date (most recent first)
const threads = threadsData
  .map((thread) => ({
    ...thread,
    title: thread.hook,
    preview: thread.firstTweet.split("\n").slice(0, 3).join(" ") + "...",
    content: thread.firstTweet,
    date: formatDate(thread.date),
    dateRaw: thread.date,
    likes: thread.likes,
    comments: thread.comments,
    bookmarks: thread.bookmarks,
    sortDate: parseDate(thread.date),
  }))
  .sort((a, b) => b.sortDate - a.sortDate)
  .map(({ sortDate, ...thread }) => thread);

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
  image?: string;
  likes?: number;
  comments?: number;
  bookmarks?: number;
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
            { label: "threads written", value: "27" },
            { label: "total engagement", value: "100k+" },
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
              <motion.div
                key={thread.id}
                onClick={() => setSelectedContent(thread)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -5 }}
                className="group block overflow-hidden glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300 cursor-pointer"
              >
                {/* Thread Image - handles both landscape and portrait */}
                {thread.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-[#0a0a0a]">
                    <Image
                      src={thread.image}
                      alt={thread.title}
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
                          {thread.date}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedContent(thread);
                      }}
                      className="text-xs text-[#00FFD1] font-[family-name:var(--font-display)] lowercase opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      read
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors line-clamp-2">
                    {thread.title}
                  </h3>

                  <p className="text-sm text-[#666] mb-4 font-[family-name:var(--font-display)] leading-relaxed line-clamp-2">
                    {thread.preview}
                  </p>

                  {/* Engagement Metrics with Icons and Excerpt Link */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[#00FFD1]">
                        <Heart size={12} />
                        <span className="text-xs font-[family-name:var(--font-display)]">
                          {thread.likes}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#00FFD1]">
                        <MessageCircle size={12} />
                        <span className="text-xs font-[family-name:var(--font-display)]">
                          {thread.comments}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#00FFD1]">
                        <Bookmark size={12} />
                        <span className="text-xs font-[family-name:var(--font-display)]">
                          {thread.bookmarks}
                        </span>
                      </div>
                    </div>
                    
                    {/* Read Excerpt Link - Opens Modal */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedContent(thread);
                      }}
                      className="text-xs text-[#666] hover:text-[#00FFD1] font-[family-name:var(--font-display)] transition-colors"
                    >
                      read excerpt
                    </button>
                  </div>
                </div>
              </motion.div>
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
              {/* Thread Image */}
              {selectedContent.image && (
                <div className="relative w-full h-64 overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={selectedContent.image}
                    alt={selectedContent.title}
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
                        {selectedContent.date}
                      </span>
                    </div>
                    {'likes' in selectedContent && (
                      <>
                        <div className="flex items-center gap-1.5 text-[#00FFD1]">
                          <Heart size={12} />
                          <span className="text-xs font-[family-name:var(--font-display)]">
                            {selectedContent.likes}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#00FFD1]">
                          <MessageCircle size={12} />
                          <span className="text-xs font-[family-name:var(--font-display)]">
                            {selectedContent.comments}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#00FFD1]">
                          <Bookmark size={12} />
                          <span className="text-xs font-[family-name:var(--font-display)]">
                            {selectedContent.bookmarks}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
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
                <div className="text-[#999] font-[family-name:var(--font-display)] text-sm leading-relaxed whitespace-pre-line">
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
