import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface MetallicTextureDieProps {
  rotationSpeed?: number;
}

const MetallicTextureDie = ({ }: MetallicTextureDieProps) => {
  // Safe CORS texture loader pulls your high-resolution asset into the WebGL memory pipeline
  const texture = useTexture("https://res.cloudinary.com/dfzeb1s54/image/upload/v1781360203/GoldDiceHero_ptqaga.png");
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      // Floating kinetic bounce math
      ref.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.15;
      // Controlled, slow 3D rotation coordinates
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.25;
      ref.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <planeGeometry args={[3.2, 3.2]} />
      <meshStandardMaterial 
        map={texture} 
        transparent={true}
        metalness={0.9} 
        roughness={0.1}
        envMapIntensity={1.2}
        side={THREE.DoubleSide}
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
      
      {/* 3D WebGL Canvas Layer with Custom Lights */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          
          {/* Multiple light sources to generate dynamic metallic reflections */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
          />
          {/* Gold tinted point light to emphasize the metallic theme */}
          <pointLight position={[0, 3, 2]} intensity={1.5} color="#FFD700" />
          <pointLight position={[-5, -5, -2]} intensity={0.8} color="#FFD700" />

          <Suspense fallback={null}>
            <MetallicTextureDie rotationSpeed={rotationSpeed} />
          </Suspense>
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
