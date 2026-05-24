"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

const INSTA_POSTS = [
  { id: "post-1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop", likes: "1.2k", comments: 84 },
  { id: "post-2", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop", likes: "982", comments: 45 },
  { id: "post-3", url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=400&auto=format&fit=crop", likes: "1.5k", comments: 104 },
  { id: "post-4", url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=400&auto=format&fit=crop", likes: "892", comments: 39 },
];

export default function InstagramFeed() {
  const { setCursorType } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-24 px-6 md:px-12 overflow-hidden border-b border-gold/10"
    >
      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              Live Feed
            </span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold tracking-tight text-cream">
              Social Journal
            </h2>
          </div>
          
          <a
            href="#instagram"
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="mt-4 md:mt-0 font-sans text-xs uppercase tracking-widest text-gold hover:text-gold-light transition-colors duration-300 flex items-center gap-2 pointer-events-auto"
          >
            Follow @studio96_films <span>→</span>
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {INSTA_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-square group overflow-hidden border border-gold/10 bg-dark-surface cursor-none pointer-events-auto"
              onMouseEnter={() => setCursorType("zoom")}
              onMouseLeave={() => setCursorType("default")}
            >
              {/* Image */}
              <img
                src={post.url}
                alt="Instagram post highlight"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
              />

              {/* Hover Overlay info */}
              <div className="absolute inset-0 bg-matte-black/75 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                <span className="font-sans text-xs text-cream flex items-center gap-1.5 font-medium">
                  <span className="text-gold">❤</span> {post.likes}
                </span>
                <span className="font-sans text-xs text-cream flex items-center gap-1.5 font-medium">
                  <span className="text-gold">💬</span> {post.comments}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
