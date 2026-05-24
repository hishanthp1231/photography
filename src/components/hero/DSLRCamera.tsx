"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DSLRCamera({ scrollProgress }: { scrollProgress: number }) {
  const cameraGroupRef = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Group>(null);

  // Mouse move parallax follow
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (cameraGroupRef.current) {
      // Gentle floating/bobbing effect (pitch, yaw, sway)
      const bobY = Math.sin(time * 0.8) * 0.06;
      const bobX = Math.cos(time * 0.5) * 0.03;
      const swayZ = Math.sin(time * 0.4) * 0.02;

      // Mouse parallax + slow rotation + scroll yaw profile rotation
      const targetX = mouse.current.y * 0.3;
      // When scrolling down, rotate the camera up to 75 degrees (1.3 radians) to show its 3D profile
      const targetY = mouse.current.x * 0.35 + (time * 0.04) + (scrollProgress * 1.3);

      cameraGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        cameraGroupRef.current.rotation.x,
        targetX,
        2.5 * delta
      );
      cameraGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        cameraGroupRef.current.rotation.y,
        targetY,
        2.5 * delta
      );
      cameraGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        cameraGroupRef.current.rotation.z,
        swayZ,
        2 * delta
      );

      // Camera position bobbing
      cameraGroupRef.current.position.y = THREE.MathUtils.lerp(
        cameraGroupRef.current.position.y,
        -0.2 + bobY,
        3 * delta
      );
      cameraGroupRef.current.position.x = THREE.MathUtils.lerp(
        cameraGroupRef.current.position.x,
        bobX,
        3 * delta
      );

      // Scroll-based depth zoom
      const targetZ = -2 - (scrollProgress * 2.2);
      cameraGroupRef.current.position.z = THREE.MathUtils.lerp(
        cameraGroupRef.current.position.z,
        targetZ,
        3.5 * delta
      );
    }

    if (lensRef.current) {
      // Spin the lens ring based on scroll
      const targetLensRotation = scrollProgress * Math.PI * 4;
      lensRef.current.rotation.z = THREE.MathUtils.lerp(
        lensRef.current.rotation.z,
        targetLensRotation,
        5 * delta
      );
    }
  });

  return (
    <group ref={cameraGroupRef} position={[0, -0.2, 0]} rotation={[0.1, 0, 0]}>
      {/* CAMERA BODY */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.6, 1.2]} />
        <meshStandardMaterial
          color="#141414"
          roughness={0.85}
          metalness={0.2}
          bumpScale={0.05}
        />
      </mesh>

      {/* Pentaprism top housing */}
      <mesh castShadow position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.3, 0.45, 0.35, 4, 1]} />
        <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.3} />
      </mesh>
      
      {/* Gold Hot Shoe Plate (flash mount) */}
      <mesh position={[0, 1.04, 0]}>
        <boxGeometry args={[0.22, 0.04, 0.28]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Camera Body Grip (Rubber Plate) */}
      <mesh position={[0.7, 0, 0.61]}>
        <boxGeometry args={[0.8, 1.4, 0.05]} />
        <meshStandardMaterial
          color="#0d0d0d"
          roughness={0.95}
          metalness={0.1}
        />
      </mesh>

      {/* Right Top Command Dial */}
      <mesh position={[0.8, 0.85, 0.2]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Left Top Dial */}
      <mesh position={[-0.8, 0.85, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Shutter Button */}
      <group position={[0.8, 0.85, 0.45]}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
          <meshStandardMaterial color="#1f1f1f" roughness={0.7} metalness={0.8} />
        </mesh>
      </group>

      {/* Viewfinder Hood */}
      <mesh position={[0, 0.9, -0.1]}>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.9, 0.11]}>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* CAMERA LENS ASSEMBLY */}
      <group ref={lensRef} position={[0, -0.05, 0.6]}>
        {/* Metal Lens Mount Ring */}
        <mesh position={[0, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.05, 64]} />
          <meshStandardMaterial color="#888888" roughness={0.15} metalness={0.95} />
        </mesh>

        {/* Main Outer Barrel */}
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 1.2, 64]} />
          <meshStandardMaterial color="#171717" roughness={0.7} metalness={0.4} />
        </mesh>

        {/* Lens Ring Accent 1 (Gold Ring) */}
        <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.855, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.2}
            metalness={0.9}
            emissive="#d4af37"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Lens Focus Ring (Ribbed Cylinder) */}
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.83, 0.83, 0.4, 64]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Lens Ring Accent 2 (Front Rim) */}
        <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.85, 0.05, 64]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Outer Ring Gold Text Overlay Ring */}
        <mesh position={[0, 0, 0.61]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.02, 64]} />
          <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* LENS GLASS (Immersive Reflection Element) */}
        <mesh position={[0, 0, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#f0d878"
            transmission={0.95}
            roughness={0.05}
            metalness={0.1}
            ior={1.6}
            thickness={0.5}
            specularIntensity={1}
            specularColor="#ffffff"
            clearcoat={1}
            clearcoatRoughness={0.02}
          />
        </mesh>

        {/* Inner Lens Element (secondary cyan coating reflection) */}
        <mesh position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#5ce1e6"
            transmission={0.92}
            roughness={0.1}
            metalness={0.1}
            ior={1.5}
            thickness={0.3}
          />
        </mesh>

        {/* Red ring (Canon L-Series style) */}
        <mesh position={[0, 0, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.81, 0.015, 8, 64]} />
          <meshBasicMaterial color="#e63946" />
        </mesh>

        {/* Flared Lens Hood */}
        <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.89, 0.81, 0.12, 64, 1, true]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.95} metalness={0.05} side={THREE.DoubleSide} />
        </mesh>

        {/* Deep Lens Interior Aperture */}
        <mesh position={[0, 0, 0.4]}>
          <circleGeometry args={[0.65, 32]} />
          <meshStandardMaterial
            color="#050505"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      </group>
      
      {/* Bottom Screw Mount Plate */}
      <mesh position={[0, -0.82, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.6]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.8} />
      </mesh>
    </group>
  );
}
