"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sphere, RoundedBox } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';

// Animated typing cursor on laptop screen
function TypingCursor() {
  const cursorRef = useRef<any>(null);

  useFrame((state) => {
    if (cursorRef.current) {
      cursorRef.current.material.opacity = Math.sin(state.clock.getElapsedTime() * 4) > 0 ? 1 : 0;
    }
  });

  return (
    <mesh ref={cursorRef} position={[0.3, 0.02, 0.01]}>
      <boxGeometry args={[0.02, 0.08, 0.001]} />
      <meshBasicMaterial color="#00ff00" transparent opacity={1} />
    </mesh>
  );
}

// Floating tech shape component (brackets, cubes, etc.)
function FloatingTechShape({ position, shape, color, speed = 1 }: { position: [number, number, number], shape: string, color: string, speed?: number }) {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * speed * 0.3) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.15;
    }
  });

  // Different shapes for different tech concepts
  const renderShape = () => {
    switch (shape) {
      case 'brackets': // Code brackets < >
        return (
          <group>
            <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
              <boxGeometry args={[0.02, 0.15, 0.02]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
            </mesh>
            <mesh position={[-0.05, 0.06, 0]} rotation={[0, 0, -Math.PI / 6]}>
              <boxGeometry args={[0.02, 0.08, 0.02]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
            </mesh>
            <mesh position={[0.08, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
              <boxGeometry args={[0.02, 0.15, 0.02]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
            </mesh>
            <mesh position={[0.05, 0.06, 0]} rotation={[0, 0, Math.PI / 6]}>
              <boxGeometry args={[0.02, 0.08, 0.02]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
            </mesh>
          </group>
        );
      case 'cube': // Data cube
        return (
          <mesh>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} wireframe />
          </mesh>
        );
      case 'ring': // Processing ring
        return (
          <mesh>
            <torusGeometry args={[0.08, 0.02, 8, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
          </mesh>
        );
      case 'diamond': // Database
        return (
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.08]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
        );
      case 'pyramid': // Cloud/Infrastructure
        return (
          <mesh>
            <tetrahedronGeometry args={[0.1]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
        );
      case 'cross': // Plus/API
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.15, 0.03, 0.03]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
            </mesh>
            <mesh>
              <boxGeometry args={[0.03, 0.15, 0.03]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
            </mesh>
          </group>
        );
      default:
        return (
          <Sphere args={[0.06, 16, 16]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
          </Sphere>
        );
    }
  };

  return (
    <group ref={meshRef} position={position}>
      {renderShape()}
    </group>
  );
}

// Animated Laptop component
function Laptop({ isDark }: { isDark: boolean }) {
  const screenRef = useRef<any>(null);

  useFrame((state) => {
    // Subtle screen glow pulse
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  const bodyColor = isDark ? "#1a1a2e" : "#2d3748";
  const keyboardColor = isDark ? "#0f0f1a" : "#1a202c";

  return (
    <group position={[0, 0.1, 0.3]} rotation={[0.1, 0, 0]}>
      {/* Laptop base */}
      <RoundedBox args={[1.4, 0.06, 0.9]} radius={0.02} smoothness={4} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.3} />
      </RoundedBox>

      {/* Keyboard area */}
      <mesh position={[0, 0.035, 0.05]} castShadow>
        <boxGeometry args={[1.2, 0.01, 0.6]} />
        <meshStandardMaterial color={keyboardColor} roughness={0.9} />
      </mesh>

      {/* Keyboard keys */}
      {[...Array(4)].map((_, row) => (
        [...Array(10)].map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[-0.5 + col * 0.11, 0.045, -0.15 + row * 0.12]}
            castShadow
          >
            <boxGeometry args={[0.08, 0.015, 0.08]} />
            <meshStandardMaterial
              color={isDark ? "#252540" : "#374151"}
              roughness={0.7}
            />
          </mesh>
        ))
      ))}

      {/* Trackpad */}
      <mesh position={[0, 0.04, 0.32]} castShadow>
        <boxGeometry args={[0.4, 0.005, 0.25]} />
        <meshStandardMaterial color={isDark ? "#1f1f35" : "#4a5568"} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Screen (lid) */}
      <group position={[0, 0.45, -0.42]} rotation={[-0.3, 0, 0]}>
        {/* Screen frame */}
        <RoundedBox args={[1.4, 0.9, 0.04]} radius={0.02} smoothness={4} castShadow>
          <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.3} />
        </RoundedBox>

        {/* Screen display */}
        <mesh ref={screenRef} position={[0, 0, 0.025]}>
          <planeGeometry args={[1.25, 0.75]} />
          <meshStandardMaterial
            color={isDark ? "#0a0a15" : "#1e293b"}
            emissive="#3b82f6"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Code lines on screen */}
        {[...Array(8)].map((_, i) => (
          <mesh key={`line-${i}`} position={[-0.4 + (i % 3) * 0.1, 0.25 - i * 0.08, 0.03]}>
            <boxGeometry args={[0.3 + Math.random() * 0.4, 0.025, 0.001]} />
            <meshBasicMaterial
              color={['#22c55e', '#3b82f6', '#a855f7', '#f59e0b'][i % 4]}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}

        {/* Typing cursor */}
        <TypingCursor />

        {/* Camera dot */}
        <mesh position={[0, 0.4, 0.025]}>
          <circleGeometry args={[0.015, 16]} />
          <meshBasicMaterial color="#1f2937" />
        </mesh>
      </group>
    </group>
  );
}

// Server Rack component
function ServerRack({ position, isDark }: { position: [number, number, number], isDark: boolean }) {
  const lightsRef = useRef<any[]>([]);

  useFrame((state) => {
    lightsRef.current.forEach((light, i) => {
      if (light) {
        const blinkSpeed = 2 + i * 0.5;
        light.material.emissiveIntensity = Math.sin(state.clock.getElapsedTime() * blinkSpeed + i) > 0.3 ? 1.5 : 0.3;
      }
    });
  });

  const rackColor = isDark ? "#1a1a2e" : "#374151";

  return (
    <group position={position}>
      {/* Main rack body */}
      <RoundedBox args={[0.5, 1.2, 0.4]} radius={0.02} smoothness={4} castShadow>
        <meshStandardMaterial color={rackColor} metalness={0.7} roughness={0.4} />
      </RoundedBox>

      {/* Server units */}
      {[...Array(5)].map((_, i) => (
        <group key={`server-${i}`} position={[0, 0.4 - i * 0.22, 0.21]}>
          {/* Server face */}
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.18, 0.02]} />
            <meshStandardMaterial color={isDark ? "#252540" : "#4b5563"} metalness={0.5} roughness={0.5} />
          </mesh>

          {/* Status lights */}
          {[...Array(3)].map((_, j) => (
            <mesh
              key={`light-${i}-${j}`}
              position={[-0.15 + j * 0.08, 0.05, 0.015]}
              ref={(el) => { if (el) lightsRef.current[i * 3 + j] = el; }}
            >
              <circleGeometry args={[0.012, 8]} />
              <meshStandardMaterial
                color={['#22c55e', '#f59e0b', '#3b82f6'][j]}
                emissive={['#22c55e', '#f59e0b', '#3b82f6'][j]}
                emissiveIntensity={1}
                toneMapped={false}
              />
            </mesh>
          ))}

          {/* Ventilation slots */}
          {[...Array(6)].map((_, j) => (
            <mesh key={`vent-${i}-${j}`} position={[0.05 + j * 0.04, -0.02, 0.015]}>
              <boxGeometry args={[0.02, 0.06, 0.005]} />
              <meshStandardMaterial color="#0a0a15" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Floating Data Orb
function DataOrb({ position, color, size = 0.1 }: { position: [number, number, number], color: string, size?: number }) {
  const orbRef = useRef<any>(null);
  const ringRef = useRef<any>(null);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 2;
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 1.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={orbRef} position={position}>
        {/* Core orb */}
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
            toneMapped={false}
          />
        </Sphere>

        {/* Orbiting ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[size * 1.5, size * 0.1, 8, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Circuit Board Platform
function CircuitPlatform({ isDark }: { isDark: boolean }) {
  const platformColor = isDark ? "#0f172a" : "#1e293b";
  const circuitColor = isDark ? "#22c55e" : "#10b981";

  return (
    <group position={[0, -0.8, 0]}>
      {/* Main platform */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.5, 64]} />
        <meshStandardMaterial
          color={platformColor}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Circuit traces */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const length = 1.5 + Math.random() * 1.5;
        return (
          <mesh
            key={`trace-${i}`}
            position={[Math.cos(angle) * 1.5, -0.79, Math.sin(angle) * 1.5]}
            rotation={[-Math.PI / 2, 0, angle]}
          >
            <boxGeometry args={[0.03, length, 0.005]} />
            <meshStandardMaterial
              color={circuitColor}
              emissive={circuitColor}
              emissiveIntensity={isDark ? 0.5 : 0.3}
            />
          </mesh>
        );
      })}

      {/* Circuit nodes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2 + (i % 2) * 0.8;
        return (
          <mesh
            key={`node-${i}`}
            position={[Math.cos(angle) * radius, -0.78, Math.sin(angle) * radius]}
          >
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            <meshStandardMaterial
              color={circuitColor}
              emissive={circuitColor}
              emissiveIntensity={isDark ? 0.8 : 0.4}
              metalness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Tech Stack Icons floating around
function TechIcons() {
  const techShapes = [
    { shape: 'brackets', color: '#f59e0b', position: [-2, 1.2, 1] as [number, number, number], speed: 1.2 },
    { shape: 'cube',     color: '#3b82f6', position: [2.2, 0.8, 0.5] as [number, number, number], speed: 0.8 },
    { shape: 'ring',     color: '#22c55e', position: [-1.8, 0.5, -1.5] as [number, number, number], speed: 1.5 },
    { shape: 'diamond',  color: '#a855f7', position: [1.5, 1.5, -1] as [number, number, number], speed: 1.0 },
    { shape: 'pyramid',  color: '#ec4899', position: [-2.5, 1, -0.5] as [number, number, number], speed: 1.3 },
    { shape: 'cross',    color: '#06b6d4', position: [2.5, 1.2, -0.8] as [number, number, number], speed: 0.9 },
  ];

  return (
    <>
      {techShapes.map((item, i) => (
        <FloatingTechShape key={i} {...item} />
      ))}
    </>
  );
}

// Main Tech Scene
function TechScene({ isDark }: { isDark: boolean }) {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Circuit board platform */}
      <CircuitPlatform isDark={isDark} />

      {/* Main laptop */}
      <Laptop isDark={isDark} />

      {/* Server racks */}
      <ServerRack position={[-1.8, -0.2, -0.5]} isDark={isDark} />
      <ServerRack position={[1.8, -0.2, -0.5]} isDark={isDark} />

      {/* Floating data orbs */}
      <DataOrb position={[-1.2, 0.8, 0.8]} color="#8b5cf6" size={0.08} />
      <DataOrb position={[1.3, 1, 0.6]} color="#3b82f6" size={0.1} />
      <DataOrb position={[0, 1.5, -0.5]} color="#06b6d4" size={0.07} />
      <DataOrb position={[-0.8, 1.2, -0.8]} color="#22c55e" size={0.06} />
      <DataOrb position={[0.9, 0.6, -1]} color="#f59e0b" size={0.09} />

      {/* Floating code symbols */}
      <TechIcons />

      {/* Additional floating orbs for ambiance */}
      {[...Array(10)].map((_, i) => {
        const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#a855f7', '#22c55e'];
        const color = colors[i % colors.length];
        return (
          <Float
            key={`orb-${i}`}
            speed={1.5 + Math.random() * 2}
            rotationIntensity={0.3}
            floatIntensity={1.5}
          >
            <Sphere
              args={[0.04 + Math.random() * 0.03, 16, 16]}
              position={[
                (Math.random() - 0.5) * 6,
                0.5 + Math.random() * 2,
                (Math.random() - 0.5) * 4,
              ]}
            >
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                transparent
                opacity={0.9}
                toneMapped={false}
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
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);

    const checkDarkMode = () => {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(darkModeQuery.matches);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDarkMode();
    checkMobile();

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeQuery.addEventListener('change', listener);
    window.addEventListener('resize', checkMobile);

    return () => {
      clearTimeout(timer);
      darkModeQuery.removeEventListener('change', listener);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const fogColor = isDark ? '#0f172a' : '#f8fafc';
  const ambientColor = isDark ? '#b8c5d6' : '#e0e7ff';
  const sunColor = isDark ? '#e6f0ff' : '#fef3c7';

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
        camera={{ position: [0, 2.5, 6], fov: 50 }}
        shadows={!isMobile}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        className="cursor-grab active:cursor-grabbing"
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={isDark ? 0.3 : 0.5} color={ambientColor} />

          <directionalLight
            position={[8, 10, 5]}
            intensity={isDark ? 1.2 : 1.8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            color={sunColor}
          />

          <directionalLight
            position={[-5, 3, -5]}
            intensity={isDark ? 0.4 : 0.6}
            color="#4f46e5"
          />

          {/* Colored accent lights */}
          <pointLight position={[-4, 4, -4]} intensity={isDark ? 1.2 : 0.8} color="#8b5cf6" distance={15} decay={2} />
          <pointLight position={[4, 3, 4]} intensity={isDark ? 0.8 : 0.6} color="#3b82f6" distance={12} decay={2} />
          <pointLight position={[0, 5, -6]} intensity={isDark ? 0.6 : 0.4} color="#06b6d4" distance={10} decay={2} />

          {/* Screen glow light */}
          <pointLight position={[0, 0.5, 1]} intensity={0.5} color="#3b82f6" distance={3} decay={2} />

          {/* Stars - only in dark mode */}
          {isDark && (
            <Stars
              radius={60}
              depth={60}
              count={isMobile ? 2000 : 5000}
              factor={5}
              saturation={0}
              fade
              speed={1.5}
            />
          )}

          {/* Main tech scene */}
          <TechScene isDark={isDark} />

          {/* Fog for depth */}
          <fog attach="fog" args={[fogColor, 10, 25]} />

          {/* Camera controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={isMobile ? 0.5 : 0.8}
            dampingFactor={0.05}
            enableDamping
            touches={{ ONE: 0, TWO: 0 }}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
