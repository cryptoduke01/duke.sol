"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "work", href: "#work" },
  { name: "content", href: "/content" },
  { name: "contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg md:text-xl font-semibold tracking-tight font-[family-name:var(--font-display)]">
                <span className="text-white">duke</span>
                <span className="text-[#00FFD1]">.sol</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00FFD1] group-hover:w-full transition-all duration-300" />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link, i) => {
                const isExternal = link.href.startsWith("#");
                const Component = isExternal ? "a" : Link;
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <Component
                      href={link.href}
                      className="relative text-xs md:text-sm font-medium text-[#666] hover:text-white transition-colors duration-300 font-[family-name:var(--font-display)] tracking-wide link-line lowercase"
                    >
                      {link.name}
                    </Component>
                  </motion.div>
                );
              })}
              
              <motion.a
                href="https://x.com/cryptoduke01"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 md:px-5 py-2 md:py-2.5 glass border border-[#00FFD1]/30 text-[#00FFD1] text-xs md:text-sm font-medium font-[family-name:var(--font-display)] hover:bg-[#00FFD1]/10 hover:border-[#00FFD1]/50 transition-all duration-300 lowercase"
              >
                x
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="w-6 h-[1px] bg-white"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 4 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-[1px] bg-white"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-[1px] bg-white"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -4 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-full glass-strong p-6 sm:p-8 pt-24 sm:pt-28"
            >
              <div className="flex flex-col gap-6 sm:gap-8">
                {navLinks.map((link, i) => {
                  const isExternal = link.href.startsWith("#");
                  const Component = isExternal ? "a" : Link;
                  
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Component
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl sm:text-3xl font-semibold text-white hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase block"
                      >
                        {link.name}
                      </Component>
                    </motion.div>
                  );
                })}
                <motion.a
                  href="https://x.com/cryptoduke01"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 sm:mt-8 inline-block px-6 py-3 glass border border-[#00FFD1]/30 text-[#00FFD1] text-center font-[family-name:var(--font-display)] hover:bg-[#00FFD1]/10 transition-all lowercase"
                >
                  x
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
