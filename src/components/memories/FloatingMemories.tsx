"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

const FLOATING_ITEMS = [
  { 
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop", 
    top: "15%", 
    left: "10%", 
    width: "160px",
    aspect: "aspect-[3/4]",
    depth: 1, 
    speed: 0.6,
  },
  { 
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop", 
    top: "12%", 
    right: "12%", 
    width: "240px",
    aspect: "aspect-[4/3]",
    depth: 2, 
    speed: 0.4,
  },
  { 
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=400&auto=format&fit=crop", 
    top: "55%", 
    left: "15%", 
    width: "180px",
    aspect: "aspect-square",
    depth: 1.5, 
    speed: 0.8,
  },
  { 
    url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=400&auto=format&fit=crop", 
    top: "58%", 
    right: "15%", 
    width: "170px",
    aspect: "aspect-[3/4]",
    depth: 1.2, 
    speed: 0.5,
  },
  { 
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&auto=format&fit=crop", 
    top: "8%", 
    left: "45%", 
    width: "200px",
    aspect: "aspect-[4/3]",
    depth: 3, 
    speed: 0.7,
  },
  { 
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop", 
    top: "60%", 
    left: "46%", 
    width: "150px",
    aspect: "aspect-[3/4]",
    depth: 2.2, 
    speed: 0.9,
  },
];

export default function FloatingMemories() {
  const { setCursorType } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[85vh] w-full bg-[#030303] overflow-hidden border-b border-gold/10 flex flex-col justify-between py-20 px-6 select-none"
    >
      {/* Absolute HTML Floating Container */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {FLOATING_ITEMS.map((item, idx) => {
          // Parallax movement
          const moveX = mouse.x * 50 * item.depth;
          const moveY = mouse.y * 50 * item.depth;
          
          // Blur calculation based on virtual depth
          let blurVal = "blur-[1px]";
          if (item.depth > 2.5) blurVal = "blur-[2.5px]";
          if (item.depth < 1.3) blurVal = "blur-none";

          return (
            <motion.div
              key={idx}
              className="absolute pointer-events-auto group"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                width: item.width,
              }}
              animate={{
                x: moveX,
                y: moveY,
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            >
              {/* Floating bobbing wrapper */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, idx % 2 === 0 ? 2 : -2, 0],
                }}
                transition={{
                  duration: 4 + item.speed * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.3,
                }}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className={`relative w-full ${item.aspect} border border-gold/25 bg-matte-black p-1 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:scale-105 hover:border-gold transition-all duration-500 hover:shadow-[0_15px_45px_rgba(212,175,55,0.15)] hover:z-30 ${blurVal} hover:blur-none`}
              >
                {/* Gold accent inner frame */}
                <div className="absolute inset-2 border border-gold/10 group-hover:border-gold/30 pointer-events-none transition-colors duration-500 z-10" />
                <img
                  src={item.url}
                  alt="Floating memory"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* HTML Content Overlay */}
      <div className="relative z-20 mx-auto max-w-7xl w-full text-center pointer-events-none select-none">
        <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
          Dreamlike Workspace
        </span>
        <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream">
          Floating Memories
        </h2>
      </div>

      <div className="relative z-20 mx-auto max-w-xl text-center pointer-events-none select-none">
        <p className="font-sans text-xs text-cream/40 uppercase tracking-widest leading-relaxed">
          Move your cursor to drift through frozen fragments of time. Each image floats in its own gravitational current.
        </p>
      </div>
    </section>
  );
}
