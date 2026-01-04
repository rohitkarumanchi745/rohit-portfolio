"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sphere } from '@react-three/drei';
import { Suspense, useRef } from 'react';

// Animated Builder component
function AnimatedBuilder() {
  const rightArmRef = useRef<any>(null);
  const bodyRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Hammer swinging animation - up and down motion
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = 0.5 + Math.sin(time * 2) * 0.4;
      rightArmRef.current.rotation.x = Math.sin(time * 2) * 0.2;
    }

    // Subtle body bobbing motion
    if (bodyRef.current) {
      bodyRef.current.position.y = -0.35 + Math.sin(time * 2) * 0.02;
    }
  });

  return (
    <group ref={bodyRef} position={[-1.3, -0.35, 0.5]} rotation={[0, Math.PI / 4, 0]}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.25, 0.4, 0.2]} />
        <meshStandardMaterial color="#ff9800" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.9} />
      </mesh>

      {/* Hard hat */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.11, 0.08, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffd700" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.18, 0.25, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color="#ff9800" roughness={0.8} />
      </mesh>

      {/* Right arm holding hammer - ANIMATED */}
      <group ref={rightArmRef} position={[0.18, 0.3, 0]} rotation={[0, 0, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial color="#ff9800" roughness={0.8} />
        </mesh>

        {/* Hammer */}
        <group position={[0.14, 0.05, 0]} rotation={[0, 0, 0.3]}>
          {/* Handle */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
            <meshStandardMaterial color="#6b4423" roughness={0.9} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.13, 0]} castShadow>
            <boxGeometry args={[0.05, 0.06, 0.03]} />
            <meshStandardMaterial color="#616161" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* Left leg */}
      <mesh position={[-0.08, 0.05, 0]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.08]} />
        <meshStandardMaterial color="#1976d2" roughness={0.8} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.08, 0.05, 0]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.08]} />
        <meshStandardMaterial color="#1976d2" roughness={0.8} />
      </mesh>

      {/* Tool belt */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.28, 0.04, 0.22]} />
        <meshStandardMaterial color="#6b4423" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Enhanced Building component
