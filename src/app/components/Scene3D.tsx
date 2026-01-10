"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Text } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Wireframe globe with glowing effect
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
    <group position={[-2, 0, 0]}>
      {/* Main wireframe sphere */}
      <mesh ref={globeRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          color="#4f8fff"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color="#1e40af"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
      </mesh>

      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

// Connected nodes orbiting the globe with icons
function OrbitingNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => [
    { angle: 0, radius: 2.2, y: 0.8, color: '#3b82f6', size: 0.18 },
    { angle: Math.PI * 0.4, radius: 2.3, y: -0.3, color: '#06b6d4', size: 0.15 },
    { angle: Math.PI * 0.7, radius: 2.1, y: 0.5, color: '#8b5cf6', size: 0.16 },
    { angle: Math.PI * 1.1, radius: 2.4, y: -0.6, color: '#3b82f6', size: 0.14 },
    { angle: Math.PI * 1.4, radius: 2.0, y: 0.2, color: '#06b6d4', size: 0.17 },
    { angle: Math.PI * 1.8, radius: 2.2, y: -0.4, color: '#8b5cf6', size: 0.15 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[-2, 0, 0]}>
      {nodes.map((node, i) => {
        const x = Math.cos(node.angle) * node.radius;
        const z = Math.sin(node.angle) * node.radius;

        return (
          <group key={i}>
            {/* Node sphere with glow */}
            <Float speed={2} floatIntensity={0.3}>
              <group position={[x, node.y, z]}>
                {/* Outer glow */}
                <mesh>
                  <sphereGeometry args={[node.size * 1.8, 16, 16]} />
                  <meshBasicMaterial color={node.color} transparent opacity={0.2} />
                </mesh>
                {/* Inner node */}
                <mesh>
                  <sphereGeometry args={[node.size, 16, 16]} />
                  <meshBasicMaterial color={node.color} transparent opacity={0.9} />
                </mesh>
                {/* Bright center */}
                <mesh>
                  <sphereGeometry args={[node.size * 0.5, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
                </mesh>
              </group>
            </Float>
          </group>
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
      [0, 0.8, 2.2],
      [1.8, -0.3, 1.4],
      [1.4, 0.5, -1.6],
      [-0.8, -0.6, -2.3],
      [-2.0, 0.2, 0.5],
      [-1.2, -0.4, 1.9],
    ];

    // Lines from center to nodes
    nodePositions.forEach(pos => {
      positions.push(0, 0, 0);
      positions.push(pos[0], pos[1], pos[2]);
    });

    // Lines between some nodes
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
    <group ref={groupRef} position={[-2, 0, 0]}>
      <lineSegments>
        <bufferGeometry ref={geometryRef} />
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

// Flowing particle wave stream (the main visual flowing to the right)
function ParticleStream({ yOffset = 0, color = "#8b5cf6", count = 800 }: { yOffset?: number, color?: string, count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Start from left side, flow to right
      const progress = Math.random();
      positions[i * 3] = -0.5 + progress * 8; // X: -0.5 to 7.5
      positions[i * 3 + 1] = yOffset + (Math.random() - 0.5) * 1.5; // Y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2; // Z spread
      speeds[i] = 0.01 + Math.random() * 0.02;
    }

    return { positions, speeds };
  }, [count, yOffset]);

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

          // Wave motion
          pos[i3 + 1] = yOffset + Math.sin(pos[i3] * 0.8 + time * 2) * 0.3 +
                        Math.sin(pos[i3] * 0.3 + time) * 0.2;
          pos[i3 + 2] += Math.sin(time + i * 0.1) * 0.002;

          // Reset when reaching right edge
          if (pos[i3] > 7) {
            pos[i3] = -0.5;
            pos[i3 + 2] = (Math.random() - 0.5) * 2;
          }
        }

        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.025}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Flowing wave lines (like audio waveform)
function WaveLines({ count = 5 }: { count?: number }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, idx) => {
        if (line instanceof THREE.Line) {
          const positions = (line.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
          const time = state.clock.getElapsedTime();
          const offset = idx * 0.5;

          for (let i = 0; i < positions.length / 3; i++) {
            const x = positions[i * 3];
            positions[i * 3 + 1] = Math.sin(x * 0.5 + time * 2 + offset) * 0.4 * (1 - Math.abs(x - 3) / 5);
          }

          (line.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
        }
      });
    }
  });

  const lines = useMemo(() => {
    return Array.from({ length: count }, (_, idx) => {
      const points = [];
      for (let i = 0; i <= 80; i++) {
        const x = (i / 80) * 8 - 0.5;
        const y = (idx - count / 2) * 0.3;
        points.push(new THREE.Vector3(x, y, 0));
      }
      return points;
    });
  }, [count]);

  return (
    <group ref={linesRef} position={[0, 0, 0]}>
      {lines.map((points, idx) => (
        <line key={idx}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={idx % 2 === 0 ? "#8b5cf6" : "#06b6d4"}
            transparent
            opacity={0.3}
          />
        </line>
      ))}
    </group>
  );
}

// Ambient floating particles in background
function BackgroundParticles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
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
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main scene composition
function TechVisualization({ isMobile }: { isMobile: boolean }) {
  return (
    <group>
      {/* Globe on the left */}
      <WireframeGlobe />
      <OrbitingNodes />
      <ConnectionLines />

      {/* Flowing particle streams */}
      <ParticleStream yOffset={0} color="#8b5cf6" count={isMobile ? 400 : 800} />
      <ParticleStream yOffset={0.5} color="#06b6d4" count={isMobile ? 300 : 600} />
      <ParticleStream yOffset={-0.5} color="#3b82f6" count={isMobile ? 300 : 600} />

      {/* Wave lines */}
      <WaveLines count={isMobile ? 3 : 5} />

      {/* Background particles */}
      <BackgroundParticles count={isMobile ? 100 : 200} />
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
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 rounded-2xl">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 rounded-2xl overflow-hidden">
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
          {/* Deep blue/purple background */}
          <color attach="background" args={['#0c0a1d']} />

          {/* Subtle ambient light */}
          <ambientLight intensity={0.15} />

          {/* Colored lights for glow effects */}
          <pointLight position={[-3, 0, 2]} intensity={1.5} color="#3b82f6" distance={8} decay={2} />
          <pointLight position={[2, 1, 2]} intensity={0.8} color="#8b5cf6" distance={6} decay={2} />
          <pointLight position={[0, -1, 3]} intensity={0.5} color="#06b6d4" distance={5} decay={2} />

          {/* Main visualization */}
          <TechVisualization isMobile={isMobile} />

          {/* Camera controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 8}
            maxAzimuthAngle={Math.PI / 8}
            autoRotate={false}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
