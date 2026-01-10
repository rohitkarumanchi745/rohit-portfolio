"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sphere } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Flowing particle wave system
function ParticleWave({ count = 2000, color = "#06b6d4", yOffset = 0, speed = 1 }: { count?: number, color?: string, yOffset?: number, speed?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 2 + yOffset;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, [count, yOffset]);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    }
  }, [particles]);

  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      const time = state.clock.getElapsedTime() * speed;
      const posAttr = geometryRef.current.attributes.position;
      if (posAttr) {
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const x = positions[i3];
          const z = positions[i3 + 2];

          // Create wave motion
          positions[i3 + 1] = yOffset + Math.sin(x * 0.5 + time) * 0.3 + Math.sin(z * 0.5 + time * 0.8) * 0.2;
        }

        posAttr.needsUpdate = true;
      }
      meshRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Neural network-style connections
function NeuralNetwork({ nodeCount = 30 }: { nodeCount?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);

  const { nodes, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const linePositions: number[] = [];

    // Create nodes in a spherical arrangement
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.5 + Math.random() * 0.5;

      nodes.push(new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ));
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < 1.2) {
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
    if (linesGeometryRef.current) {
      linesGeometryRef.current.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    }
  }, [linePositions]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef} />
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((pos, i) => (
        <Float key={i} speed={2 + i % 3} floatIntensity={0.3}>
          <mesh position={pos}>
            <sphereGeometry args={[0.04 + (i % 3) * 0.02, 12, 12]} />
            <meshBasicMaterial
              color={['#8b5cf6', '#3b82f6', '#06b6d4', '#22c55e'][i % 4]}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Data stream lines flowing upward
function DataStream({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const particleCount = 50;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = (i / particleCount) * 4 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    return positions;
  }, []);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    }
  }, [particles]);

  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      const posAttr = geometryRef.current.attributes.position;
      if (posAttr) {
        const positions = posAttr.array as Float32Array;
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += 0.03;
          if (positions[i * 3 + 1] > 2) {
            positions[i * 3 + 1] = -2;
          }
          positions[i * 3] = Math.sin(time + i * 0.1) * 0.15;
          positions[i * 3 + 2] = Math.cos(time + i * 0.1) * 0.15;
        }

        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={meshRef} position={position}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Glowing central orb
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.x = time * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Inner core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.4, 2]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Bright center */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#c4b5fd" />
      </mesh>
    </group>
  );
}

// Orbiting rings
function OrbitRing({ radius, speed, color, tilt }: { radius: number, speed: number, color: string, tilt: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

// Floating data particles in background
function BackgroundParticles({ count = 500 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#22c55e'),
    ];

    for (let i = 0; i < count; i++) {
      // Spread particles in a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 3 + Math.random() * 5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [count]);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
      geometryRef.current.setAttribute('color', new THREE.BufferAttribute(particles.colors, 3));
    }
  }, [particles]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main abstract data scene
function AbstractDataScene({ isMobile }: { isMobile: boolean }) {
  return (
    <group>
      {/* Central glowing orb */}
      <CentralOrb />

      {/* Orbiting rings */}
      <OrbitRing radius={0.8} speed={0.5} color="#8b5cf6" tilt={0.5} />
      <OrbitRing radius={1.1} speed={-0.3} color="#3b82f6" tilt={1.2} />
      <OrbitRing radius={1.4} speed={0.2} color="#06b6d4" tilt={0.8} />

      {/* Neural network connections */}
      <NeuralNetwork nodeCount={isMobile ? 20 : 35} />

      {/* Particle waves */}
      <ParticleWave count={isMobile ? 800 : 1500} color="#06b6d4" yOffset={-1} speed={0.8} />
      <ParticleWave count={isMobile ? 600 : 1200} color="#8b5cf6" yOffset={0.5} speed={0.6} />

      {/* Data streams */}
      <DataStream position={[-2, 0, -1]} color="#22c55e" />
      <DataStream position={[2, 0, -1]} color="#3b82f6" />
      <DataStream position={[0, 0, -2]} color="#8b5cf6" />
      <DataStream position={[-1.5, 0, 1]} color="#06b6d4" />
      <DataStream position={[1.5, 0, 1]} color="#f59e0b" />

      {/* Background floating particles */}
      <BackgroundParticles count={isMobile ? 300 : 600} />

      {/* Floating glowing orbs */}
      {[...Array(isMobile ? 8 : 15)].map((_, i) => {
        const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#22c55e', '#f59e0b'];
        return (
          <Float
            key={i}
            speed={1.5 + (i % 3) * 0.5}
            rotationIntensity={0.2}
            floatIntensity={1}
          >
            <Sphere
              args={[0.05 + (i % 3) * 0.02, 16, 16]}
              position={[
                Math.sin(i * 0.8) * 3,
                Math.cos(i * 0.5) * 1.5,
                Math.cos(i * 0.8) * 3,
              ]}
            >
              <meshBasicMaterial
                color={colors[i % colors.length]}
                transparent
                opacity={0.9}
              />
            </Sphere>
          </Float>
        );
      })}
    </group>
  );
}

// Main 3D Scene export
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
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        className="cursor-grab active:cursor-grabbing"
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Subtle ambient light */}
          <ambientLight intensity={0.2} />

          {/* Point lights for glow effect */}
          <pointLight position={[0, 0, 0]} intensity={2} color="#8b5cf6" distance={5} decay={2} />
          <pointLight position={[2, 2, 2]} intensity={1} color="#3b82f6" distance={8} decay={2} />
          <pointLight position={[-2, -1, 2]} intensity={0.8} color="#06b6d4" distance={6} decay={2} />

          {/* Stars background */}
          <Stars
            radius={80}
            depth={50}
            count={isMobile ? 2000 : 5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* Main abstract scene */}
          <AbstractDataScene isMobile={isMobile} />

          {/* Camera controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
            autoRotate
            autoRotateSpeed={isMobile ? 0.3 : 0.5}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
