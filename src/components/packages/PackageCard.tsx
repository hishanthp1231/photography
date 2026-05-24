"use client";

import React from "react";
import { motion } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";
import { Package } from "./PackageData";

export default function PackageCard({ pkg }: { pkg: Package }) {
  const { setCursorType } = useCursor();

  // Determine styling based on the package tier
  const isSilver = pkg.tier === "silver";
  const isGold = pkg.tier === "gold";
  const isPlatinum = pkg.tier === "platinum";

  // Tier-specific styling recipes
  let borderClass = "border-gold/15";
  let glowClass = "";
  let badgeText = "";
  
  if (isSilver) {
    borderClass = "border-neutral-700/50 hover:border-neutral-500";
    badgeText = "Essential";
  } else if (isGold) {
    borderClass = "border-gold/25 hover:border-gold/50";
    glowClass = "hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]";
    badgeText = "Signature";
  } else if (isPlatinum) {
    borderClass = "border-gold/40 hover:border-gold-light";
    glowClass = "shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_35px_rgba(212,175,55,0.3)]";
    badgeText = "Legacy Elite";
  }

  const handleBookClick = () => {
    const target = document.querySelector("#booking");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`glass-panel flex flex-col justify-between p-8 relative rounded-none border ${borderClass} ${glowClass} bg-matte-black/60 pointer-events-auto h-full group`}
    >
      {/* Premium Badge for Gold/Platinum */}
      {badgeText && (
        <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 border ${
          isPlatinum ? "bg-gold text-matte-black border-gold" : "text-gold border-gold/30 bg-matte-black/40"
        }`}>
          {badgeText}
        </span>
      )}

      {/* Package Header */}
      <div>
        <span className="font-accent text-xs tracking-widest text-gold/60 uppercase">
          {pkg.category} Package
        </span>
        <h3 className="mt-2 font-serif text-2xl font-bold text-cream group-hover:text-gold transition-colors duration-300">
          {pkg.name}
        </h3>
        <p className="mt-2 font-sans text-xs text-cream/50 min-h-[32px] leading-relaxed">
          {pkg.tagline}
        </p>

        {/* Dynamic Pricing / Inquire Label */}
        <div className="mt-6 flex items-baseline gap-2 border-b border-gold/10 pb-6">
          <span className="font-serif text-3xl font-bold tracking-tight text-gold-light">
            {pkg.price}
          </span>
          <span className="font-sans text-[10px] text-cream/40 uppercase tracking-widest">
            / Custom Quote
          </span>
        </div>

        {/* Coverage Specifications */}
        <div className="mt-6 space-y-2 border-b border-gold/10 pb-6 font-sans text-xs text-cream/80">
          <div className="flex justify-between">
            <span className="text-cream/40 uppercase tracking-widest">Coverage</span>
            <span className="font-medium tracking-wide">{pkg.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream/40 uppercase tracking-widest">Deliverables</span>
            <span className="font-medium tracking-wide">{pkg.photos}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream/40 uppercase tracking-widest">Timeline</span>
            <span className="font-medium tracking-wide">{pkg.delivery}</span>
          </div>
        </div>

        {/* Features Checklist */}
        <ul className="mt-6 space-y-3 font-sans text-xs text-cream/70">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-gold shrink-0 mt-0.5">✓</span>
              <span className="font-light tracking-wide">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Booking Trigger Button */}
      <button
        onClick={handleBookClick}
        onMouseEnter={() => setCursorType("pointer")}
        onMouseLeave={() => setCursorType("default")}
        className={`mt-8 w-full py-3.5 text-center text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
          isPlatinum
            ? "bg-gold-gradient text-matte-black hover:brightness-110"
            : "border border-gold/30 text-gold bg-transparent hover:bg-gold hover:text-matte-black"
        }`}
      >
        Book Now
      </button>
    </motion.div>
  );
}
