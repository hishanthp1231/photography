"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import DSLRCamera from "./DSLRCamera";
import GoldParticles from "./GoldParticles";
import FloatingPhotos from "./FloatingPhotos";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      // We scale the progress value to react faster within the first 1/3 of the page
      const rawProgress = window.scrollY / (window.innerHeight * 1.5);
      setScrollProgress(Math.min(Math.max(rawProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-screen z-10 select-none bg-transparent"
      style={{ pointerEvents: "auto" }}
    >
      {/* Three.js Canvas - only render after mount to ensure DOM ref is available */}
      {mounted && (
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          eventSource={containerRef as React.RefObject<HTMLDivElement>}
          eventPrefix="client"
          style={{ pointerEvents: "none" }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={50} />
          
          {/* Lights */}
          <ambientLight intensity={0.8} />
          
          <directionalLight
            position={[5, 6, 4]}
            intensity={2.0}
            color="#ffffff"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          {/* Spot Light (glowing focus ray) */}
          <spotLight
            position={[0, 5, 2]}
            angle={0.4}
            penumbra={0.9}
            intensity={3}
            color="#f0d878"
            castShadow
          />

          {/* Ambient point light */}
          <pointLight position={[-3, -3, -2]} intensity={1.5} color="#d4af37" />

          {/* Rim Light pointing forward from behind the camera model */}
          <directionalLight
            position={[0, 0, -5]}
            intensity={4.0}
            color="#ffffff"
          />

          {/* 3D Scene Components */}
          <Suspense fallback={null}>
            <DSLRCamera scrollProgress={scrollProgress} />
            <GoldParticles count={300} />
            <FloatingPhotos scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
