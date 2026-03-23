"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, X, ArrowLeft, Download, FileText, Pen, Calendar, Heart, MessageCircle, Bookmark, Twitter, Github, Linkedin } from "lucide-react";
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
  {
    id: 28,
    link: "https://x.com/cryptoduke01/status/2014922175430459794?s=20",
    image: "https://pbs.twimg.com/media/G_ZxCH0WEAAXbDj?format=jpg&name=medium",
    date: "Sat, 07 Feb 2026 12:00:00 GMT",
    likes: 0,
    comments: 0,
    bookmarks: 0,
    hook: "$3K Up For Grabs For Designers",
    firstTweet: "Superteam Brasil just launched a design bounty, offering a reward to find the best talent.\n\nIf you can use Figma and ship fast, this is your chance to get paid while building for one of the fastest-growing Solana communities.\n\nHere's the rundown of everything you need to know.🔻",
  },
  {
    id: 29,
    link: "https://x.com/cryptoduke01/status/1999961262084743631?s=20",
    image: "https://pbs.twimg.com/media/G8E5yeDW4AAeafB?format=jpg&name=medium",
    date: "Thu, 05 Dec 2025 12:00:00 GMT",
    likes: 0,
    comments: 0,
    bookmarks: 0,
    hook: "Traders Lose $149M Monthly To One Problem",
    firstTweet: "85% of prediction market traders lose money, mostly due to timing, not poor bets.\n\nBy the time you notice a price shift on Polymarket, others have acted on it hours earlier, leading to a $27.9B annual loss in missed chances.\n\nBut here's a @SuperteamDE project tackling this🔻",
  },
];

// Article sections: containers you fill as you write. Add items to each section's array.
type ArticleCategory = "substack" | "x" | "medium" | "document";

type ArticleItem = {
  id: number | string;
  title: string;
  preview?: string;
  content?: string;
  date?: string;
  readTime?: string;
  link?: string;
  embedUrl?: string;
  /** Banner image URL (external). Rendered with a small bottom shadow. */
  banner?: string;
  /** Substack post embed HTML (div only). Script is loaded in modal. */
  embedHtml?: string;
};

type ArticleSectionConfig = {
  id: ArticleCategory;
  label: string;
  items: ArticleItem[];
};

const SUBSTACK_EMBED_URL = "https://dukesol.substack.com/embed";
const REQUEST_ACCESS_EMAIL = "thepublicdesigner@gmail.com";
const PROFILE_IMAGE = "/mypfp.jpg";

// Substack logo SVG (S mark)
function SubstackLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

// X (Twitter) logo SVG
function XLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Medium logo SVG
function MediumLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.2-2.58-1.2-5.75s.54-5.75 1.2-5.75c.66 0 1.19 2.58 1.19 5.75z" />
    </svg>
  );
}

const ARTICLE_VIEW_LINKS: Record<ArticleCategory, string> = {
  substack: "https://dukesol.substack.com/",
  x: "https://x.com/cryptoduke01",
  medium: "https://medium.com/@cryptoduke1/",
  document: "#",
};

