"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sphere, RoundedBox } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';

// Glowing Monitor/Screen component
function Monitor({ position, isDark }: { position: [number, number, number], isDark: boolean }) {
  const screenRef = useRef<any>(null);

  useFrame((state) => {
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.6 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Monitor stand base */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.05, 32]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor stand pole */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 16]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor frame */}
      <RoundedBox args={[1.2, 0.75, 0.05]} radius={0.02} smoothness={4} position={[0, 0.15, 0]} castShadow>
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
      </RoundedBox>

      {/* Screen with glow */}
      <mesh ref={screenRef} position={[0, 0.15, 0.03]}>
        <planeGeometry args={[1.1, 0.65]} />
        <meshStandardMaterial
          color={isDark ? "#1e3a5f" : "#e0f2fe"}
          emissive="#3b82f6"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Code lines on screen */}
      {[...Array(6)].map((_, i) => (
        <mesh key={`line-${i}`} position={[-0.35 + (i % 2) * 0.1, 0.32 - i * 0.09, 0.04]}>
          <boxGeometry args={[0.25 + (i % 3) * 0.15, 0.025, 0.001]} />
          <meshBasicMaterial
            color={['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4'][i]}
          />
        </mesh>
      ))}
    </group>
  );
}

// Keyboard component
function Keyboard({ position, isDark }: { position: [number, number, number], isDark: boolean }) {
  return (
    <group position={position}>
      {/* Keyboard base */}
      <RoundedBox args={[0.9, 0.04, 0.35]} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color={isDark ? "#2d3748" : "#e2e8f0"} metalness={0.3} roughness={0.6} />
      </RoundedBox>

      {/* Keys */}
      {[...Array(4)].map((_, row) => (
        [...Array(12)].map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[-0.38 + col * 0.065, 0.025, -0.12 + row * 0.07]}
            castShadow
          >
            <boxGeometry args={[0.05, 0.015, 0.05]} />
            <meshStandardMaterial
              color={isDark ? "#4a5568" : "#cbd5e1"}
              roughness={0.7}
            />
          </mesh>
        ))
      ))}
    </group>
  );
}

