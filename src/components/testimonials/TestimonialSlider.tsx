"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";
import { TESTIMONIALS } from "./TestimonialData";

export default function TestimonialSlider() {
  const { setCursorType } = useCursor();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="stories"
      className="relative min-h-[90vh] w-full bg-matte-black py-32 px-6 md:px-12 overflow-hidden border-b border-gold/10 flex flex-col justify-center"
    >
      {/* Background spot overlays */}
      <div className="absolute top-[20%] left-[-10%] h-[35vw] w-[35vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Title Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
            Client Love Stories
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream">
            Cinematic Testimonials
          </h2>
          <p className="mt-4 font-sans text-xs md:text-sm text-cream/50 max-w-xl mx-auto uppercase tracking-widest font-light">
            Read what our clients say about their experience with our studio.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto px-4">
          <div
            ref={emblaRef}
            className="overflow-hidden"
            onMouseEnter={() => setCursorType("drag")}
            onMouseLeave={() => setCursorType("default")}
          >
            <div className="flex">
              {TESTIMONIALS.map((test) => (
                <div key={test.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="glass-panel p-8 md:p-12 text-center flex flex-col items-center justify-between border border-gold/15 bg-matte-black/40 min-h-[350px]">
                    {/* Client Avatar Portrait */}
                    <div className="h-16 w-16 rounded-full overflow-hidden border border-gold/40 mb-6 shrink-0">
                      <img
                        src={test.img}
                        alt={test.name}
                        className="h-full w-full object-cover grayscale brightness-95"
                      />
                    </div>

                    {/* Star Rating */}
                    <div className="flex justify-center gap-1 mb-6 text-gold text-sm">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>

                    {/* Quote Text */}
                    <blockquote className="font-serif text-lg md:text-xl text-cream/90 italic leading-relaxed font-light tracking-wide max-w-2xl">
                      “{test.quote}”
                    </blockquote>

                    {/* Signature Author */}
                    <div className="mt-8">
                      <h4 className="font-serif text-base font-bold text-gold">{test.name}</h4>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-cream/40">
                        {test.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons (Absolute Overlay) */}
          <button
            onClick={scrollPrev}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 h-12 w-12 rounded-none border border-gold/15 bg-matte-black/50 hover:border-gold hover:text-gold text-cream/70 text-lg transition-all duration-300 flex items-center justify-center pointer-events-auto"
            aria-label="Previous slide"
          >
            ←
          </button>

          <button
            onClick={scrollNext}
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 h-12 w-12 rounded-none border border-gold/15 bg-matte-black/50 hover:border-gold hover:text-gold text-cream/70 text-lg transition-all duration-300 flex items-center justify-center pointer-events-auto"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
