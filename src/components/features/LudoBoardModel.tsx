import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

interface BoardModelProps {
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  addToCart: (id: string) => void;
  isAdded: boolean;
}

export const LudoBoardModel: React.FC<BoardModelProps> = ({ id, name, color, position, selectedId, setSelectedId, addToCart, isAdded }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera, invalidate } = useThree();

  const isFocused = selectedId === id;
  const isAnyFocused = selectedId !== null;

  // Triggers demand-frame rendering on hover changes
  useEffect(() => {
    invalidate();
  }, [hovered, selectedId, invalidate]);

  useEffect(() => {
    const handleScroll = () => {
      if (isFocused && meshRef.current) {
        meshRef.current.rotation.y += 0.04;
        invalidate(); // Requests a single render frame on scroll
      }
    };
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [isFocused, invalidate]);

  const handleClick = () => {
    if (isFocused) return;
    setSelectedId(id);
    gsap.to(camera.position, {
      x: position[0],
      y: position[1] + 1,
      z: position[2] + 3.8,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => invalidate() // Requests render frames during transition
    });
  };

  useEffect(() => {
    if (selectedId === null) {
      gsap.to(camera.position, { 
        x: 0, y: 1.8, z: 6.5, 
        duration: 1.2, ease: 'power2.out',
        onUpdate: () => invalidate()
      });
    }
  }, [selectedId, camera, invalidate]);

  useFrame(() => {
    if (meshRef.current) {
      // Gentle idle float
      if (!isFocused) {
        meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.05;
      }

      // Smooth Z-depth (coming forth) and scale lerps
      const targetZ = hovered && !isAnyFocused ? 0.8 : 0;
      const targetScale = hovered && !isAnyFocused ? 1.15 : 1;

      const currentZ = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
      const currentScale = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);

      // Only invalidate frames if active animation is happening
      if (Math.abs(meshRef.current.position.z - targetZ) > 0.01) {
        meshRef.current.position.z = currentZ;
        meshRef.current.scale.set(currentScale, currentScale, currentScale);
        invalidate();
      }
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position} 
      onClick={handleClick}
      className="pointer-events-auto"
    >
      <mesh 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 2, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>

      {isFocused && (
        <Html position={[0, 1.4, 0]} center className="pointer-events-auto">
          <div className="bg-slate-950/90 border border-[#0EA5E9]/30 text-white p-4 rounded-xl shadow-2xl w-56 text-center space-y-3 backdrop-blur-md">
            <h4 className="text-xs font-display font-black italic uppercase tracking-wider">{name} Board</h4>
            <p className="text-[10px] text-slate-400">Professional Rigid Spacing | 3mm/6mm MDF</p>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(id); }}
              className={`w-full py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                isAdded ? 'bg-sky-500 text-white' : 'bg-[#FFD700] text-slate-950 hover:bg-white'
              }`}
            >
              {isAdded ? 'Added to Cart' : 'Order Board (R1200)'}
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};
