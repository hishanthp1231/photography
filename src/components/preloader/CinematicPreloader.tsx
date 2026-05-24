"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CinematicPreloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{
    top: string;
    left: string;
    floatY: number;
    floatX: number;
    duration: number;
    delay: number;
  }[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate particles on client side only to avoid SSR hydration mismatches
    const generated = Array.from({ length: 40 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      floatY: Math.random() * 100,
      floatX: (Math.random() - 0.5) * 60,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setParticles(generated);

    const duration = 2500; // 2.5 seconds
    const interval = 25;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 1500); // Shutter open animation duration + fade
          }, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // SVG parameters
  const bladeCount = 8;
  const blades = Array.from({ length: bladeCount });

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-matte-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
        >
          {/* Gold Particle Background */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-gold-light"
                  style={{
                    top: p.top,
                    left: p.left,
                  }}
                  animate={{
                    y: [0, -120 - p.floatY],
                    x: [0, p.floatX],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                  }}
                />
              ))}
            </div>
          )}

          {/* Shutter Mechanism Container */}
          <div className="relative flex h-80 w-80 items-center justify-center">
            {/* Shutter Shimmer Circles */}
            <div className="absolute inset-0 rounded-full border border-gold/10 scale-110 animate-[pulse_2s_infinite]" />
            <div className="absolute inset-0 rounded-full border border-gold/20 scale-100" />
            
            {/* Shutter Blades SVG */}
            <svg
              viewBox="0 0 200 200"
              className="absolute h-64 w-64 text-dark-surface fill-dark-surface stroke-gold/15"
            >
              <defs>
                <clipPath id="shutter-circle">
                  <circle cx="100" cy="100" r="85" />
                </clipPath>
              </defs>
              <g clipPath="url(#shutter-circle)">
                {blades.map((_, i) => {
                  const angle = (i * 360) / bladeCount;
                  // We simulate the shutter blades overlapping
                  return (
                    <motion.path
                      key={i}
                      d="M 100 100 L 180 50 L 180 150 Z"
                      style={{ originX: "100px", originY: "100px" }}
                      animate={{
                        rotate: [angle, angle + 360],
                        scale: [1, 0.05],
                      }}
                      transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: {
                          delay: 2.2,
                          duration: 1.0,
                          ease: [0.85, 0, 0.15, 1],
                        },
                      }}
                    />
                  );
                })}
              </g>
              {/* Outer lens rim */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="#d4af37" strokeWidth="2.5" className="opacity-80" />
            </svg>

            {/* Inner Shutter Aperture Reflection (Gold Ring) */}
            <motion.div
              className="absolute h-28 w-28 rounded-full border border-gold/40 bg-matte-black/60 flex items-center justify-center"
              animate={{
                scale: [0.95, 1.05, 0.95],
                borderColor: ["rgba(212, 175, 55, 0.3)", "rgba(212, 175, 55, 0.6)", "rgba(212, 175, 55, 0.3)"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Logo / Brand Name inside the lens */}
              <motion.div 
                className="text-center font-serif text-3xl font-bold tracking-widest text-gold-light"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                96
              </motion.div>
            </motion.div>
          </div>

          {/* Brand Reveal Header */}
          <div className="mt-8 text-center z-10">
            <motion.h1 
              className="font-serif text-3xl font-bold tracking-[0.4em] text-cream"
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.4em", opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              STUDIO 96
            </motion.h1>
            <motion.p 
              className="mt-2 font-accent text-sm tracking-[0.25em] text-gold/60 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            >
              Luxury Cinematic Storytelling
            </motion.p>
          </div>

          {/* Progress bar and counter */}
          <div className="mt-12 w-64 z-10">
            <div className="flex justify-between items-center mb-2 font-sans text-[10px] tracking-widest text-gold/80 uppercase">
              <span>Adjusting Focus</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-[2px] w-full bg-neutral-900 overflow-hidden relative">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
