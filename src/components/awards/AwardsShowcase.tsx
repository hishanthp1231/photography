"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const AWARDS = [
  {
    year: "2025",
    title: "Atelier of the Year",
    issuer: "Global Wedding Awards",
    desc: "Recognized for pioneering cinema-grade editorial compositions in luxury weddings.",
  },
  {
    year: "2024",
    title: "Best Fine Art Portraiture",
    issuer: "International Photography Association",
    desc: "First place honors for capturing natural light chemistry in wilderness outdoor narratives.",
  },
  {
    year: "2023",
    title: "Silver Laurel Medalist",
    issuer: "Visual Storytelling Consortium",
    desc: "Awarded for exceptional multi-generational documentary and traditional lifecycle stories.",
  },
];

export default function AwardsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-matte-black py-32 px-6 md:px-12 overflow-hidden border-b border-gold/10"
    >
      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Title Header */}
        <div className="text-center mb-20">
          <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
            Accolades & Recognition
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream">
            Awards & Achievements
          </h2>
        </div>

        {/* Awards list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AWARDS.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-panel p-8 border border-gold/15 bg-matte-black/40 hover:border-gold/30 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Year tag */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-3xl font-bold text-gold/30 group-hover:text-gold/90 transition-colors duration-300">
                    {award.year}
                  </span>
                  {/* Decorative golden trophy outline */}
                  <span className="text-gold text-lg">🏆</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-cream group-hover:text-gold transition-colors duration-300">
                  {award.title}
                </h3>
                <span className="font-sans text-[10px] uppercase tracking-widest text-cream/40 block mt-1">
                  {award.issuer}
                </span>
                
                <p className="mt-4 font-sans text-xs text-cream/60 leading-relaxed font-light">
                  {award.desc}
                </p>
              </div>

              {/* Decorative accent dot */}
              <div className="h-[2px] w-8 bg-gold/35 mt-6 transition-all duration-300 group-hover:w-16 group-hover:bg-gold" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