const articleSections: ArticleSectionConfig[] = [
  {
    id: "substack",
    label: "Substack",
    items: [
      {
        id: "substack-1",
        title: "Building a Trading Analytics Dashboard for Deriverse",
        preview:
          "I had a problem that probably sounds familiar if you trade on-chain: I had no idea how I was actually performing on Deriverse. Sure, I could see individual trades execute, but what about my total PnL, my win rate, which trading sessions were profitable, and how much I was paying in fees? The platform didn't have a dedicated analytics view, and I wasn't about to manually track everything in a spreadsheet. So I built my own dashboard, live data from my wallet, decoded from the chain, with every metric I actually care about. This is how I did it.",
        link: "https://open.substack.com/pub/dukesol/p/building-a-trading-analytics-dashboard?utm_campaign=post-expanded-share&utm_medium=post%20viewer",
        embedHtml:
          '<div class="substack-post-embed"><p lang="en">Building a Trading Analytics Dashboard for Deriverse by duke.sol</p><p>How I built a full-stack trading journal that pulls live data from the Solana blockchain and transforms it into actionable trading insights.</p><a data-post-link href="https://dukesol.substack.com/p/building-a-trading-analytics-dashboard">Read on Substack</a></div>',
      },
    ],
  },
  {
    id: "x",
    label: "X Articles",
    items: [
      {
        id: "x-1",
        title: "The Privacy Crisis Killing Crypto Adoption",
        preview:
          "You wouldn't tape your bank statement to your front door, so why are you doing exactly that every time you use crypto? The Glass House Problem — You're buying lunch from a food store that accepts crypto payments, and you scan the QR code and send $12 in USDC. To you, that was a straightforward transaction, but here's what just happened:",
        link: "https://x.com/cryptoduke01/status/2017947282839065078?s=20",
        banner: "https://pbs.twimg.com/media/HACQ_f2XcAAjIbx?format=jpg&name=medium",
      },
      {
        id: "x-2",
        title: "x402 on Solana: The Micropayments Standard",
        preview: "Exploring the micropayments standard on Solana and how x402 is changing the game.",
        link: "https://x.com/cryptoduke01",
        banner: "https://pbs.twimg.com/media/G-EiJIbXEAAnVAi?format=jpg&name=medium",
      },
    ],
  },
  {
    id: "medium",
    label: "Medium Article",
    items: [
      {
        id: "medium-1",
        title: "Overdrive by Prediction Index: Real-Time Intelligence and Prediction Markets on Solana",
        preview:
          "Prediction markets exploded in 2025. Combined trading volumes across platforms hit $7.4 billion in October alone, with Polymarket processing $3.02 billion and Kalshi recording $4.4 billion, and these aren't gambling sites. They're sophisticated forecasting engines where users bet real money on election outcomes, sports results, economic indicators, and tech developments. But here's the catch:",
        link: "https://medium.com/@cryptoduke1/overdrive-by-prediction-index-real-time-intelligence-and-prediction-markets-on-solana-d43780cf01c8",
        banner: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*V_9F2FndTbsoa3p8b078zw.jpeg",
      },
      {
        id: "medium-2",
        title: "Stop Losing Yields, The Smarter Way to Farm on Solana is Here",
        preview:
          "Your stablecoins sit idle, earning nothing, or you're jumping between five protocols chasing yields that disappear overnight. The smarter way to farm on Solana is here, and Carrot is automating the entire process. This piece covers how Solana's leading yield aggregator is turning passive stables into productive capital.",
        link: "https://medium.com/@cryptoduke1/stop-losing-yields-the-smarter-way-to-farm-on-solana-is-here-8a6f1876f85d",
        banner: "https://miro.medium.com/v2/resize:fit:1350/format:webp/1*vi-jDG60d5De6NOoUpQDpg.png",
      },
      {
        id: "medium-3",
        title: "Finternet's Potential In Nigeria's Digital Economy",
        preview:
          "It's so sad that Nigeria is exclusive or not being part of formal financial services in as much as they have a large economy and population which makes them stand at a better chance in the digitalization path. Why is this so? Just the \"normal\" problems we face everyday, high costs, under development in areas, infrastructures not strong enough. This gets more saddening because we have a very vibrant fintech sector and young highly tech-inclined population.",
        link: "https://medium.com/@cryptoduke1/finternets-potential-in-nigeria-s-digital-economy-d51d84aaf376",
        banner: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mCCDN3PIrisELRwf9_uqZQ.png",
      },
      {
        id: "medium-4",
        title: "Who Will Create the Key Data Needed to Make Solana's AI Better?",
        preview:
          "AI Models trained on poor data are destined for failure! I struggled with AI models, which sometimes failed to deliver results, until I learned about the significance of high-quality data. This may be why your AI assistant is underperforming without you even realizing it! The issue isn't with the model, whether it's ChatGPT, Grok, or Deepseek; it's all about the data. Here's how everything is changing;",
        link: "https://medium.com/@cryptoduke1/who-will-create-the-key-data-needed-to-make-solanas-ai-better-1ff7b8d2a40a",
        banner: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7fEkqedN2O_3e9v3kebkuw.jpeg",
      },
    ],
  },
  { id: "document", label: "Document (Restricted Access)", items: [] },
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
  category?: ArticleCategory;
  embedUrl?: string;
};

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<"threads" | "articles" | "resume">("threads");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [selectedArticleSection, setSelectedArticleSection] = useState<ArticleCategory | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [threadsDataState, setThreadsDataState] = useState(threadsData);
  const [articleSectionsState, setArticleSectionsState] = useState(articleSections);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("/api/content/threads")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setThreadsDataState(data);
      })
      .catch(() => {});
    fetch("/api/content/articles")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setArticleSectionsState(data);
      })
      .catch(() => {});
  }, []);

  const threads = useMemo(
    () =>
      threadsDataState
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
        .map(({ sortDate, ...thread }) => thread),
    [threadsDataState]
  );

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
              <span className="text-xs text-[#666] font-[family-name:var(--font-display)]">Loading</span>
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
              <span className="text-sm font-[family-name:var(--font-display)]">Back</span>
            </Link>

            <span className="text-xl font-semibold tracking-tight font-[family-name:var(--font-display)]">
              <span className="text-white">duke</span>
              <span className="text-[#00FFD1]">.sol</span>
            </span>

            <a
              href="https://x.com/cryptoduke01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 glass border border-[#00FFD1]/30 text-[#00FFD1] text-sm font-[family-name:var(--font-display)] hover:bg-[#00FFD1]/10 transition-all"
            >
              X
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
            <span className="text-sm font-medium text-[#00FFD1] tracking-[0.3em] font-[family-name:var(--font-display)]">
              Content
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white font-[family-name:var(--font-display)] mb-4">
            Threads & Articles
          </h1>
          <p className="text-[#666] max-w-lg font-[family-name:var(--font-display)] text-sm">
            Sharing knowledge about Web3, blockchain technology, and the Solana ecosystem through educational content.
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
            { label: "threads written", value: "29" },
            { label: "total engagement", value: "120k+" },
            { label: "bounties won", value: "13x" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold text-[#00FFD1] font-[family-name:var(--font-display)]">
                {stat.value}
              </div>
              <div className="text-xs text-[#666] font-[family-name:var(--font-display)]">
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
              className={`px-6 py-3 text-sm font-medium font-[family-name:var(--font-display)] transition-all duration-300 ${
                tab.id === "resume" && activeTab === "resume"
                  ? "bg-[#222] text-[#666] border border-[#1a1a1a] cursor-default"
                  : activeTab === tab.id
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
                      className="text-xs text-[#00FFD1] font-[family-name:var(--font-display)] opacity-0 group-hover:opacity-100 transition-opacity"
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

        {/* Articles Tab — 3 per row, 4th below; longer cards; spaced out; buttons in line, pointer cursor */}
        {activeTab === "articles" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {articleSectionsState.map((section, i) => {
              const isDocument = section.id === "document";
              const viewHref = ARTICLE_VIEW_LINKS[section.id];
              const viewLabel =
                section.id === "substack"
                  ? "View on Substack"
                  : section.id === "x"
                    ? "View on X"
                    : section.id === "medium"
                      ? "View on Medium"
                      : null;
              const logoDefaultColor =
                section.id === "substack"
                  ? "text-[#FF6719]"
                  : section.id === "x"
                    ? "text-white"
                    : section.id === "medium"
                      ? "text-white"
                      : "text-[#666]";
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`group rounded border overflow-hidden glass border-[#1a1a1a] flex flex-col min-h-[280px] ${
                    isDocument ? "opacity-90" : "hover:border-[#00FFD1]/50"
                  } transition-all duration-300`}
                >
                  {/* Top: logo (left, drop-cap style) + profile pic circle (right) */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <div
                      className={`w-24 h-24 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:grayscale ${logoDefaultColor}`}
                    >
                      {section.id === "substack" && <SubstackLogoIcon className="w-14 h-14" />}
                      {section.id === "x" && <XLogoIcon className="w-14 h-14" />}
                      {section.id === "medium" && <MediumLogoIcon className="w-14 h-14" />}
                      {section.id === "document" && <FileText className="w-14 h-14" />}
                    </div>
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-[#0a0a0a] shrink-0 shadow-[0_3px_6px_rgba(0,0,0,0.35)] ring-1 ring-[#1a1a1a]">
                      <Image
                        src={PROFILE_IMAGE}
                        alt=""
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Bottom: actions in line, not full width, no radius, pointer */}
                  <div className="mt-auto p-6 pt-4 flex flex-wrap items-center gap-3">
                    {isDocument ? (
                      <a
                        href={`mailto:${REQUEST_ACCESS_EMAIL}?subject=Document access request`}
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer inline-flex items-center justify-center gap-2 py-2 px-4 rounded-none border border-[#00FFD1]/40 text-[#00FFD1] text-xs font-medium font-[family-name:var(--font-display)] hover:bg-[#00FFD1]/10 transition-colors"
                      >
                        Request access
                        <ArrowUpRight size={12} />
                      </a>
                    ) : (
                      <>
                        <a
                          href={viewHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-pointer inline-flex items-center justify-center gap-2 py-2 px-4 rounded-none border border-[#1a1a1a] text-[#999] text-xs font-medium font-[family-name:var(--font-display)] hover:border-[#00FFD1]/30 hover:text-[#00FFD1] transition-colors"
                        >
                          {viewLabel}
                        </a>
                        <button
                          type="button"
                          onClick={() => setSelectedArticleSection(section.id)}
                          className="cursor-pointer inline-flex items-center justify-center gap-2 py-2 px-4 rounded-none bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] text-xs font-medium font-[family-name:var(--font-display)] hover:bg-[#00FFD1]/20 transition-colors"
                        >
                          {section.id === "substack"
                            ? "Click to open Substack articles"
                            : section.id === "x"
                              ? "Click to open X articles"
                              : "Click to open Medium articles"}
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Resume Tab - Disabled */}
        {activeTab === "resume" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl"
          >
            <div className="rounded-xl glass border border-[#1a1a1a] p-10 text-center opacity-70 pointer-events-none select-none">
              <p className="text-[#888] font-[family-name:var(--font-display)]">
                We will resume later.
              </p>
            </div>
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
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col glass border border-[#1a1a1a]"
            >
              {/* Thread Image */}
              {selectedContent.image && (
                <div className="relative w-full h-64 flex-shrink-0 overflow-hidden bg-[#0a0a0a]">
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
              <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a] flex-shrink-0">
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
                  className="p-2 text-[#666] hover:text-white transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body - Scrollable (threads only) */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                <div className="text-[#999] font-[family-name:var(--font-display)] text-sm leading-relaxed whitespace-pre-line">
                  {selectedContent.content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#1a1a1a] flex-shrink-0">
                <a
                  href={selectedContent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FFD1] text-black font-semibold text-sm font-[family-name:var(--font-display)] hover:bg-[#00e6bc] transition-all"
                >
                  Read Full Thread on X
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article section modal — cards for Substack / X / Medium / Document */}
      <AnimatePresence>
        {selectedArticleSection !== null && (() => {
          const section = articleSectionsState.find((s) => s.id === selectedArticleSection);
          if (!section) return null;
          const isDocument = section.id === "document";
          const isSubstack = section.id === "substack";
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setSelectedArticleSection(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col glass border border-[#1a1a1a] rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a] flex-shrink-0">
                  <h2 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
                    {section.label}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setSelectedArticleSection(null)}
                    className="p-2 text-[#666] hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 min-h-0">
                  {section.items.length > 0 ? (
                    <div className={`grid gap-4 ${isDocument ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
                      {section.items.map((item) =>
                        isDocument ? (
                          <div
                            key={item.id}
                            className="flex flex-col p-5 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a]/50 opacity-80 cursor-not-allowed select-none"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs text-[#666] font-[family-name:var(--font-display)]">
                                {item.readTime ?? "—"}
                              </span>
                            </div>
                            <h4 className="text-base font-semibold text-[#666] font-[family-name:var(--font-display)] mb-2 line-clamp-2">
                              {item.title}
                            </h4>
                            {item.preview && (
                              <p className="text-xs text-[#555] font-[family-name:var(--font-display)] line-clamp-2 mb-4 flex-1">
                                {item.preview}
                              </p>
                            )}
                            <a
                              href={`mailto:${REQUEST_ACCESS_EMAIL}?subject=Document access request: ${encodeURIComponent(item.title)}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 self-start px-4 py-2 text-xs font-medium text-[#00FFD1] font-[family-name:var(--font-display)] border border-[#00FFD1]/40 rounded hover:bg-[#00FFD1]/10 transition-colors cursor-pointer"
                            >
                              Request access
                              <ArrowUpRight size={12} />
                            </a>
                          </div>
                        ) : (
                          <a
                            key={item.id}
                            href={item.link ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-lg border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300 text-left overflow-hidden"
                          >
                            {item.banner && (
                              <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] overflow-hidden shadow-[0_6px_14px_rgba(0,0,0,0.4)]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={item.banner}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="p-5">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-[#666] font-[family-name:var(--font-display)]">
                                  {item.date ?? ""}
                                </span>
                                <span className="text-xs text-[#00FFD1] font-[family-name:var(--font-display)] opacity-0 group-hover:opacity-100 transition-opacity">
                                  read
                                </span>
                              </div>
                              <h4 className="text-base font-semibold text-white font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors line-clamp-2 mb-2">
                                {item.title}
                              </h4>
                              {item.preview && (
                                <p className="text-xs text-[#666] font-[family-name:var(--font-display)] line-clamp-3">
                                  {item.preview}
                                </p>
                              )}
                            </div>
                          </a>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-[#555] font-[family-name:var(--font-display)]">
                      {isSubstack
                        ? "Add Substack posts to the section array in code; they’ll appear as cards here."
                        : isDocument
                          ? "Add restricted documents to the section array; each will show as a disabled card with Request access."
                          : "No articles yet. Add entries to the section array in code as you write."}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
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
                    href="https://dukesol.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line group"
                  >
                    <span>substack</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/@cryptoduke1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line group"
                  >
                    <span>medium</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/cryptoduke01"
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
                  <a
                    href="/resume-dev.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line"
                  >
                    dev resume
                  </a>
                </li>
                <li>
                  <a
                    href="/resume-writing.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] link-line"
                  >
                    writing resume
                  </a>
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
