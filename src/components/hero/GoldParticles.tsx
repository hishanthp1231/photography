"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function GoldParticles({ count = 500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions and velocities
  const [positions, speeds, noiseSeeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const seeds = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute in a spherical region or box around the camera
      pos[i * 3] = (Math.random() - 0.5) * 8; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1; // Z (skewed slightly back)

      // Speed of upward float
      spd[i] = 0.1 + Math.random() * 0.3;

      // Seed for trigonometry noise (x, y, z drift frequencies)
      seeds[i * 3] = Math.random() * 100;
      seeds[i * 3 + 1] = Math.random() * 100;
      seeds[i * 3 + 2] = Math.random() * 100;
    }

    return [pos, spd, seeds];
  }, [count]);

  // Generate a soft circular bokeh particle texture programmatically
  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 240, 180, 0.8)");
      gradient.addColorStop(0.6, "rgba(212, 175, 55, 0.2)");
      gradient.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idxX = i * 3;
      const idxY = i * 3 + 1;
      const idxZ = i * 3 + 2;

      // Move particles upwards
      posAttr.array[idxY] += speeds[i] * delta;

      // Add a gentle side-to-side waving motion (drift)
      posAttr.array[idxX] += Math.sin(time + noiseSeeds[idxX]) * 0.1 * delta;
      posAttr.array[idxZ] += Math.cos(time + noiseSeeds[idxZ]) * 0.1 * delta;

      // Reset particles when they go too high
      if (posAttr.array[idxY] > 3) {
        posAttr.array[idxY] = -3;
        posAttr.array[idxX] = (Math.random() - 0.5) * 8;
        posAttr.array[idxZ] = (Math.random() - 0.5) * 5 - 1;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.12}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={particleTexture || undefined}
      />
    </points>
  );
}
