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
  const { camera } = useThree();

  const isFocused = selectedId === id;
  const isAnyFocused = selectedId !== null;

  // Handles scroll-driven rotation when focused
  useEffect(() => {
    const handleScroll = () => {
      if (isFocused && meshRef.current) {
        meshRef.current.rotation.y += 0.05;
      }
    };
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [isFocused]);

  // Handles smooth GSAP camera interpolation on click
  const handleClick = () => {
    if (isFocused) return;
    setSelectedId(id);
    gsap.to(camera.position, {
      x: position[0],
      y: position[1] + 1.2,
      z: position[2] + 4,
      duration: 1.5,
      ease: 'power3.out'
    });
  };

  // Reset camera when catalog is backed
  useEffect(() => {
    if (selectedId === null) {
      gsap.to(camera.position, { x: 0, y: 2, z: 7, duration: 1.2, ease: 'power2.out' });
    }
  }, [selectedId, camera]);

  useFrame(() => {
    if (meshRef.current) {
      // Subtle float animation
      if (!isFocused) {
        meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0015) * 0.1;
        meshRef.current.rotation.y += 0.003;
      }
      // Hover scaling
      const targetScale = hovered && !isAnyFocused ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position} onClick={handleClick}>
      {/* Visual Board Box Mesh representation */}
      <mesh 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.2, 2.2, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Cross-and-Circle track border outlines */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>

      {/* Floating 3D space HTML Annotations */}
      {isFocused && (
        <Html position={[0, 1.6, 0]} center className="pointer-events-auto">
          <div className="bg-slate-950/90 border border-[#0EA5E9]/30 text-white p-4 rounded-xl shadow-2xl w-60 text-center space-y-3 backdrop-blur-md">
            <h4 className="text-sm font-display font-black italic uppercase tracking-wider">{name} Board</h4>
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
