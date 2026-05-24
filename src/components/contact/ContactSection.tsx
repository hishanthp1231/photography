"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

export default function ContactSection() {
  const { setCursorType } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-matte-black py-32 px-6 md:px-12 overflow-hidden border-b border-gold/10 flex items-center justify-center"
    >
      {/* Background spotlights */}
      <div className="absolute top-[20%] right-[-10%] h-[35vw] w-[35vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              Get in Touch
            </span>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream leading-tight">
              Let's Begin Your Narrative
            </h2>
            <p className="mt-4 font-sans text-xs md:text-sm text-cream/50 uppercase tracking-widest font-light">
              Available worldwide for commissions and bespoke studio shoots.
            </p>
            <div className="mt-4 h-[1px] w-20 bg-gold/60" />
          </motion.div>

          {/* Info Details stack */}
          <div className="mt-12 space-y-6">
            {[
              { title: "General Inquiries", value: "hello@studio96.com", label: "Email" },
              { title: "Worldwide Bookings", value: "+1 (800) 969-9696", label: "Phone" },
              { title: "Creative Atelier", value: "96 Creative Way, Studio District, NY 10013", label: "Atelier" },
            ].map((detail, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                className="glass-panel p-6 border border-gold/15 bg-matte-black/50 hover:border-gold/35 transition-colors duration-300"
              >
                <span className="font-accent text-xs text-gold tracking-widest uppercase">
                  {detail.label}
                </span>
                <h4 className="font-serif text-sm font-bold text-cream mt-1">{detail.title}</h4>
                <p className="font-sans text-xs text-cream/70 mt-2 font-light tracking-wide">
                  {detail.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Social Links Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex gap-4"
          >
            {[
              { name: "Instagram", href: "#instagram" },
              { name: "Vimeo", href: "#vimeo" },
              { name: "Behance", href: "#behance" },
              { name: "Facebook", href: "#facebook" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="text-[10px] uppercase font-semibold tracking-widest px-4 py-2 border border-gold/20 text-cream/60 hover:text-gold hover:border-gold transition-all duration-300 bg-matte-black/40"
              >
                {social.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Quick Message Box / Custom Stylised Dark Map */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Quick Message Form */}
          <div className="glass-panel p-8 border border-gold/15 bg-matte-black/60 relative overflow-hidden pointer-events-auto">
            {sent ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <span className="text-gold text-2xl font-bold">✓ Sent</span>
                <p className="mt-4 font-sans text-xs text-cream/60 uppercase tracking-widest">
                  Your message has been dispatched successfully.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-gold">Send a Quick Note</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-cream font-sans focus:outline-none focus:border-gold"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-cream font-sans focus:outline-none focus:border-gold"
                  />
                </div>

                <textarea
                  placeholder="Tell us about your event..."
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-cream font-sans focus:outline-none focus:border-gold resize-none"
                />

                <button
                  type="submit"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="w-full py-4 bg-gold-gradient text-matte-black text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Stylised Dark Map panel */}
          <div className="glass-panel aspect-[21/9] w-full overflow-hidden border border-gold/15 relative bg-matte-black flex items-center justify-center p-4">
            {/* Visual Vector Grid Placeholder for Luxury Map */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,transparent_9%,rgba(212,175,55,0.25)_10%,transparent_10%),linear-gradient(rgba(212,175,55,0.25)_9%,transparent_10%,transparent_10%)] bg-[size:20px_20px] pointer-events-none" />
            <div className="absolute h-4 w-4 rounded-full bg-gold animate-ping opacity-60" />
            <div className="absolute h-2 w-2 rounded-full bg-gold" />
            
            <div className="z-10 text-center select-none pointer-events-none">
              <span className="font-accent text-[10px] text-gold uppercase tracking-[0.25em]">Atelier Location</span>
              <h4 className="font-serif text-sm font-bold text-cream mt-1">SoHo, Manhattan, NY</h4>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
