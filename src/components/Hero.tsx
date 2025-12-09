"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [location, setLocation] = useState("jos, nigeria");
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) return;
      
      setIsLocating(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state;
            const country = data.address?.country;
            if (city && country) {
              setLocation(`${city.toLowerCase()}, ${country.toLowerCase()}`);
            }
          } catch (error) {
            console.log("Geocoding failed, using default location");
          } finally {
            setIsLocating(false);
          }
        },
        () => {
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    };

    getLocation();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#00FFD1]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#FF006E]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFD1]" />
              </span>
              <span className="text-xs text-[#666] tracking-[0.15em] lowercase font-[family-name:var(--font-mono)]">
                available for work
              </span>
            </motion.div>

            {/* Main Statement */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-5 font-[family-name:var(--font-display)] lowercase"
            >
              <span className="text-[#00FFD1]">solana</span>
              <br />
              <span className="text-white">made me</span>
              <br />
              <span className="text-white">like this</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-[#666] max-w-sm mb-6 font-[family-name:var(--font-mono)] leading-relaxed lowercase"
            >
              frontend developer crafting interfaces for web3 products. core member{" "}
              <a 
                href="https://superteam.ng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00FFD1] hover:underline"
              >
                @superteamng
              </a>
            </motion.p>

            {/* Stats - only 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-6 mb-6"
            >
              <div>
                <div className="text-2xl font-semibold text-white font-[family-name:var(--font-display)] lowercase">
                  2k+
                </div>
                <div className="text-[10px] text-[#666] font-[family-name:var(--font-mono)] lowercase">
                  followers
                </div>
              </div>
              <div className="w-[1px] h-8 bg-[#1a1a1a]" />
              <div>
                <div className="text-2xl font-semibold text-white font-[family-name:var(--font-display)] lowercase">
                  top 1%
                </div>
                <div className="text-[10px] text-[#666] font-[family-name:var(--font-mono)] lowercase">
                  solana
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,255,209,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-[#00FFD1] text-black font-semibold text-sm font-[family-name:var(--font-mono)] hover:bg-[#00e6bc] transition-all lowercase"
              >
                get in touch
              </motion.a>
              <motion.a
                href="#work"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 glass border border-[#1a1a1a] text-white font-semibold text-sm font-[family-name:var(--font-mono)] hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all lowercase"
              >
                view work
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              {/* Outer ring */}
              <div className="absolute inset-0 -m-2 border border-[#00FFD1]/20 rounded-full pulse-ring" />
              
              {/* Main image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-glow group scratch-effect">
                <Image
                  src="/mypfp.jpg"
                  alt="duke.sol"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/10 via-transparent to-[#00FFD1]/5 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,255,209,0.03)_2px,rgba(0,255,209,0.03)_4px)] pointer-events-none" />
              </div>

              {/* 13x Bounty Winner floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -left-4 top-4 px-3 py-1.5 glass border border-[#00FFD1]/30 font-[family-name:var(--font-mono)] text-[10px] lowercase"
              >
                <span className="text-[#00FFD1]">13x</span>
                <span className="text-[#666]"> bounty winner</span>
              </motion.div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -right-2 top-1/3 px-2.5 py-1 glass font-[family-name:var(--font-mono)] text-[10px] lowercase"
              >
                <span className="text-[#666]">status: </span>
                <span className="text-[#00FFD1]">building</span>
              </motion.div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 glass font-[family-name:var(--font-mono)] text-[10px] whitespace-nowrap lowercase"
              >
                <span className="relative flex h-1.5 w-1.5">
                  {isLocating && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75" />}
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FFD1]" />
                </span>
                <span className="text-white">{location}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-[#666] tracking-[0.2em] lowercase font-[family-name:var(--font-mono)]">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-5 bg-gradient-to-b from-[#00FFD1] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
