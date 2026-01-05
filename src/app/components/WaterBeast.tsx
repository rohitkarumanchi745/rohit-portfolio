"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, RoundedBox } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// Natural Beast with organic animations
const NaturalBeast = () => {
  const bodyRef = useRef<any>(null);
  const headRef = useRef<any>(null);
  const tailRef = useRef<any>(null);
  const leftEarRef = useRef<any>(null);
  const rightEarRef = useRef<any>(null);

  // Procedural Animation Logic
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. "Breathing" effect (subtle scaling of the body)
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(t * 1.5) * 0.02;
      bodyRef.current.scale.z = 1 + Math.cos(t * 1.5) * 0.01;
    }

    // 2. Tail wagging (sin wave rotation)
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 3) * 0.2;
    }

    // 3. Ear twitching (intermittent movement)
    if (leftEarRef.current) {
      leftEarRef.current.rotation.z = -0.4 + Math.sin(t * 2) * 0.05;
    }
    if (rightEarRef.current) {
      rightEarRef.current.rotation.z = 0.4 + Math.cos(t * 2) * 0.05;
    }

    // 4. Natural Head Tracking (look at mouse)
    if (headRef.current) {
      const { x, y } = state.mouse;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, x * 0.5, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -y * 0.3, 0.1);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Body - Using RoundedBox for a more organic "natural" feel */}
      <RoundedBox ref={bodyRef} args={[1.3, 0.9, 2]} radius={0.2} smoothness={4} castShadow>
        <meshStandardMaterial color="#4a90e2" roughness={0.6} />
      </RoundedBox>

      {/* Head */}
      <group ref={headRef} position={[0, 0.6, 1.1]}>
        <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.15} smoothness={4} castShadow>
          <meshStandardMaterial color="#4a90e2" />
        </RoundedBox>

        {/* Ears */}
        <mesh ref={leftEarRef} position={[0.4, 0.4, 0]} rotation={[0.2, 0, -0.4]}>
          <boxGeometry args={[0.1, 0.5, 0.3]} />
          <meshStandardMaterial color="#1a2b4b" />
        </mesh>
        <mesh ref={rightEarRef} position={[-0.4, 0.4, 0]} rotation={[0.2, 0, 0.4]}>
          <boxGeometry args={[0.1, 0.5, 0.3]} />
          <meshStandardMaterial color="#1a2b4b" />
        </mesh>
      </group>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, 0.2, -1.1]} rotation={[0.4, 0, 0]}>
        <RoundedBox args={[0.2, 0.2, 0.8]} radius={0.05}>
          <meshStandardMaterial color="#4a90e2" />
        </RoundedBox>
      </mesh>

      {/* Legs - Static but positioned naturally */}
      {[[-0.4, -0.5, 0.7], [0.4, -0.5, 0.7], [-0.4, -0.5, -0.7], [0.4, -0.5, -0.7]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <capsuleGeometry args={[0.15, 0.5, 4, 8]} />
          <meshStandardMaterial color="#4a90e2" />
        </mesh>
      ))}
    </group>
  );
};

// Main 3D Scene
export default function WaterBeast() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />

          <NaturalBeast />

          <ContactShadows opacity={0.2} scale={10} blur={2} far={1} />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
