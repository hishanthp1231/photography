"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";
import { GalleryImage } from "./GalleryData";

interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
}

export default function GalleryCard({ image, onClick }: GalleryCardProps) {
  const { setCursorType } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt states
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinate from card center (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    // Convert to rotation angles (max 10 degrees)
    setRotateX(-relativeY * 12);
    setRotateY(relativeX * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setCursorType("default");
  };

  // Set card height classes based on aspect ratios for masonry effect
  let aspectClass = "aspect-[3/4]"; // portrait default
  if (image.aspect === "landscape") {
    aspectClass = "aspect-[4/3]";
  } else if (image.aspect === "square") {
    aspectClass = "aspect-square";
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setCursorType("zoom")}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`relative w-full ${aspectClass} overflow-hidden bg-dark-surface border border-gold/15 transition-transform duration-200 ease-out cursor-none pointer-events-auto group`}
    >
      {/* Background shadow overlay */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500 z-10 pointer-events-none" 
      />

      {/* Image */}
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1s] ease-out"
      />

      {/* Content overlay (reveals on hover) */}
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="absolute inset-0 flex flex-col justify-end p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <span className="font-accent text-xs tracking-widest text-gold uppercase mb-1">
          {image.category}
        </span>
        <h4 className="font-serif text-lg font-bold text-cream">
          {image.title}
        </h4>
        <span className="mt-2 text-[9px] uppercase tracking-widest text-cream/50">
          Click to expand
        </span>
      </div>

      {/* Luxury Border Frame Accent */}
      <div className="absolute inset-3 border border-gold/10 group-hover:border-gold/30 pointer-events-none transition-colors duration-500 z-15" />
    </motion.div>
  );
}
