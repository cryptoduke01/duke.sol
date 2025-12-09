"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Copy, Check, Twitter, MessageCircle, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const socials = [
  { name: "twitter", handle: "duke.sol", href: "https://x.com/cryptoduke01", icon: Twitter },
  { name: "telegram", handle: "duke.sol", href: "https://t.me/cryptoduke01", icon: MessageCircle },
  { name: "github", handle: "duke.sol", href: "https://github.com/cryptoduke01", icon: Github },
  { name: "linkedin", handle: "duke.sol", href: "https://www.linkedin.com/in/akachukwuu?originalSubdomain=ng", icon: Linkedin },
];

const footerLinks = [
  {
    title: "navigation",
    links: [
      { name: "home", href: "/" },
      { name: "work", href: "#work" },
      { name: "content", href: "/content" },
      { name: "contact", href: "#contact" },
    ],
  },
  {
    title: "socials",
    links: [
      { name: "twitter / x", href: "https://x.com/cryptoduke01", icon: Twitter },
      { name: "telegram", href: "https://t.me/cryptoduke01", icon: MessageCircle },
      { name: "github", href: "https://github.com/cryptoduke01", icon: Github },
      { name: "linkedin", href: "https://www.linkedin.com/in/akachukwuu?originalSubdomain=ng", icon: Linkedin },
    ],
  },
  {
    title: "resources",
    links: [
      { name: "dev resume", href: "/resume-dev.pdf" },
      { name: "writing resume", href: "/resume-writing.pdf" },
      { name: "superteam ng", href: "https://superteam.ng" },
      { name: "threads", href: "/content" },
    ],
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const email = "thepublicdesigner@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-[#00FFD1]/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="h-[1px] w-8 md:w-12 bg-[#00FFD1]" />
            <span className="text-[10px] md:text-xs font-medium text-[#00FFD1] tracking-[0.3em] lowercase font-[family-name:var(--font-display)]">
              contact
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-[#00FFD1]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white mb-4 md:mb-6 font-[family-name:var(--font-display)] lowercase">
            let&apos;s build
            <br />
            <span className="text-[#00FFD1]">together</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#666] max-w-md mx-auto mb-8 md:mb-12 font-[family-name:var(--font-display)] lowercase">
            available for freelance projects, collaborations, and community roles in the web3 space.
          </p>

          {/* Email */}
          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300"
          >
            <span className="text-base sm:text-lg md:text-xl text-white font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors lowercase">
              {email}
            </span>
            {copied ? (
              <Check size={18} className="md:w-5 md:h-5 text-[#00FFD1]" />
            ) : (
              <Copy size={18} className="md:w-5 md:h-5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
            )}
          </motion.button>

          {copied && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#00FFD1] text-[10px] md:text-xs mt-3 md:mt-4 font-[family-name:var(--font-display)] lowercase"
            >
              copied to clipboard
            </motion.p>
          )}
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-24"
        >
          {socials.map((social, i) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 glass border border-[#1a1a1a] hover:border-[#00FFD1]/50 transition-all duration-300"
              >
                <IconComponent size={14} className="md:w-4 md:h-4 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
                <span className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] lowercase">
                  {social.name}
                </span>
                <span className="text-sm md:text-base text-white font-[family-name:var(--font-display)] group-hover:text-[#00FFD1] transition-colors lowercase">
                  {social.handle}
                </span>
                <ArrowUpRight size={12} className="md:w-3.5 md:h-3.5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] lowercase">
            languages: <span className="text-[#00FFD1]">english</span> (native)
          </span>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 pt-12 md:pt-16 border-t border-[#1a1a1a]"
        >
          {/* Logo column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block mb-3 md:mb-4">
              <span className="text-lg md:text-xl font-semibold tracking-tight font-[family-name:var(--font-display)]">
                <span className="text-white">duke</span>
                <span className="text-[#00FFD1]">.sol</span>
              </span>
            </Link>
            <p className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] leading-relaxed lowercase">
              frontend developer & web3 builder based in nigeria and remote.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] tracking-[0.2em] mb-3 md:mb-4 lowercase">
                {column.title}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  const isAnchor = link.href.startsWith("#");
                  const IconComponent = link.icon;
                  
                  if (isExternal) {
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line group"
                        >
                          {IconComponent && <IconComponent size={12} className="md:w-3.5 md:h-3.5 text-[#666] group-hover:text-[#00FFD1] transition-colors" />}
                          <span>{link.name}</span>
                        </a>
                      </li>
                    );
                  }
                  
                  if (isAnchor) {
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line"
                        >
                          {link.name}
                        </a>
                      </li>
                    );
                  }
                  
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-xs md:text-sm text-[#999] hover:text-[#00FFD1] transition-colors font-[family-name:var(--font-display)] lowercase link-line"
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-[#1a1a1a]"
        >
          <span className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] lowercase text-center sm:text-left">
            {new Date().getFullYear()} duke.sol. built with <span className="text-[#00FFD1]">❤️</span> by me
          </span>

          <span className="text-[10px] md:text-xs text-[#666] font-[family-name:var(--font-display)] lowercase text-center sm:text-right">
            nigeria and remote / available worldwide
          </span>
        </motion.div>
      </div>
    </section>
  );
}
