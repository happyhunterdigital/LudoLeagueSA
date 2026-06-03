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
    { 
      id: 'board-purple', 
      name: 'Royal Purple', 
      color: '#4B0082', 
      xPos: -2.8,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458042/Final_Purple_Board_hohd9k.png'
    },
    { 
      id: 'board-original', 
      name: 'Classic Teal', 
      color: '#008080', 
      xPos: 0,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458042/Final_Original_Board_m6uyqi.png'
    },
    { 
      id: 'board-orange', 
      name: 'Amber Orange', 
      color: '#FF8C00', 
      xPos: 2.8,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Orange_Board_h3mopp.png'
    }
  ];

  return (
    <>
      <color attach="background" args={['#060a12']} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 8, 4]} intensity={0.6} castShadow />

      <spotLight position={[-2.8, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.8} castShadow />
      <spotLight position={[0, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.8} castShadow />
      <spotLight position={[2.8, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.8} castShadow />

      {boards.map(board => (
        <LudoBoardModel
          key={board.id}
          id={board.id}
          name={board.name}
          color={board.color}
          imgUrl={board.imgUrl}
          position={[board.xPos, 0, 0]}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          addToCart={addToCart}
          isAdded={cart.includes(board.id)}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[150, 50]}
          resolution={256}
          mixBlur={0.8}
          mixStrength={15}
          roughness={0.9}
          depthScale={1}
          minDepthThreshold={0.5}
          maxDepthThreshold={1.2}
          color="#080e1a"
          metalness={0.4}
        />
      </mesh>
    </>
  );
};
