"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Smooth flowing particle field - main visual element
function FlowingParticles({ count = 3000, color = "#8b5cf6" }: { count?: number, color?: string }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread in a wide field
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      // Random velocities for flow
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions, velocities };
  }, [count]);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [positions]);

  useFrame((state) => {
    if (geometryRef.current) {
      const posAttr = geometryRef.current.attributes.position;
      if (posAttr) {
        const pos = posAttr.array as Float32Array;
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;

          // Flowing motion with noise-like movement
          pos[i3] += Math.sin(time * 0.3 + pos[i3 + 1] * 0.5) * 0.003;
          pos[i3 + 1] += Math.cos(time * 0.2 + pos[i3] * 0.3) * 0.002;
          pos[i3 + 2] += Math.sin(time * 0.25 + pos[i3] * 0.4) * 0.003;

          // Boundary wrap
          if (pos[i3] > 6) pos[i3] = -6;
          if (pos[i3] < -6) pos[i3] = 6;
          if (pos[i3 + 1] > 4) pos[i3 + 1] = -4;
          if (pos[i3 + 1] < -4) pos[i3 + 1] = 4;
          if (pos[i3 + 2] > 6) pos[i3 + 2] = -6;
          if (pos[i3 + 2] < -6) pos[i3 + 2] = 6;
        }

        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.015}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Glowing orbs floating around
function GlowingOrbs({ count = 20 }: { count?: number }) {
  const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#6366f1', '#818cf8'];

  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      size: 0.03 + Math.random() * 0.08,
      color: colors[i % colors.length],
      speed: 0.5 + Math.random() * 1.5,
    }));
  }, [count]);

  return (
    <group>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} floatIntensity={0.8} rotationIntensity={0}>
          <Sphere args={[orb.size, 16, 16]} position={orb.position}>
            <meshBasicMaterial color={orb.color} transparent opacity={0.8} />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

// Central pulsing core
function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.15;
      coreRef.current.rotation.x = time * 0.1;
    }

    if (glowRef.current) {
      const scale = 1 + Math.sin(time * 1.5) * 0.15;
      glowRef.current.scale.setScalar(scale);
    }

    if (outerRef.current) {
      const scale = 1 + Math.sin(time * 1.2 + 1) * 0.1;
      outerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Wireframe icosahedron core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.9} />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>

      {/* Outer glow */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.1} />
      </mesh>

      {/* Bright center point */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#e0e7ff" />
      </mesh>
    </group>
  );
}

// Smooth orbital rings
function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[1.2, 0.3, 0]}>
        <torusGeometry args={[1.3, 0.006, 16, 100]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0.8, -0.2, 0]}>
        <torusGeometry args={[1.6, 0.005, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Subtle connection lines between nearby particles
function ConnectionLines({ nodeCount = 25 }: { nodeCount?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const { nodes, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];

    // Create nodes in spherical distribution
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 2 + Math.random() * 0.8;

      nodes.push(new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ));
    }

    // Create connections
    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < 1.8) {
          linePositions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }

    return { nodes, linePositions: new Float32Array(linePositions) };
  }, [nodeCount]);

  useEffect(() => {
    if (geometryRef.current && linePositions.length > 0) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    }
  }, [linePositions]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {linePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry ref={geometryRef} />
          <lineBasicMaterial color="#6366f1" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </lineSegments>
      )}

      {/* Node points */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial
            color={['#8b5cf6', '#a78bfa', '#6366f1'][i % 3]}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main scene composition
function AbstractScene({ isMobile }: { isMobile: boolean }) {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneRef.current) {
      // Very subtle scene breathing
      const time = state.clock.getElapsedTime();
      sceneRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Central core with rings */}
      <CentralCore />
      <OrbitalRings />

      {/* Connection network */}
      <ConnectionLines nodeCount={isMobile ? 15 : 25} />

      {/* Flowing particle field */}
      <FlowingParticles count={isMobile ? 1500 : 3000} color="#8b5cf6" />
      <FlowingParticles count={isMobile ? 800 : 1500} color="#6366f1" />

      {/* Floating glowing orbs */}
      <GlowingOrbs count={isMobile ? 12 : 25} />
    </group>
  );
}

// Main export
export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isReady) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        className="cursor-grab active:cursor-grabbing"
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Deep space background color */}
          <color attach="background" args={['#0a0a1a']} />

          {/* Subtle ambient light */}
          <ambientLight intensity={0.1} />

          {/* Colored point lights for glow */}
          <pointLight position={[0, 0, 2]} intensity={1} color="#8b5cf6" distance={10} decay={2} />
          <pointLight position={[3, 2, 0]} intensity={0.5} color="#6366f1" distance={8} decay={2} />
          <pointLight position={[-3, -1, 1]} intensity={0.3} color="#a78bfa" distance={6} decay={2} />

          {/* Main scene */}
          <AbstractScene isMobile={isMobile} />

          {/* Camera controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI - Math.PI / 3}
            autoRotate
            autoRotateSpeed={0.3}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
