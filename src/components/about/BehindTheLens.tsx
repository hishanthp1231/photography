"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

const STATS = [
  { value: 500, suffix: "+", label: "Weddings Covered" },
  { value: 2000, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "+", label: "Years of Experience" },
];

export default function BehindTheLens() {
  const { setCursorType } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-matte-black py-32 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-gold/10"
    >
      {/* Background radial gold glow */}
      <div className="absolute top-[30%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Portrait Reveal with Spotlight Effect */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            className="relative group w-full max-w-sm aspect-[3/4] overflow-hidden bg-dark-surface border border-gold/20"
            onMouseEnter={() => setCursorType("zoom")}
            onMouseLeave={() => setCursorType("default")}
          >
            {/* Overlay reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
            
            {/* Fine art photographer portrait from Unsplash */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
              alt="Studio 96 Founder"
              className="h-full w-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-[1.5s] ease-out"
            />
            
            {/* Floating gold frame accent */}
            <div className="absolute inset-4 border border-gold/20 pointer-events-none group-hover:border-gold/50 transition-colors duration-500 z-20" />
          </motion.div>
        </div>

        {/* Right Side: Text Storytelling & Animated Stats */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              Behind the Lens
            </span>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream leading-tight">
              Crafting Emotional Visual Legacies
            </h2>
            <div className="mt-4 h-[1px] w-20 bg-gold/60" />
          </motion.div>

          {/* Bio Story paragraphs */}
          <div className="mt-8 space-y-6 text-cream/70 font-sans text-sm md:text-base leading-relaxed font-light tracking-wide max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              At <strong className="text-gold font-medium">Studio 96</strong>, we believe that photography is not merely about documenting moments, but capturing the profound emotion, silent chemistry, and cinematic narrative of life. Founded by international award-winning visual storytellers, our craft occupies the space where fine art meets genuine connection.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              Whether it is the raw energy of an outdoor landscape, the quiet warmth of a wedding celebration, or the timeless elegance of fine art portraits, we utilize custom lighting patterns, premium grading styles, and editorial composition to preserve your legacy exactly as it felt.
            </motion.p>
          </div>

          {/* Statistics Grid with Counter hooks */}
          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-lg border-t border-gold/10 pt-10">
            {STATS.map((stat, i) => (
              <StatCounter
                key={i}
                target={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                trigger={isInView}
                delay={0.6 + i * 0.2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCounter({
  target,
  suffix,
  label,
  trigger,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  trigger: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = target;
    const duration = 2000; // 2 seconds count duration
    const stepTime = Math.abs(Math.floor(duration / end));
    
    // Scale count up after the delay has passed
    const delayTimer = setTimeout(() => {
      const timer = setInterval(() => {
        start += Math.ceil(end / 100) || 1;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, Math.max(stepTime, 16)); // Keep frames fluid (max 60fps/16ms)
    }, delay * 1000);

    return () => clearTimeout(delayTimer);
  }, [trigger, target, delay]);

  return (
    <div className="text-center md:text-left flex flex-col">
      <span className="font-serif text-3xl md:text-4xl font-bold text-gold-light">
        {count}
        {suffix}
      </span>
      <span className="mt-2 font-sans text-[10px] md:text-xs uppercase tracking-widest text-cream/50 leading-relaxed">
        {label}
      </span>
    </div>
  );
}
