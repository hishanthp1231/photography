"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";
import { PACKAGES } from "./PackageData";
import PackageCard from "./PackageCard";

const CATEGORIES = [
  { id: "all", label: "All Packages" },
  { id: "wedding", label: "Weddings" },
  { id: "ceremony", label: "Ceremonies" },
  { id: "birthday", label: "Birthdays" },
  { id: "shoot", label: "Fine Art Shoots" },
];

export default function PackagesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { setCursorType } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredPackages = PACKAGES.filter(
    (pkg) => activeCategory === "all" || pkg.category === activeCategory
  );

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-matte-black py-32 px-6 md:px-12 overflow-hidden border-b border-gold/10"
    >
      {/* Background visual light rays */}
      <div className="absolute top-[20%] left-[-10%] h-[40vw] w-[40vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] h-[45vw] w-[45vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Title Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-accent text-sm uppercase tracking-[0.25em] text-gold"
          >
            Luxury Curated Tiers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream"
          >
            Cinematic Photography Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 font-sans text-xs md:text-sm text-cream/50 max-w-xl mx-auto uppercase tracking-widest font-light"
          >
            Select a category to view bespoke services tailored to your occasion.
          </motion.p>
        </div>

        {/* Categories Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16 border-b border-gold/10 pb-8 max-w-3xl mx-auto"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className={`relative px-5 py-2 font-sans text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? "text-matte-black font-semibold" : "text-cream/60 hover:text-cream"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-gold-gradient z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <PackageCard pkg={pkg} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
