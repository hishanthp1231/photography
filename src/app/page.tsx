"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import CinematicPreloader from "src/components/preloader/CinematicPreloader";
import CinematicNav from "src/components/navigation/CinematicNav";
import HeroOverlay from "src/components/hero/HeroOverlay";
import BehindTheLens from "src/components/about/BehindTheLens";
import StoryTimeline from "src/components/timeline/StoryTimeline";
import FeaturedFilms from "src/components/films/FeaturedFilms";
import CinematicGallery from "src/components/gallery/CinematicGallery";
import FloatingMemories from "src/components/memories/FloatingMemories";
import PackagesSection from "src/components/packages/PackagesSection";
import AwardsShowcase from "src/components/awards/AwardsShowcase";
import TestimonialSlider from "src/components/testimonials/TestimonialSlider";
import BookingExperience from "src/components/booking/BookingExperience";
import InstagramFeed from "src/components/instagram/InstagramFeed";
import ContactSection from "src/components/contact/ContactSection";
import CinematicFooter from "src/components/footer/CinematicFooter";

// Dynamically import 3D Scenes with SSR disabled to prevent hydration errors
const HeroScene = dynamic(() => import("src/components/hero/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-matte-black" />,
});

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <>
      {/* 1. Preloader Shutter Reveal */}
      <CinematicPreloader onComplete={() => setPreloaderComplete(true)} />

      {/* 2. Main Page Layout (shown once preloader completes) */}
      {preloaderComplete && (
        <div className="relative flex flex-col w-full min-h-screen bg-matte-black text-cream">
          {/* Main Floating Navigation Header */}
          <CinematicNav />

          {/* Hero Landing Section */}
          <section id="home" className="relative h-screen w-full overflow-hidden bg-matte-black">
            <HeroScene />
            <HeroOverlay />
          </section>

          {/* About Section */}
          <BehindTheLens />

          {/* Vertical Lifecycle Storyline */}
          <StoryTimeline />

          {/* Cinematic video highlights */}
          <FeaturedFilms />

          {/* Masonry photography gallery */}
          <CinematicGallery />

          {/* 3D Floating memories dream space */}
          <FloatingMemories />

          {/* Photography Package Cards */}
          <PackagesSection />

          {/* Achievements showcase */}
          <AwardsShowcase />

          {/* Client feedback testimonials slider */}
          <TestimonialSlider />

          {/* Multi-step glassmorphism booking form */}
          <BookingExperience />

          {/* Instagram social journal */}
          <InstagramFeed />

          {/* Contact Details & Message Wizard */}
          <ContactSection />

          {/* Footnotes */}
          <CinematicFooter />
        </div>
      )}
    </>
  );
}