// Coffee Mug
function CoffeeMug({ position, isDark }: { position: [number, number, number], isDark: boolean }) {
  return (
    <group position={position}>
      {/* Mug body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.07, 0.15, 24]} />
        <meshStandardMaterial color={isDark ? "#7c3aed" : "#8b5cf6"} roughness={0.4} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.045, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color={isDark ? "#7c3aed" : "#8b5cf6"} roughness={0.4} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.06, 0]}>
        <circleGeometry args={[0.065, 24]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>

      {/* Steam particles */}
      {[...Array(3)].map((_, i) => (
        <Float key={i} speed={2} floatIntensity={0.5}>
          <mesh position={[-0.02 + i * 0.02, 0.12 + i * 0.03, 0]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Plant pot for decoration
function Plant({ position, isDark }: { position: [number, number, number], isDark: boolean }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.8} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.05, 0]}>
        <circleGeometry args={[0.07, 16]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>

      {/* Plant leaves */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.03, 0.12 + i * 0.02, Math.sin(angle) * 0.03]}
            rotation={[0.3 + i * 0.1, angle, 0.2]}
            castShadow
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#22c55e" roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

// Floating tech icons (simple glowing shapes)
function FloatingIcon({ position, color, shape }: { position: [number, number, number], color: string, shape: 'sphere' | 'cube' | 'octahedron' }) {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {shape === 'sphere' && <sphereGeometry args={[0.06, 16, 16]} />}
        {shape === 'cube' && <boxGeometry args={[0.1, 0.1, 0.1]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[0.07]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

// Desk platform
function Desk({ isDark }: { isDark: boolean }) {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Desk surface */}
      <RoundedBox args={[3, 0.08, 1.5]} radius={0.02} smoothness={4} receiveShadow castShadow>
        <meshStandardMaterial
          color={isDark ? "#3d2817" : "#92673d"}
          roughness={0.7}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Desk legs */}
      {[[-1.3, -0.4, 0.6], [1.3, -0.4, 0.6], [-1.3, -0.4, -0.6], [1.3, -0.4, -0.6]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color={isDark ? "#2d2017" : "#6b4423"} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Main workspace scene
function WorkspaceScene({ isDark }: { isDark: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Desk */}
      <Desk isDark={isDark} />

      {/* Monitor */}
      <Monitor position={[0, 0, -0.2]} isDark={isDark} />

      {/* Keyboard */}
      <Keyboard position={[0, -0.42, 0.25]} isDark={isDark} />

      {/* Coffee mug */}
      <CoffeeMug position={[0.7, -0.38, 0.2]} isDark={isDark} />

      {/* Plant */}
      <Plant position={[-0.8, -0.38, 0.1]} isDark={isDark} />

      {/* Floating tech icons around the scene */}
      <FloatingIcon position={[-1.5, 0.5, 0.5]} color="#8b5cf6" shape="sphere" />
      <FloatingIcon position={[1.5, 0.7, 0.3]} color="#3b82f6" shape="cube" />
      <FloatingIcon position={[-1.2, 0.9, -0.5]} color="#22c55e" shape="octahedron" />
      <FloatingIcon position={[1.3, 0.4, -0.4]} color="#f59e0b" shape="sphere" />
      <FloatingIcon position={[0, 1.2, 0]} color="#ec4899" shape="octahedron" />
      <FloatingIcon position={[-0.8, 0.6, 0.8]} color="#06b6d4" shape="cube" />

      {/* Additional floating particles */}
      {[...Array(15)].map((_, i) => {
        const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#22c55e', '#f59e0b'];
        return (
          <Float
            key={`particle-${i}`}
            speed={1.5 + (i % 3) * 0.5}
            rotationIntensity={0.2}
            floatIntensity={1.2}
          >
            <Sphere
              args={[0.02 + (i % 3) * 0.01, 12, 12]}
              position={[
                (Math.sin(i * 1.3) * 2),
                0.5 + (i % 5) * 0.3,
                (Math.cos(i * 1.7) * 1.5),
              ]}
            >
              <meshStandardMaterial
                color={colors[i % colors.length]}
                emissive={colors[i % colors.length]}
                emissiveIntensity={1.5}
                transparent
                opacity={0.8}
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
        camera={{ position: [0, 1.5, 4], fov: 45 }}
        shadows={!isMobile}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        className="cursor-grab active:cursor-grabbing"
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Bright ambient light */}
          <ambientLight intensity={isDark ? 0.4 : 0.7} color={isDark ? "#b8c5d6" : "#ffffff"} />

          {/* Main directional light */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={isDark ? 1.5 : 2.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            color={isDark ? "#e6f0ff" : "#fff5e6"}
          />

          {/* Fill light from behind */}
          <directionalLight
            position={[-3, 2, -3]}
            intensity={isDark ? 0.5 : 0.8}
            color="#94a3b8"
          />

          {/* Accent lights */}
          <pointLight position={[-3, 3, 2]} intensity={isDark ? 0.8 : 0.5} color="#8b5cf6" distance={10} decay={2} />
          <pointLight position={[3, 2, 2]} intensity={isDark ? 0.6 : 0.4} color="#3b82f6" distance={10} decay={2} />

          {/* Screen glow */}
          <pointLight position={[0, 0.5, 0.5]} intensity={0.8} color="#3b82f6" distance={3} decay={2} />

          {/* Stars - only in dark mode */}
          {isDark && (
            <Stars
              radius={50}
              depth={50}
              count={isMobile ? 1500 : 4000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          )}

          {/* Main workspace scene */}
          <WorkspaceScene isDark={isDark} />

          {/* Subtle fog */}
          <fog attach="fog" args={[isDark ? '#0f172a' : '#f1f5f9', 8, 20]} />

          {/* Camera controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={isMobile ? 0.4 : 0.6}
            dampingFactor={0.05}
            enableDamping
            touches={{ ONE: 0, TWO: 0 }}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
