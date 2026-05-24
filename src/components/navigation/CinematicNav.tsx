"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Behind The Lens", href: "#about" },
  { name: "Story Timeline", href: "#timeline" },
  { name: "Packages", href: "#packages" },
  { name: "Gallery", href: "#gallery" },
  { name: "Love Stories", href: "#stories" },
];

export default function CinematicNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setCursorType } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-matte-black/70 backdrop-blur-md border-b border-gold/10"
            : "py-6 bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 3.5 }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2 font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-cream"
            onClick={(e) => handleLinkClick(e, "#home")}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
          >
            <span>STUDIO</span>
            <span className="text-gold group-hover:text-gold-light transition-colors duration-300">96</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-sans text-xs uppercase tracking-widest text-cream/70 hover:text-gold transition-colors duration-300 py-1"
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Book Now Button (Desktop) */}
          <div className="hidden lg:block">
            <a
              href="#booking"
              className="relative px-6 py-2.5 rounded-none border border-gold/40 bg-transparent text-xs font-semibold uppercase tracking-widest text-gold hover:text-matte-black hover:bg-gold transition-all duration-300"
              onClick={(e) => handleLinkClick(e, "#booking")}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
            >
              Book Session
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden z-50 flex h-10 w-10 flex-col items-center justify-center border border-gold/20 rounded-none bg-matte-black/50 backdrop-blur"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            aria-label="Toggle menu"
          >
            <div className="relative flex flex-col gap-1.5 w-5">
              <span
                className={`h-[1px] bg-gold transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-[7.5px] w-5" : "w-5"
                }`}
              />
              <span
                className={`h-[1px] bg-gold transition-all duration-300 ${
                  isOpen ? "opacity-0" : "w-3.5 self-end"
                }`}
              />
              <span
                className={`h-[1px] bg-gold transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-[7.5px] w-5" : "w-5"
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-matte-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
              <div className="absolute top-[20%] left-[10%] h-[30vw] w-[30vw] rounded-full bg-gold blur-[120px]" />
              <div className="absolute bottom-[20%] right-[10%] h-[30vw] w-[30vw] rounded-full bg-gold blur-[120px]" />
            </div>

            {/* Menu Links */}
            <div className="flex flex-col items-center justify-center gap-6 z-10 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <a
                    href={link.href}
                    className="font-serif text-3xl font-bold tracking-widest text-cream hover:text-gold transition-colors duration-300"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1, duration: 0.5, ease: "easeOut" }}
                className="mt-6"
              >
                <a
                  href="#booking"
                  className="px-8 py-3 bg-gold-gradient text-matte-black text-sm font-bold uppercase tracking-widest hover:brightness-110 transition-all duration-300 inline-block"
                  onClick={(e) => handleLinkClick(e, "#booking")}
                >
                  Book Session
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
