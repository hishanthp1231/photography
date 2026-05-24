"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";
import { GalleryImage } from "./GalleryData";

interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ image, onClose, onNext, onPrev }: LightboxProps) {
  const { setCursorType } = useCursor();

  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [image, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[10000] bg-matte-black/98 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Top Navbar Actions */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
            <span className="font-accent text-xs tracking-[0.2em] text-gold uppercase">
              {image.category} / {image.title}
            </span>
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="text-cream/60 hover:text-gold transition-colors duration-300 font-sans text-xs uppercase tracking-widest px-4 py-2 border border-gold/15 bg-matte-black/50"
            >
              Close (ESC)
            </button>
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={onPrev}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:block h-12 w-12 border border-gold/15 bg-matte-black/50 hover:border-gold hover:text-gold text-cream/70 text-lg transition-all duration-300"
            aria-label="Previous image"
          >
            ←
          </button>

          {/* Image Display Panel */}
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative max-w-5xl max-h-[80vh] w-full px-6 flex items-center justify-center"
          >
            <img
              src={image.url}
              alt={image.title}
              className="object-contain max-h-[75vh] border border-gold/25 shadow-[0_0_50px_rgba(212,175,55,0.15)]"
            />
          </motion.div>

          {/* Right Navigation Arrow */}
          <button
            onClick={onNext}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:block h-12 w-12 border border-gold/15 bg-matte-black/50 hover:border-gold hover:text-gold text-cream/70 text-lg transition-all duration-300"
            aria-label="Next image"
          >
            →
          </button>

          {/* Mobile swipe actions descriptor / subtitle */}
          <div className="absolute bottom-6 text-center z-20">
            <h3 className="font-serif text-lg font-bold text-cream">{image.title}</h3>
            <p className="mt-1 font-sans text-[10px] tracking-widest text-cream/40 uppercase">
              Use keyboard arrows to navigate
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
