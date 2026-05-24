"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Image as DreiImage } from "@react-three/drei";
import * as THREE from "three";

// High-quality wedding, birthday, portrait, and outdoor photography from Unsplash
const MEMORIES = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    position: [-2.2, 0.8, -1.5] as [number, number, number],
    rotation: [0.1, 0.3, -0.1] as [number, number, number],
    scale: [1.2, 1.6] as [number, number],
    speed: 0.8,
  },
  {
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    position: [2.2, 0.7, -1.8] as [number, number, number],
    rotation: [-0.15, -0.3, 0.1] as [number, number, number],
    scale: [1.5, 1.0] as [number, number],
    speed: 0.6,
  },
  {
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop",
    position: [-2.0, -1.0, -1.0] as [number, number, number],
    rotation: [0.2, 0.15, -0.05] as [number, number, number],
    scale: [1.4, 0.9] as [number, number],
    speed: 0.9,
  },
  {
    url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600&auto=format&fit=crop",
    position: [1.9, -0.9, -1.2] as [number, number, number],
    rotation: [-0.1, -0.2, 0.08] as [number, number, number],
    scale: [1.1, 1.4] as [number, number],
    speed: 0.7,
  },
];

export default function FloatingPhotos({ scrollProgress }: { scrollProgress: number }) {
  return (
    <group>
      {MEMORIES.map((item, index) => (
        <FloatingImageCard
          key={index}
          {...item}
          scrollProgress={scrollProgress}
          index={index}
        />
      ))}
    </group>
  );
}

function FloatingImageCard({
  url,
  position,
  rotation,
  scale,
  speed,
  scrollProgress,
  index,
}: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number];
  speed: number;
  scrollProgress: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const imageRef = useRef<any>(null);

  // Use R3F frame loop to float the images
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Slow float bobbing animation
    const bob = Math.sin(time * speed + index) * 0.08;
    const sway = Math.cos(time * speed * 0.5 + index) * 0.04;
    
    meshRef.current.position.y = position[1] + bob;
    meshRef.current.position.x = position[0] + sway;

    // Scroll-triggered depth pushing (fly out/away as user scrolls down)
    meshRef.current.position.z = position[2] - (scrollProgress * 2.5);
    meshRef.current.rotation.y = rotation[1] + (scrollProgress * 0.5);
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Photo card backing / frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[scale[0] + 0.08, scale[1] + 0.08]} />
        <meshStandardMaterial
          color="#0f0f0f"
          roughness={0.9}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Gold framing border */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[scale[0] + 0.1, scale[1] + 0.1]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Drei Image Component */}
      <DreiImage
        ref={imageRef}
        url={url}
        scale={scale}
        transparent
        opacity={0.85}
        toneMapped={false}
        onPointerOver={() => {
          if (imageRef.current) {
            imageRef.current.material.zoom = 1.15;
            document.body.style.cursor = "none"; // Maintain custom cursor pointer
          }
        }}
        onPointerOut={() => {
          if (imageRef.current) {
            imageRef.current.material.zoom = 1;
          }
        }}
      />
    </group>
  );
}
