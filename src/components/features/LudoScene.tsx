import React from 'react';
import { useThree } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { LudoBoardModel } from './LudoBoardModel';

interface LudoSceneProps {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  addToCart: (id: string) => void;
  cart: string[];
}

export const LudoScene: React.FC<LudoSceneProps> = ({ selectedId, setSelectedId, addToCart, cart }) => {
  const { viewport } = useThree();

  const boards = [
    { id: 'board-purple', name: 'Royal Purple', color: '#4B0082', xPos: -3 },
    { id: 'board-original', name: 'Classic Teal', color: '#008080', xPos: 0 },
    { id: 'board-orange', name: 'Amber Orange', color: '#FF8C00', xPos: 3 }
  ];

  return (
    <>
      {/* Dark, cinematic, moody lighting setup */}
      <color attach="background" args={['#060a12']} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} castShadow />

      {/* SpotLights focusing on the Ludo boards */}
      <spotLight position={[-3, 5, 2]} angle={0.3} penumbra={1} intensity={2} castShadow />
      <spotLight position={[0, 5, 2]} angle={0.3} penumbra={1} intensity={2} castShadow />
      <spotLight position={[3, 5, 2]} angle={0.3} penumbra={1} intensity={2} castShadow />

      {/* Interactive 3D board instances */}
      {boards.map(board => (
        <LudoBoardModel
          key={board.id}
          id={board.id}
          name={board.name}
          color={board.color}
          position={[board.xPos, 0, 0]}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          addToCart={addToCart}
          isAdded={cart.includes(board.id)}
        />
      ))}

      {/* Glossy highly reflective floor plane to mirror the boards */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#151515"
          metalness={0.5}
        />
      </mesh>
    </>
  );
};
