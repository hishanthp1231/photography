"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

const FILMS = [
  {
    id: "film-1",
    title: "Elysian Union",
    location: "Lake Como, Italy",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://player.vimeo.com/video/343806292?autoplay=1",
  },
  {
    id: "film-2",
    title: "Wild Romance",
    location: "Isle of Skye, Scotland",
    cover: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://player.vimeo.com/video/448259074?autoplay=1",
  },
];

export default function FeaturedFilms() {
  const { setCursorType } = useCursor();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] w-full bg-matte-black py-32 px-6 md:px-12 overflow-hidden border-b border-gold/10 flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Title Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
            Featured Films
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream">
            Cinematic Highlights
          </h2>
          <p className="mt-4 font-sans text-xs md:text-sm text-cream/50 max-w-xl mx-auto uppercase tracking-widest font-light">
            Moving portraits that capture raw emotion in motion.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {FILMS.map((film, index) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: index * 0.2, ease: "easeOut" }}
              className="relative aspect-video group overflow-hidden border border-gold/15 bg-dark-surface pointer-events-auto"
            >
              {/* Cover Image */}
              <img
                src={film.cover}
                alt={film.title}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-[1.2s] ease-out"
              />

              {/* Cover Gradient shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent z-10" />

              {/* Shutter styled Play Button */}
              <button
                onClick={() => setActiveVideo(film.videoUrl)}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="absolute inset-0 m-auto h-16 w-16 rounded-full border-2 border-gold bg-matte-black/60 backdrop-blur-sm flex items-center justify-center text-gold hover:scale-110 hover:bg-gold hover:text-matte-black transition-all duration-300 z-20"
                aria-label="Play video highlight"
              >
                <span className="ml-1 text-lg">▶</span>
              </button>

              {/* Text Meta Info */}
              <div className="absolute bottom-6 left-6 z-20">
                <span className="font-accent text-[10px] text-gold uppercase tracking-[0.25em]">
                  {film.location}
                </span>
                <h3 className="font-serif text-xl font-bold text-cream mt-1 group-hover:text-gold transition-colors duration-300">
                  {film.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[20000] bg-matte-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-none pointer-events-auto"
          >
            <div 
              className="relative w-full max-w-4xl aspect-video bg-black border border-gold/25"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video itself
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-[-40px] right-0 text-cream/70 hover:text-gold font-sans text-xs uppercase tracking-widest"
              >
                Close (✖)
              </button>
              
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
