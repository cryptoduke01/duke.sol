import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://duke.sol"),
  title: {
    default: "duke.sol | Frontend & Web3 Developer",
    template: "%s | duke.sol",
  },
  description:
    "Frontend developer crafting interfaces for Web3 products. Core member at Superteam Nigeria. Building the future of Web3 on Solana.",
  keywords: [
    "duke.sol",
    "Web3 Developer",
    "Frontend Developer",
    "Blockchain Developer",
    "Solana Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web3",
    "Blockchain",
    "Solana",
    "Superteam Nigeria",
    "13x Bounty Winner",
    "Top 1% Solana",
  ],
  authors: [{ name: "duke.sol", url: "https://x.com/cryptoduke01" }],
  creator: "duke.sol",
  publisher: "duke.sol",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://duke.sol",
    siteName: "duke.sol",
    title: "duke.sol | Frontend & Web3 Developer",
    description:
      "Frontend developer crafting interfaces for Web3 products. Core member at Superteam Nigeria. Building the future of Web3 on Solana.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "duke.sol - Frontend & Web3 Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "duke.sol | Frontend & Web3 Developer",
    description:
      "Frontend developer crafting interfaces for Web3 products. Core member at Superteam Nigeria.",
    creator: "@cryptoduke01",
    site: "@cryptoduke01",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://duke.sol",
  },
  category: "technology",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "duke.sol",
  },
  other: {
    "msapplication-TileColor": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased bg-black text-[#e0e0e0] scanlines noise`}
      >
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
