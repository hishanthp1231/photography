"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

const TIMELINE_EVENTS = [
  {
    stage: "Pre-Shoot",
    title: "The Quiet Prelude",
    desc: "Capturing the raw chemistry and intimate gazes before the grand celebration. A celebration of love in its purest, unchoreographed form.",
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
    date: "Day -30",
  },
  {
    stage: "Wedding",
    title: "The Sacred Vows",
    desc: "A tapestry of tears, laughter, and timeless glances. Documenting every minute detail and grand highlight of your eternal Union.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    date: "Day 0",
  },
  {
    stage: "Family",
    title: "The Growing Circle",
    desc: "Preserving the warmth of the home. Cozy gatherings and new additions that turn transient houses into sacred shrines of memory.",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop",
    date: "Year 1",
  },
  {
    stage: "Birthday",
    title: "The Spark of Youth",
    desc: "From the magical first birthday cake to dynamic milestones. Capturing joy, surprise, and raw childhood wonder.",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop",
    date: "Year 2+",
  },
  {
    stage: "60th Celebration",
    title: "The Golden Age",
    desc: "Honoring a life beautifully lived. A celebration of wisdom, legacy, and generations gathered under one name.",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    date: "Year 60",
  },
];

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Grow vertical timeline line on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative min-h-screen w-full bg-matte-black py-32 px-6 md:px-12 overflow-hidden border-b border-gold/10"
    >
      {/* Visual background lights */}
      <div className="absolute top-[10%] right-[10%] h-[40vw] w-[40vw] rounded-full bg-gold/5 blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="mx-auto max-w-7xl text-center mb-24">
        <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
          Life's Journey
        </span>
        <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream">
          Timeline of Timeless Stories
        </h2>
        <p className="mt-4 font-sans text-xs md:text-sm text-cream/50 max-w-xl mx-auto uppercase tracking-widest font-light">
          From the spark of romance to legacy celebrations, we preserve every chapter.
        </p>
      </div>

      <div className="mx-auto max-w-5xl relative">
        {/* Central Vertical Line (Background) */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-neutral-800 hidden md:block" />
        
        {/* Animated Active Gold Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] bg-gold-gradient origin-top hidden md:block"
        />

        {/* Timeline Events Stack */}
        <div className="space-y-20 md:space-y-32">
          {TIMELINE_EVENTS.map((event, i) => (
            <TimelineCard key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  event,
  index,
}: {
  event: typeof TIMELINE_EVENTS[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const { setCursorType } = useCursor();
  
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`flex flex-col md:flex-row items-center w-full justify-between relative ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Outer wrapper to space items nicely */}
      <div className="w-full md:w-[45%]">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50, y: 30 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="glass-panel p-6 md:p-8 rounded-none border border-gold/15 relative overflow-hidden group hover:border-gold/40 transition-all duration-300 pointer-events-auto"
        >
          {/* Card Date Tag */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-accent text-xs tracking-widest text-gold font-bold uppercase">
              {event.stage}
            </span>
            <span className="font-sans text-[10px] tracking-widest text-cream/40 uppercase">
              {event.date}
            </span>
          </div>

          {/* Event Content Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Image Box */}
            <div 
              className="sm:col-span-5 aspect-[4/3] overflow-hidden border border-gold/10 relative"
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
            >
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
              />
            </div>
            
            {/* Text description */}
            <div className="sm:col-span-7 flex flex-col justify-center">
              <h3 className="font-serif text-lg md:text-xl font-bold text-cream group-hover:text-gold transition-colors duration-300">
                {event.title}
              </h3>
              <p className="mt-3 font-sans text-xs md:text-sm text-cream/60 leading-relaxed font-light">
                {event.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Central dot on the timeline */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
          className={`h-4 w-4 rounded-full border-2 bg-matte-black transition-colors duration-500 ${
            isInView ? "border-gold" : "border-neutral-700"
          } flex items-center justify-center`}
        >
          {/* Inner pulsating core */}
          {isInView && (
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-gold"
            />
          )}
        </motion.div>
      </div>

      {/* Spacer side to keep grids aligned */}
      <div className="w-[45%] hidden md:block" />
    </div>
  );
}
