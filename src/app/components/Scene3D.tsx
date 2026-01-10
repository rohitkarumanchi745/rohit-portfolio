"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Wireframe globe with glowing effect - centered
function WireframeGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.1;
      globeRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group position={[-1.5, 0, 0]}>
      {/* Main wireframe sphere */}
      <mesh ref={globeRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshBasicMaterial
          color="#4f8fff"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#1e40af"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
      </mesh>

      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  );
}

// Connected nodes orbiting the globe
function OrbitingNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => [
    { angle: 0, radius: 1.9, y: 0.7, color: '#3b82f6', size: 0.12 },
    { angle: Math.PI * 0.4, radius: 2.0, y: -0.2, color: '#06b6d4', size: 0.1 },
    { angle: Math.PI * 0.7, radius: 1.8, y: 0.4, color: '#8b5cf6', size: 0.11 },
    { angle: Math.PI * 1.1, radius: 2.1, y: -0.5, color: '#3b82f6', size: 0.09 },
    { angle: Math.PI * 1.4, radius: 1.7, y: 0.15, color: '#06b6d4', size: 0.12 },
    { angle: Math.PI * 1.8, radius: 1.9, y: -0.3, color: '#8b5cf6', size: 0.1 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[-1.5, 0, 0]}>
      {nodes.map((node, i) => {
        const x = Math.cos(node.angle) * node.radius;
        const z = Math.sin(node.angle) * node.radius;

        return (
          <Float key={i} speed={2} floatIntensity={0.2}>
            <group position={[x, node.y, z]}>
              {/* Outer glow */}
              <mesh>
                <sphereGeometry args={[node.size * 1.5, 16, 16]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.15} />
              </mesh>
              {/* Inner node */}
              <mesh>
                <sphereGeometry args={[node.size, 16, 16]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.85} />
              </mesh>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

// Connection lines from globe to nodes
function ConnectionLines() {
  const groupRef = useRef<THREE.Group>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const linePositions = useMemo(() => {
    const positions: number[] = [];
    const nodePositions = [
      [0, 0.7, 1.9],
      [1.5, -0.2, 1.2],
      [1.2, 0.4, -1.4],
      [-0.7, -0.5, -2.0],
      [-1.7, 0.15, 0.4],
      [-1.0, -0.3, 1.6],
    ];

    // Lines from center to nodes
    nodePositions.forEach(pos => {
      positions.push(0, 0, 0);
      positions.push(pos[0], pos[1], pos[2]);
    });

    // Lines between nodes
    for (let i = 0; i < nodePositions.length; i++) {
      const next = (i + 1) % nodePositions.length;
      positions.push(nodePositions[i][0], nodePositions[i][1], nodePositions[i][2]);
      positions.push(nodePositions[next][0], nodePositions[next][1], nodePositions[next][2]);
    }

    return new Float32Array(positions);
  }, []);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    }
  }, [linePositions]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[-1.5, 0, 0]}>
      <lineSegments>
        <bufferGeometry ref={geometryRef} />
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

// Main flowing particle stream - the key visual
function ParticleStream({ yOffset = 0, color = "#8b5cf6", count = 1000, zOffset = 0 }: { yOffset?: number, color?: string, count?: number, zOffset?: number }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const { positions, speeds, baseY } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const baseY = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const progress = Math.random();
      positions[i * 3] = -1 + progress * 7; // X: from globe to right
      positions[i * 3 + 1] = yOffset + (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 2] = zOffset + (Math.random() - 0.5) * 1.5;
      speeds[i] = 0.008 + Math.random() * 0.015;
      baseY[i] = positions[i * 3 + 1];
    }

    return { positions, speeds, baseY };
  }, [count, yOffset, zOffset]);

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

          // Flow to the right
          pos[i3] += speeds[i];

          // Beautiful wave motion
          const x = pos[i3];
          pos[i3 + 1] = baseY[i] + Math.sin(x * 1.2 + time * 1.5) * 0.25 + Math.sin(x * 0.5 + time * 0.8) * 0.15;

          // Reset when reaching right edge
          if (pos[i3] > 6) {
            pos[i3] = -1;
          }
        }

        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.02}
        color={color}
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Ambient background particles
function BackgroundParticles({ count = 150 }: { count?: number }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return positions;
  }, [count]);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [positions]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.015}
        color="#6366f1"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating accent orb
function AccentOrb({ position, color, size }: { position: [number, number, number], color: string, size: number }) {
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[size * 1.5, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        <mesh>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// Main scene composition
function TechVisualization({ isMobile }: { isMobile: boolean }) {
  return (
    <group>
      {/* Globe on the left side */}
      <WireframeGlobe />
      <OrbitingNodes />
      <ConnectionLines />

      {/* Multiple flowing particle streams - key visual */}
      <ParticleStream yOffset={0} color="#8b5cf6" count={isMobile ? 500 : 1000} zOffset={0} />
      <ParticleStream yOffset={0.4} color="#06b6d4" count={isMobile ? 400 : 800} zOffset={0.3} />
      <ParticleStream yOffset={-0.4} color="#3b82f6" count={isMobile ? 400 : 800} zOffset={-0.3} />
      <ParticleStream yOffset={0.8} color="#a78bfa" count={isMobile ? 250 : 500} zOffset={0.5} />
      <ParticleStream yOffset={-0.8} color="#22d3ee" count={isMobile ? 250 : 500} zOffset={-0.5} />

      {/* Accent orbs */}
      <AccentOrb position={[3.5, 0.3, 0.5]} color="#06b6d4" size={0.15} />
      <AccentOrb position={[2, -0.8, -0.3]} color="#8b5cf6" size={0.1} />

      {/* Background particles */}
      <BackgroundParticles count={isMobile ? 80 : 150} />
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
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
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
          {/* Deep blue/purple background */}
          <color attach="background" args={['#0c0a1a']} />

          {/* Subtle ambient light */}
          <ambientLight intensity={0.1} />

          {/* Colored lights for glow effects */}
          <pointLight position={[-2, 0, 2]} intensity={1.2} color="#3b82f6" distance={6} decay={2} />
          <pointLight position={[2, 1, 2]} intensity={0.6} color="#8b5cf6" distance={5} decay={2} />
          <pointLight position={[0, -1, 3]} intensity={0.4} color="#06b6d4" distance={4} decay={2} />

          {/* Main visualization */}
          <TechVisualization isMobile={isMobile} />

          {/* Camera controls - limited movement */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 10}
            maxAzimuthAngle={Math.PI / 10}
            autoRotate={false}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
