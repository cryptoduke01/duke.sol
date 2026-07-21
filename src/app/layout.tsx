import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dukesol.vercel.app"),
  title: {
    default: "duke.sol | Solana Builder, Researcher & Writer",
    template: "%s | duke.sol",
  },
  description:
    "Consumer and infrastructure products, protocol and security research, and the threads and reports that make it useful to others. Solana builder since 2023, Core Member at Superteam Nigeria.",
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
    "14x Bounty Winner",
    "3x Hackathon Winner",
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
    url: "https://dukesol.vercel.app",
    siteName: "duke.sol",
    title: "duke.sol | Solana Builder, Researcher & Writer",
    description:
      "Consumer and infrastructure products, protocol and security research, and the threads and reports that make it useful to others.",
    images: [
      {
        url: "/mypfp.jpg",
        width: 1200,
        height: 630,
        alt: "duke.sol - Solana builder, researcher, and writer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "duke.sol | Solana Builder, Researcher & Writer",
    description:
      "Consumer and infrastructure products, protocol and security research, and the writing that makes it useful.",
    creator: "@cryptoduke01",
    site: "@cryptoduke01",
    images: ["/mypfp.jpg"],
  },
  icons: {
    icon: [{ url: "/mypfp.jpg" }],
    shortcut: ["/mypfp.jpg"],
    apple: [{ url: "/mypfp.jpg" }],
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
        className={`${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased bg-black text-[#e0e0e0] scanlines noise`}
      >
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
