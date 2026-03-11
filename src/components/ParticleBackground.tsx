"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function StarField() {
  const meshRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 2500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 120;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 120;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const count = 2500;
    const arr = new Float32Array(count * 3);
    const palette = [
      [0, 0.96, 1],        // cyan
      [0.3, 0.47, 1],      // blue
      [1, 0, 1],           // magenta
      [0.54, 0.36, 0.96],  // purple
      [1, 1, 1],           // white
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      const mix = Math.random() * 0.7 + 0.3;
      arr[i * 3] = c[0] * mix;
      arr[i * 3 + 1] = c[1] * mix;
      arr[i * 3 + 2] = c[2] * mix;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.012;
      meshRef.current.rotation.x = Math.sin(t * 0.005) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function NebulaClouds() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.006;
    }
  });

  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          -20 - Math.random() * 20,
        ] as [number, number, number],
        scale: 8 + Math.random() * 12,
        color: i % 3 === 0 ? "#00F5FF" : i % 3 === 1 ? "#FF00FF" : "#4D79FF",
      })),
    []
  );

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={cloud.pos}>
          <sphereGeometry args={[cloud.scale, 8, 8]} />
          <meshBasicMaterial color={cloud.color} transparent opacity={0.02} />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none particle-bg transition-opacity duration-300">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 65 }}
        style={{ background: "transparent" }}
        gl={{ antialias: false, alpha: true }}
      >
        <StarField />
        <NebulaClouds />
      </Canvas>
    </div>
  );
}
