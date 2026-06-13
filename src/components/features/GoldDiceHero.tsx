import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface DiceProps {
  rotationSpeed?: number;
}

const MetallicDie = ({ rotationSpeed = 0.005 }: DiceProps) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += rotationSpeed;
      ref.current.rotation.y += rotationSpeed * 1.5;
      ref.current.rotation.z += rotationSpeed * 0.5;
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshStandardMaterial 
        color="#FFD700" 
        metalness={0.9} 
        roughness={0.1} 
        envMapIntensity={1.0}
      />
    </mesh>
  );
};

interface GoldDiceHeroProps {
  rotationSpeed?: number;
  onActionClick: () => void;
}

export const GoldDiceHero: React.FC<GoldDiceHeroProps> = ({ rotationSpeed = 0.005, onActionClick }) => {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center">
      
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
          />
          <pointLight position={[-5, -5, -5]} intensity={0.8} color="#FFD700" />
          <pointLight position={[0, 5, 0]} intensity={1.0} color="#FFD700" />

          <MetallicDie rotationSpeed={rotationSpeed} />
        </Canvas>
      </div>

      {/* Overlaid Branded Content Layer */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6 select-none pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-display font-black italic uppercase leading-none text-white">
          Invest in <span className="text-[#FFD700]">Hope.</span> Invest in Ludo.
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans max-w-3xl mx-auto italic">
          "South Africa's youth don't need handouts. They need opportunities. Help us create them, one roll at a time."
        </p>
        <div className="pt-4 pointer-events-auto">
          <button 
            onClick={onActionClick} 
            className="px-10 py-5 bg-[#D32F2F] hover:bg-[#FFD700] text-white hover:text-black font-black uppercase text-[11px] tracking-[0.25em] font-style: italic rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            Back the Movement
          </button>
        </div>
      </div>

    </section>
  );
};
