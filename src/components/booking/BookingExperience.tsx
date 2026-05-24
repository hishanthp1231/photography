"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCursor } from "src/providers/CustomCursorProvider";

const STEPS = [
  { id: 1, title: "Occasion" },
  { id: 2, title: "Particulars" },
  { id: 3, title: "Schedule" },
  { id: 4, title: "Verification" },
];

export default function BookingExperience() {
  const { setCursorType } = useCursor();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "wedding",
    tier: "gold",
    date: "",
    venue: "",
    hours: 6,
    addons: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleCheckboxChange = (addon: string) => {
    setFormData((prev) => {
      const addons = prev.addons.includes(addon)
        ? prev.addons.filter((a) => a !== addon)
        : [...prev.addons, addon];
      return { ...prev, addons };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="booking"
      className="relative min-h-screen w-full bg-matte-black py-32 px-6 md:px-12 overflow-hidden border-b border-gold/10 flex items-center justify-center"
    >
      {/* Background visual light rays */}
      <div className="absolute bottom-[10%] left-[-10%] h-[35vw] w-[35vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-3xl relative z-10">
        
        {/* Title Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
            Bespoke Reservations
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-bold tracking-tight text-cream">
            Reserve Your Session
          </h2>
          <p className="mt-4 font-sans text-xs md:text-sm text-cream/50 max-w-xl mx-auto uppercase tracking-widest font-light">
            Fill out our cinematic planner to schedule an exclusive consultation.
          </p>
        </div>

        {/* Wizard Form Wrapper */}
        <div className="glass-panel p-8 md:p-12 border border-gold/15 bg-matte-black/60 relative overflow-hidden pointer-events-auto">
          
          {submitted ? (
            /* SUCCESS PANEL */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center"
            >
              <div className="h-16 w-16 rounded-full border-2 border-gold flex items-center justify-center text-gold text-2xl font-bold mb-6 animate-pulse">
                ✓
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream">
                Reservation Proposal Received
              </h3>
              <p className="mt-4 font-sans text-sm text-cream/70 max-w-md mx-auto leading-relaxed">
                Thank you for choosing Studio 96. Our creative director is reviewing your event details. We will contact you within 24 hours to schedule a custom consultation.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    occasion: "wedding",
                    tier: "gold",
                    date: "",
                    venue: "",
                    hours: 6,
                    addons: [],
                  });
                }}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="mt-8 px-6 py-3 border border-gold/30 text-gold hover:bg-gold hover:text-matte-black transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
              >
                Plan Another Session
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Progress Steps Indicators */}
              <div className="flex items-center justify-between border-b border-gold/10 pb-6 mb-8">
                {STEPS.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span
                      className={`h-6 w-6 rounded-full border text-[10px] font-bold flex items-center justify-center transition-colors duration-300 ${
                        s.id === step
                          ? "bg-gold border-gold text-matte-black"
                          : s.id < step
                          ? "border-gold text-gold"
                          : "border-neutral-700 text-neutral-500"
                      }`}
                    >
                      {s.id}
                    </span>
                    <span
                      className={`font-sans text-[10px] uppercase tracking-widest hidden sm:inline ${
                        s.id === step ? "text-cream font-semibold" : "text-neutral-500"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dynamic steps body */}
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  
                  {/* Step 1: Occasion */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="font-serif text-lg font-bold text-gold">Choose Your Occasion</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: "wedding", label: "Wedding Celebration" },
                          { id: "ceremony", label: "Puberty Ceremony" },
                          { id: "birthday", label: "Milestone Birthday" },
                          { id: "shoot", label: "Fine Art / Outdoor Session" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, occasion: item.id })}
                            className={`p-4 border text-left font-sans text-xs uppercase tracking-widest transition-all duration-300 ${
                              formData.occasion === item.id
                                ? "border-gold bg-gold/10 text-gold"
                                : "border-neutral-800 text-cream/70 hover:border-neutral-700"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Particulars */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="font-serif text-lg font-bold text-gold">Package Details</h3>
                      
                      <div className="space-y-4">
                        <label className="block font-sans text-xs uppercase tracking-widest text-cream/60">
                          Coverage Tier preference
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {["silver", "gold", "platinum"].map((tier) => (
                            <button
                              key={tier}
                              type="button"
                              onClick={() => setFormData({ ...formData, tier })}
                              className={`p-3 border text-center font-sans text-[10px] uppercase tracking-widest transition-all duration-300 ${
                                formData.tier === tier
                                  ? "border-gold bg-gold/10 text-gold"
                                  : "border-neutral-800 text-cream/60 hover:border-neutral-700"
                              }`}
                            >
                              {tier}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-sans text-xs uppercase tracking-widest text-cream/60">
                          Coverage Duration (Hours): {formData.hours} hrs
                        </label>
                        <input
                          type="range"
                          min="2"
                          max="16"
                          value={formData.hours}
                          onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
                          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-gold"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Schedule */}
                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="space-y-2">
                        <label className="block font-sans text-xs uppercase tracking-widest text-cream/60">
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          required
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-cream font-sans focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-sans text-xs uppercase tracking-widest text-cream/60">
                          Event Venue / Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Grand Plaza Manor"
                          value={formData.venue}
                          required
                          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-cream font-sans focus:outline-none focus:border-gold"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Verification */}
                  {step === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="font-serif text-lg font-bold text-gold">Tell Us About You</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-cream font-sans focus:outline-none focus:border-gold"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-cream font-sans focus:outline-none focus:border-gold"
                        />
                      </div>
                      
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 p-3 text-sm text-cream font-sans focus:outline-none focus:border-gold"
                      />
                    </motion.div>
                  )}
                  
                </AnimatePresence>
              </div>

              {/* Buttons footer */}
              <div className="flex justify-between items-center border-t border-gold/10 pt-6 mt-8">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={step === 1}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                    step === 1
                      ? "text-neutral-600 border border-neutral-800 cursor-not-allowed"
                      : "text-cream/70 border border-neutral-700 hover:border-gold hover:text-gold"
                  }`}
                >
                  Back
                </button>

                {step === 4 ? (
                  <button
                    type="submit"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className="px-8 py-3.5 bg-gold-gradient text-matte-black text-xs font-bold uppercase tracking-widest hover:brightness-115 transition-all duration-300"
                  >
                    Submit Request
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className="px-8 py-3.5 border border-gold/30 text-gold hover:bg-gold hover:text-matte-black transition-all duration-300 text-xs font-bold uppercase tracking-widest"
                  >
                    Continue
                  </button>
                )}
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
