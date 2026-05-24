"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";
import { GALLERY_IMAGES, GalleryImage } from "./GalleryData";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";

const CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "wedding", label: "Weddings" },
  { id: "birthday", label: "Birthdays" },
  { id: "outdoor", label: "Outdoors" },
  { id: "preshoot", label: "Pre-Shoots" },
  { id: "puberty", label: "Puberty Ceremonies" },
];

export default function CinematicGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const { setCursorType } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredImages = GALLERY_IMAGES.filter(
    (img) => activeCategory === "all" || img.category === activeCategory
  );

  const handleNext = () => {
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex]);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-matte-black py-32 px-6 md:px-12 overflow-hidden border-b border-gold/10"
    >
      {/* Background Visual Spotlights */}
      <div className="absolute top-[30%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] h-[45vw] w-[45vw] rounded-full bg-gold/5 blur-[130px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        {/* Title Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
            Visual Portfolio
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream">
            The Cinematic Gallery
          </h2>
          <p className="mt-4 font-sans text-xs md:text-sm text-cream/50 max-w-xl mx-auto uppercase tracking-widest font-light">
            An curated archive of raw emotion, elegant lighting, and frozen time.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 border-b border-gold/10 pb-8 max-w-3xl mx-auto">
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
                    layoutId="activeGalleryTab"
                    className="absolute inset-0 bg-gold-gradient z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry Layout Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="break-inside-avoid-column w-full"
              >
                <GalleryCard image={img} onClick={() => setLightboxImage(img)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
