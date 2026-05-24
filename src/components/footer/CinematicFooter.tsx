"use client";

import React from "react";
import { useCursor } from "src/providers/CustomCursorProvider";

export default function CinematicFooter() {
  const { setCursorType } = useCursor();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-matte-black py-20 px-6 md:px-12 border-t border-gold/15 flex flex-col justify-between overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute bottom-[-10%] left-[-10%] h-[30vw] w-[30vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gold/10 pb-16">
        
        {/* Brand Meta info */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-[0.2em] text-cream">
              STUDIO <span className="text-gold">96</span>
            </h3>
            <p className="mt-4 font-sans text-xs text-cream/50 max-w-sm leading-relaxed font-light">
              Crafting premium visual memories, fine art portraits, and cinematic wedding highlights for discerning clients globally.
            </p>
          </div>
          
          <div className="mt-8 font-sans text-[10px] text-cream/30 uppercase tracking-widest leading-relaxed">
            © {new Date().getFullYear()} Studio 96. All rights reserved.
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 flex flex-col">
          <span className="font-accent text-xs text-gold tracking-widest uppercase mb-6">
            Quick Navigation
          </span>
          <ul className="space-y-3 font-sans text-xs">
            {[
              { name: "Home", href: "#home" },
              { name: "Behind the Lens", href: "#about" },
              { name: "Story Timeline", href: "#timeline" },
              { name: "Packages", href: "#packages" },
              { name: "Gallery", href: "#gallery" },
              { name: "Love Stories", href: "#stories" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="text-cream/60 hover:text-gold transition-colors duration-300 pointer-events-auto"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal columns */}
        <div className="md:col-span-2 flex flex-col">
          <span className="font-accent text-xs text-gold tracking-widest uppercase mb-6">
            Services
          </span>
          <ul className="space-y-3 font-sans text-xs text-cream/60">
            <li>Wedding Highlights</li>
            <li>Milestone Birthdays</li>
            <li>Puberty Ceremonies</li>
            <li>Outdoor Stories</li>
            <li>Fine Art Albums</li>
          </ul>
        </div>

        {/* Scroll back to top */}
        <div className="md:col-span-2 flex flex-col items-start md:items-end justify-between">
          <span className="font-accent text-xs text-gold tracking-widest uppercase mb-6 md:mb-0">
            Elevate
          </span>
          
          <button
            onClick={handleBackToTop}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold hover:text-gold-light transition-colors duration-300 pointer-events-auto"
          >
            Back to Top <span>↑</span>
          </button>
        </div>

      </div>

      {/* Luxury branding subtitle at the bottom */}
      <div className="mx-auto w-full max-w-7xl relative z-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div className="font-accent text-xs text-cream/30 tracking-[0.2em] uppercase">
          Matte Black & Gold Cinematic Experiential Design
        </div>
        <div className="font-sans text-[10px] text-cream/35">
          Designed for elite creative photography portfolios.
        </div>
      </div>
    </footer>
  );
}
