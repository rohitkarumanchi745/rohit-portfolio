"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Exact low-poly hippo matching reference images
function Hippo() {
  const groupRef = useRef<any>(null);
  const tailRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle floating and rotation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.7) * 0.08;
      groupRef.current.rotation.y = time * 0.15;
    }

    // Tail wagging
    if (tailRef.current) {
      tailRef.current.rotation.x = Math.sin(time * 3) * 0.3;
    }
  });

  // Light pastel gradient like reference screenshot
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#4a3a6a');    // Dark purple ears/top
    gradient.addColorStop(0.25, '#8b7fb8'); // Medium purple
    gradient.addColorStop(0.5, '#b8c5e0');  // Light purple-blue
    gradient.addColorStop(0.75, '#d5e3f0'); // Very light blue
    gradient.addColorStop(1, '#e8f4fb');    // Almost white

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Super glossy material with flat shading for faceted look
  const material = new THREE.MeshPhysicalMaterial({
    map: gradientTexture,
    roughness: 0.12,
    metalness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    flatShading: true,
    envMapIntensity: 1.8,
  });

  return (
    <group ref={groupRef} scale={1.6}>
      {/* Main body - rounded with facets like reference */}
      <mesh castShadow>
        <sphereGeometry args={[0.55, 12, 10]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Head group */}
      <group position={[0, 0.25, 0.55]}>
        {/* Head - rounded with facets */}
        <mesh castShadow>
          <sphereGeometry args={[0.38, 12, 10]} />
          <primitive object={material} attach="material" />
        </mesh>

        {/* Snout - rounded protrusion */}
        <mesh position={[0, -0.12, 0.32]} castShadow>
          <sphereGeometry args={[0.22, 10, 8]} />
          <meshPhysicalMaterial
            color="#b5cce2"
            roughness={0.08}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            flatShading={true}
          />
        </mesh>

        {/* Ears - dark purple like reference */}
        <mesh position={[-0.3, 0.2, -0.05]} rotation={[0, 0, 0.3]} castShadow>
          <sphereGeometry args={[0.13, 8, 6]} />
          <meshPhysicalMaterial
            color="#3d2d5f"
            roughness={0.12}
            metalness={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            flatShading={true}
          />
        </mesh>
        <mesh position={[0.3, 0.2, -0.05]} rotation={[0, 0, -0.3]} castShadow>
          <sphereGeometry args={[0.13, 8, 6]} />
          <meshPhysicalMaterial
            color="#3d2d5f"
            roughness={0.12}
            metalness={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            flatShading={true}
          />
        </mesh>

        {/* Eyes - glossy dark */}
        <mesh position={[-0.15, 0.06, 0.35]} castShadow>
          <sphereGeometry args={[0.055, 8, 6]} />
          <meshPhysicalMaterial
            color="#1a0f2e"
            roughness={0.02}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
          />
        </mesh>
        <mesh position={[0.15, 0.06, 0.35]} castShadow>
          <sphereGeometry args={[0.055, 8, 6]} />
          <meshPhysicalMaterial
            color="#1a0f2e"
            roughness={0.02}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
          />
        </mesh>

        {/* Eye highlights */}
        <mesh position={[-0.14, 0.08, 0.39]}>
          <sphereGeometry args={[0.018, 6, 4]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={3}
          />
        </mesh>
        <mesh position={[0.16, 0.08, 0.39]}>
          <sphereGeometry args={[0.018, 6, 4]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Nostrils */}
        <mesh position={[-0.065, -0.17, 0.46]} castShadow>
          <sphereGeometry args={[0.022, 6, 4]} />
          <meshPhysicalMaterial color="#3a2a4a" roughness={0.3} />
        </mesh>
        <mesh position={[0.065, -0.17, 0.46]} castShadow>
          <sphereGeometry args={[0.022, 6, 4]} />
          <meshPhysicalMaterial color="#3a2a4a" roughness={0.3} />
        </mesh>
      </group>

      {/* Legs - short rounded with facets */}
      {[
        [-0.32, -0.42, 0.28],
        [0.32, -0.42, 0.28],
        [-0.32, -0.42, -0.28],
        [0.32, -0.42, -0.28]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.11, 0.11, 0.28, 8]} />
            <meshPhysicalMaterial
              color="#4a3a6a"
              roughness={0.12}
              metalness={0.08}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              flatShading={true}
            />
          </mesh>
          {/* Feet - rounded with facets */}
          <mesh position={[0, -0.17, 0]} castShadow>
            <sphereGeometry args={[0.13, 8, 6]} />
            <meshPhysicalMaterial
              color="#4a3a6a"
              roughness={0.12}
              metalness={0.08}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              flatShading={true}
            />
          </mesh>
        </group>
      ))}

      {/* Tail - small rounded */}
      <group ref={tailRef} position={[0, 0.08, -0.58]}>
        <mesh castShadow>
          <sphereGeometry args={[0.1, 6, 5]} />
          <meshPhysicalMaterial
            color="#4a3a6a"
            roughness={0.12}
            metalness={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            flatShading={true}
          />
        </mesh>
      </group>
    </group>
  );
}

// Main 3D Scene
export default function Squirrel3D() {
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
    return null;
  }

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0.8, 2.5], fov: 45 }}
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          {/* Soft, natural lighting */}
          <ambientLight intensity={0.9} />

          {/* Main light - soft and diffused */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.6}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={20}
            shadow-camera-left={-3}
            shadow-camera-right={3}
            shadow-camera-top={3}
            shadow-camera-bottom={-3}
            shadow-bias={-0.0001}
          />

          {/* Fill lights for smooth appearance */}
          <pointLight position={[-3, 3, -2]} intensity={0.7} color="#b4c5ff" />
          <pointLight position={[2, 1, 3]} intensity={0.6} color="#ffd9b3" />
          <pointLight position={[0, 2, 2]} intensity={0.5} color="#ffffff" />

          {/* Hemisphere light for ambient glow */}
          <hemisphereLight
            color="#ffffff"
            groundColor="#9cb3d9"
            intensity={0.6}
          />

          {/* Hippo */}
          <Hippo />

          {/* Ground plane - subtle */}
          <mesh position={[0, -0.7, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8, 8]} />
            <meshStandardMaterial
              color="#e8f4ff"
              roughness={0.8}
              transparent
              opacity={0.15}
            />
          </mesh>

          {/* Camera controls - very slow rotation */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.2}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