function Building() {
  return (
    <group position={[0, -1, 0]}>
      {/* Layered terrain platform with elevation */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[3.5, 3.5, 0.3, 64]} />
        <meshStandardMaterial
          color="#1a3a2a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Grass layer with subtle elevation */}
      <mesh position={[0, -0.42, 0]} receiveShadow>
        <cylinderGeometry args={[3.3, 3.3, 0.05, 64]} />
        <meshStandardMaterial
          color="#2d5a3d"
          roughness={1}
          emissive="#1a3020"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Main building base */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.2, 1.8]} />
        <meshStandardMaterial
          color="#3a4556"
          metalness={0.4}
          roughness={0.6}
          emissive="#1a1f2e"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Building second floor */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.6, 1.5]} />
        <meshStandardMaterial
          color="#4a5568"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Roof with better shape */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <coneGeometry args={[1.4, 0.8, 4]} />
        <meshStandardMaterial
          color="#2d3748"
          metalness={0.5}
          roughness={0.6}
          emissive="#1a1f2e"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Chimney */}
      <mesh position={[0.6, 1.8, 0.4]} castShadow>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial color="#1a202c" roughness={0.8} />
      </mesh>

      {/* Front windows with frames - bottom floor */}
      {[-0.7, 0, 0.7].map((x, i) => (
        <group key={`window-bottom-${i}`} position={[x, 0.4, 0.91]}>
          {/* Window frame */}
          <mesh castShadow>
            <boxGeometry args={[0.38, 0.48, 0.04]} />
            <meshStandardMaterial color="#2d3748" metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Glowing window */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.32, 0.42, 0.02]} />
            <meshStandardMaterial
              color="#ffe4b5"
              emissive="#ffb347"
              emissiveIntensity={1.2}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Top floor windows */}
      {[-0.5, 0.5].map((x, i) => (
        <group key={`window-top-${i}`} position={[x, 1.1, 0.76]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.38, 0.04]} />
            <meshStandardMaterial color="#2d3748" metalness={0.3} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.28, 0.32, 0.02]} />
            <meshStandardMaterial
              color="#ffe4b5"
              emissive="#ffb347"
              emissiveIntensity={1}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Enhanced door with frame */}
      <group position={[0, 0.05, 0.91]}>
        {/* Door frame */}
        <mesh castShadow>
          <boxGeometry args={[0.52, 0.82, 0.05]} />
          <meshStandardMaterial color="#2d3748" metalness={0.2} roughness={0.8} />
        </mesh>
        {/* Door */}
        <mesh position={[0, 0, 0.02]} castShadow>
          <boxGeometry args={[0.45, 0.75, 0.03]} />
          <meshStandardMaterial
            color="#6b4423"
            metalness={0.2}
            roughness={0.8}
            emissive="#3a2510"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Door handle */}
        <mesh position={[0.15, 0, 0.04]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Enhanced trees with more detail */}
      {[
        [-1.8, 0, 1.8],
        [1.8, 0, 1.8],
        [-2.2, 0, -1.2],
        [2.2, 0, -1.2],
        [-1.2, 0, -2],
        [1.2, 0, -2],
      ].map((pos, i) => (
        <group key={`tree-${i}`} position={pos as [number, number, number]}>
          {/* Tree trunk with texture */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.15, 0.7, 12]} />
            <meshStandardMaterial
              color="#5d4037"
              roughness={1}
              metalness={0}
            />
          </mesh>
          {/* Multiple layers of foliage */}
          <mesh position={[0, 0.85, 0]} castShadow>
            <coneGeometry args={[0.5, 0.8, 8]} />
            <meshStandardMaterial
              color="#2e7d32"
              roughness={0.9}
              emissive="#1b5e20"
              emissiveIntensity={0.1}
            />
          </mesh>
          <mesh position={[0, 1.15, 0]} castShadow>
            <coneGeometry args={[0.35, 0.6, 8]} />
            <meshStandardMaterial
              color="#43a047"
              roughness={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* Path/walkway to door */}
      <mesh position={[0, -0.35, 1.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial
          color="#8d8d8d"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Floating magical orbs with better glow */}
      {[...Array(12)].map((_, i) => {
        const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#a855f7'];
        const color = colors[i % colors.length];
        return (
          <Float
            key={`orb-${i}`}
            speed={1.5 + Math.random() * 2}
            rotationIntensity={0.3}
            floatIntensity={1.5}
          >
            <Sphere
              args={[0.06 + Math.random() * 0.04, 16, 16]}
              position={[
                (Math.random() - 0.5) * 6,
                0.5 + Math.random() * 2.5,
                (Math.random() - 0.5) * 6,
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

      {/* Fence around property */}
      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 2.8;
        return (
          <mesh
            key={`fence-${i}`}
            position={[
              Math.cos(angle) * radius,
              -0.2,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.08, 0.5, 0.08]} />
            <meshStandardMaterial color="#5d4037" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Animated Builder character next to building */}
      <AnimatedBuilder />

      {/* Construction materials pile */}
      <group position={[-1.8, -0.35, -0.5]}>
        {/* Wood planks */}
        {[0, 0.05, 0.1].map((y, i) => (
          <mesh key={`plank-${i}`} position={[0, y, 0]} rotation={[0, i * 0.2, 0]} castShadow>
            <boxGeometry args={[0.5, 0.03, 0.15]} />
            <meshStandardMaterial color="#8d6e63" roughness={1} />
          </mesh>
        ))}
        {/* Toolbox */}
        <mesh position={[0.3, 0.06, 0.2]} castShadow>
          <boxGeometry args={[0.2, 0.12, 0.12]} />
          <meshStandardMaterial color="#d32f2f" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// Animated background sphere
function BackgroundSphere() {
  return (
    <Sphere args={[15, 64, 64]} scale={[-1, 1, 1]}>
      <meshStandardMaterial
        color="#0a0e1a"
        roughness={1}
        metalness={0}
        side={2}
      />
    </Sphere>
  );
}

// Main 3D Scene
export default function Scene3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.3} color="#b8c5d6" />

          {/* Main directional light (sun/moon) */}
          <directionalLight
            position={[8, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            color="#e6f0ff"
          />

          {/* Rim light for depth */}
          <directionalLight
            position={[-5, 3, -5]}
            intensity={0.4}
            color="#4f46e5"
          />

          {/* Colored accent lights */}
          <pointLight position={[-4, 4, -4]} intensity={1.2} color="#8b5cf6" distance={15} decay={2} />
          <pointLight position={[4, 3, 4]} intensity={0.8} color="#3b82f6" distance={12} decay={2} />
          <pointLight position={[0, 5, -6]} intensity={0.6} color="#06b6d4" distance={10} decay={2} />

          {/* Ground fill light */}
          <pointLight position={[0, -2, 0]} intensity={0.3} color="#2d3748" distance={8} decay={2} />

          {/* Spotlight on building */}
          <spotLight
            position={[0, 8, 3]}
            angle={0.4}
            penumbra={0.5}
            intensity={0.8}
            castShadow
            color="#ffe4b5"
          />

          {/* Stars with more density */}
          <Stars
            radius={60}
            depth={60}
            count={5000}
            factor={5}
            saturation={0}
            fade
            speed={1.5}
          />

          {/* Background sphere */}
          <BackgroundSphere />

          {/* Main building */}
          <Building />

          {/* Fog for depth */}
          <fog attach="fog" args={['#0a0e1a', 10, 25]} />

          {/* Camera controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.8}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
