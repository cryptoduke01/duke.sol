"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10001] bg-black flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
            >
              <span className="text-white">duke</span>
              <span className="text-[#00FFD1]">.sol</span>
            </motion.div>

            {/* Loading spinner */}
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                className="w-12 h-12 border-2 border-[#1a1a1a] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner spinning arc */}
              <motion.div
                className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-[#00FFD1] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center dot */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-[#00FFD1] rounded-full" />
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-[#666] font-[family-name:var(--font-mono)] tracking-[0.3em] lowercase"
            >
              loading
            </motion.span>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[#1a1a1a]" />
          <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[#1a1a1a]" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[#1a1a1a]" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[#1a1a1a]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

