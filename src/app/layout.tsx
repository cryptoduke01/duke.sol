import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "duke.sol",
  description:
    "frontend developer. web3 builder. core member at superteam nigeria.",
  keywords: [
    "Web3",
    "Frontend Developer",
    "Blockchain",
    "Solana",
    "React",
    "Next.js",
    "Superteam Nigeria",
  ],
  authors: [{ name: "duke.sol", url: "https://x.com/cryptoduke01" }],
  openGraph: {
    title: "duke.sol",
    description:
      "frontend developer. web3 builder. core member at superteam nigeria.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "duke.sol",
    description:
      "frontend developer. web3 builder. core member at superteam nigeria.",
    creator: "@cryptoduke01",
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
        className={`${outfit.variable} ${spaceMono.variable} antialiased bg-black text-[#e0e0e0] scanlines noise cursor-none`}
      >
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
