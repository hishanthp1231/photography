"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import gsap from "gsap";

const CursorContext = createContext<{
  setCursorType: (type: "default" | "pointer" | "zoom" | "drag") => void;
} | null>(null);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursor must be used within CursorProvider");
  return context;
};

export default function CustomCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const viewfinderRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);
  const cursorTypeRef = useRef<"default" | "pointer" | "zoom" | "drag">("default");

  useEffect(() => {
    if (typeof window === "undefined") return;

    isMobileRef.current =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    if (isMobileRef.current) return;

    const cursor = cursorRef.current;
    const viewfinder = viewfinderRef.current;

    if (!cursor || !viewfinder) return;

    // Hide original cursor
    document.body.style.cursor = "none";

    // Set initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Auto-detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.classList.contains("interactive") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive && cursorTypeRef.current === "default") {
        applyPointerState();
      } else if (!isInteractive && cursorTypeRef.current === "default") {
        applyDefaultState();
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, []);

  // --- State transition helpers ---
  const applyDefaultState = () => {
    const vf = viewfinderRef.current;
    if (!vf) return;
    // Reset all children
    const brackets = vf.querySelector(".vf-brackets") as HTMLElement;
    const centerDot = vf.querySelector(".vf-center-dot") as HTMLElement;
    const crossH = vf.querySelector(".vf-cross-h") as HTMLElement;
    const crossV = vf.querySelector(".vf-cross-v") as HTMLElement;
    const focusRing = vf.querySelector(".vf-focus-ring") as HTMLElement;
    const shutterText = vf.querySelector(".vf-shutter-text") as HTMLElement;
    const aperture = vf.querySelector(".vf-aperture") as HTMLElement;

    if (brackets) gsap.to(brackets, { scale: 1, opacity: 1, rotation: 0, duration: 0.3 });
    if (centerDot) gsap.to(centerDot, { scale: 1, opacity: 1, backgroundColor: "#d4af37", duration: 0.3 });
    if (crossH) gsap.to(crossH, { scaleX: 1, opacity: 0.5, duration: 0.3 });
    if (crossV) gsap.to(crossV, { scaleY: 1, opacity: 0.5, duration: 0.3 });
    if (focusRing) gsap.to(focusRing, { scale: 1, opacity: 0, borderColor: "rgba(212,175,55,0.3)", duration: 0.3 });
    if (shutterText) gsap.to(shutterText, { opacity: 0, y: 5, duration: 0.2 });
    if (aperture) gsap.to(aperture, { scale: 0, opacity: 0, duration: 0.2 });
  };

  const applyPointerState = () => {
    const vf = viewfinderRef.current;
    if (!vf) return;
    const brackets = vf.querySelector(".vf-brackets") as HTMLElement;
    const centerDot = vf.querySelector(".vf-center-dot") as HTMLElement;
    const crossH = vf.querySelector(".vf-cross-h") as HTMLElement;
    const crossV = vf.querySelector(".vf-cross-v") as HTMLElement;
    const focusRing = vf.querySelector(".vf-focus-ring") as HTMLElement;
    const shutterText = vf.querySelector(".vf-shutter-text") as HTMLElement;

    if (brackets) gsap.to(brackets, { scale: 1.25, opacity: 1, duration: 0.3 });
    if (centerDot) gsap.to(centerDot, { scale: 1.4, backgroundColor: "#f0d878", duration: 0.3 });
    if (crossH) gsap.to(crossH, { scaleX: 1.3, opacity: 0.8, duration: 0.3 });
    if (crossV) gsap.to(crossV, { scaleY: 1.3, opacity: 0.8, duration: 0.3 });
    if (focusRing) gsap.to(focusRing, { scale: 1, opacity: 1, borderColor: "rgba(240,216,120,0.6)", duration: 0.3 });
    if (shutterText) gsap.to(shutterText, { opacity: 1, y: 0, duration: 0.3, delay: 0.1 });
  };

  const applyZoomState = () => {
    const vf = viewfinderRef.current;
    if (!vf) return;
    const brackets = vf.querySelector(".vf-brackets") as HTMLElement;
    const centerDot = vf.querySelector(".vf-center-dot") as HTMLElement;
    const crossH = vf.querySelector(".vf-cross-h") as HTMLElement;
    const crossV = vf.querySelector(".vf-cross-v") as HTMLElement;
    const aperture = vf.querySelector(".vf-aperture") as HTMLElement;
    const focusRing = vf.querySelector(".vf-focus-ring") as HTMLElement;

    if (brackets) gsap.to(brackets, { scale: 1.6, opacity: 0.7, rotation: 45, duration: 0.4, ease: "back.out(1.7)" });
    if (centerDot) gsap.to(centerDot, { scale: 0, opacity: 0, duration: 0.2 });
    if (crossH) gsap.to(crossH, { scaleX: 0, opacity: 0, duration: 0.2 });
    if (crossV) gsap.to(crossV, { scaleY: 0, opacity: 0, duration: 0.2 });
    if (aperture) gsap.to(aperture, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
    if (focusRing) gsap.to(focusRing, { scale: 1.5, opacity: 0.5, borderColor: "rgba(255,255,255,0.4)", duration: 0.4 });
  };

  const applyDragState = () => {
    const vf = viewfinderRef.current;
    if (!vf) return;
    const brackets = vf.querySelector(".vf-brackets") as HTMLElement;
    const centerDot = vf.querySelector(".vf-center-dot") as HTMLElement;
    const focusRing = vf.querySelector(".vf-focus-ring") as HTMLElement;

    if (brackets) gsap.to(brackets, { scale: 1.1, opacity: 0.8, duration: 0.3 });
    if (centerDot) gsap.to(centerDot, { scale: 1.8, backgroundColor: "#d4af37", duration: 0.3 });
    if (focusRing) gsap.to(focusRing, { scale: 1.2, opacity: 1, borderColor: "rgba(212,175,55,0.6)", duration: 0.3 });
  };

  const setCursorType = (type: "default" | "pointer" | "zoom" | "drag") => {
    if (isMobileRef.current) return;
    cursorTypeRef.current = type;

    switch (type) {
      case "pointer":
        applyPointerState();
        break;
      case "zoom":
        applyZoomState();
        break;
      case "drag":
        applyDragState();
        break;
      default:
        applyDefaultState();
        break;
    }
  };

  return (
    <CursorContext.Provider value={{ setCursorType }}>
      {children}

      {/* Main cursor container */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] hidden md:block"
        style={{ willChange: "transform" }}
      >
        {/* Viewfinder assembly */}
        <div
          ref={viewfinderRef}
          className="relative"
          style={{ width: 44, height: 44, marginLeft: -22, marginTop: -22 }}
        >
          {/* Focus ring (outer glow ring for hover states) */}
          <div
            className="vf-focus-ring absolute inset-[-8px] rounded-full border border-gold/30 opacity-0"
            style={{ willChange: "transform, opacity" }}
          />

          {/* Corner brackets - the DSLR viewfinder look */}
          <svg
            className="vf-brackets absolute inset-0 w-full h-full"
            viewBox="0 0 44 44"
            fill="none"
            style={{ willChange: "transform" }}
          >
            {/* Top-left bracket */}
            <path d="M2 14 L2 2 L14 2" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
            {/* Top-right bracket */}
            <path d="M30 2 L42 2 L42 14" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
            {/* Bottom-right bracket */}
            <path d="M42 30 L42 42 L30 42" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
            {/* Bottom-left bracket */}
            <path d="M14 42 L2 42 L2 30" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Crosshair lines */}
          <div
            className="vf-cross-h absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
            style={{ width: 16, height: 1, background: "linear-gradient(90deg, transparent 0%, #d4af37 40%, #d4af37 60%, transparent 100%)", willChange: "transform" }}
          />
          <div
            className="vf-cross-v absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
            style={{ width: 1, height: 16, background: "linear-gradient(180deg, transparent 0%, #d4af37 40%, #d4af37 60%, transparent 100%)", willChange: "transform" }}
          />

          {/* Center dot */}
          <div
            className="vf-center-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
            style={{ width: 4, height: 4, willChange: "transform, background-color", boxShadow: "0 0 6px rgba(212,175,55,0.5)" }}
          />

          {/* Aperture blades SVG (shown on zoom state) */}
          <svg
            className="vf-aperture absolute inset-0 w-full h-full scale-0 opacity-0"
            viewBox="0 0 44 44"
            fill="none"
            style={{ willChange: "transform, opacity" }}
          >
            {/* 6-blade aperture pattern */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line
                key={angle}
                x1="22"
                y1="22"
                x2={22 + 14 * Math.cos((angle * Math.PI) / 180)}
                y2={22 + 14 * Math.sin((angle * Math.PI) / 180)}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            ))}
            <circle cx="22" cy="22" r="8" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none" />
            <circle cx="22" cy="22" r="13" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
          </svg>

          {/* "SHOOT" text label (shown on pointer hover) */}
          <div
            className="vf-shutter-text absolute left-1/2 -translate-x-1/2 opacity-0"
            style={{ 
              bottom: -18, 
              fontSize: 7, 
              fontFamily: "var(--font-inter), sans-serif",
              letterSpacing: "0.2em", 
              color: "#f0d878", 
              textTransform: "uppercase",
              fontWeight: 600,
              whiteSpace: "nowrap",
              willChange: "transform, opacity",
              textShadow: "0 0 8px rgba(212,175,55,0.4)"
            }}
          >
            ● REC
          </div>
        </div>
      </div>
    </CursorContext.Provider>
  );
}
