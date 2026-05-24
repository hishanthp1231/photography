"use client";

import React from "react";
import { motion } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

export default function HeroOverlay() {
  const { setCursorType } = useCursor();

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none px-6 py-24 md:px-12 md:py-32">
      {/* Top spacing */}
      <div />

      {/* Hero Content Section */}
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center text-center mt-12 md:mt-20">
        {/* Cinematic Category Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.8, ease: "easeOut" }}
          className="mb-4 inline-flex items-center gap-2 border border-gold/25 bg-matte-black/50 px-4 py-1 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold-light">
            Experiential Fine Art Studio
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="relative font-serif text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-cream max-w-4xl leading-[1.1] pointer-events-auto">
          {/* Animated split characters / words for premium look */}
          <span className="block overflow-hidden py-1">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 4.0, ease: [0.85, 0, 0.15, 1] }}
            >
              Capturing Moments
            </motion.span>
          </span>
          <span className="block overflow-hidden py-1 text-gold-gradient">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 4.2, ease: [0.85, 0, 0.15, 1] }}
            >
              Beyond Time
            </motion.span>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 font-sans text-sm sm:text-base md:text-lg text-cream/70 max-w-2xl font-light leading-relaxed tracking-wide pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5, ease: "easeOut" }}
        >
          Luxury cinematic photography for weddings, birthdays, outdoor stories, and timeless memories.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="mt-10 flex flex-wrap gap-4 justify-center pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.7, ease: "easeOut" }}
        >
          <button
            onClick={() => handleScrollTo("#packages")}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="group relative overflow-hidden bg-gold-gradient px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-matte-black transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            View Packages
          </button>
          
          <button
            onClick={() => handleScrollTo("#booking")}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="group px-8 py-3.5 border border-gold/45 bg-matte-black/40 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-matte-black hover:border-gold hover:scale-105 active:scale-95"
          >
            Book Session
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Down Arrow */}
      <div className="flex justify-center mt-12">
        <motion.button
          onClick={() => handleScrollTo("#about")}
          onMouseEnter={() => setCursorType("pointer")}
          onMouseLeave={() => setCursorType("default")}
          className="flex flex-col items-center gap-2 text-gold/60 hover:text-gold transition-colors duration-300 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.2, duration: 1 }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em]">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-4 border border-gold/30 rounded-full flex justify-center p-1"
          >
            <span className="h-1.5 w-1 bg-gold rounded-full" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
