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

  const products = [
    { 
      id: 'board-purple', name: 'Royal Purple', color: '#4B0082', xPos: -5,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458042/Final_Purple_Board_hohd9k.png',
      price: 1200, isBoard: true
    },
    { 
      id: 'board-original', name: 'Classic Teal', color: '#008080', xPos: -2.5,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458042/Final_Original_Board_m6uyqi.png',
      price: 1200, isBoard: true
    },
    { 
      id: 'board-black', name: 'Obsidian Black', color: '#111111', xPos: 0,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Black_Board_aq9yjo.png',
      price: 1200, isBoard: true
    },
    { 
      id: 'board-blue', name: 'Electric Blue', color: '#1E90FF', xPos: 2.5,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Blue_Board_mvqu4j.png',
      price: 1200, isBoard: true
    },
    { 
      id: 'board-orange', name: 'Amber Orange', color: '#FF8C00', xPos: 5,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Orange_Board_h3mopp.png',
      price: 1200, isBoard: true
    },
    { 
      id: 'tokens-dice', name: 'Token & Dice Set', color: '#E8A020', xPos: 7.2,
      imgUrl: 'https://res.cloudinary.com/dkyg07qvv/image/upload/v1779458041/Final_Tokens_and_Dice_gk3mbd.png',
      price: 200, isBoard: false
    }
  ];

  return (
    <>
      <color attach="background" args={['#060a12']} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 8, 4]} intensity={0.6} castShadow />

      {/* Structured spotlights with warm highlights */}
      <spotLight position={[-5, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.5} castShadow />
      <spotLight position={[-2.5, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.5} castShadow />
      <spotLight position={[0, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.5} castShadow />
      <spotLight position={[2.5, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.5} castShadow />
      <spotLight position={[5, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.5} castShadow />
      <spotLight position={[7.2, 4.5, 2.5]} angle={0.25} penumbra={1} intensity={1.5} castShadow />

      {products.map(item => (
        <LudoBoardModel
          key={item.id}
          id={item.id}
          name={item.name}
          color={item.color}
          imgUrl={item.imgUrl}
          price={item.price}
          isBoard={item.isBoard}
          position={[item.xPos, 0, 0]}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          addToCart={addToCart}
          isAdded={cart.includes(item.id)}
        />
      ))}

      {/* High-performance glossy floor plane reflecting your 3D boards */}
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
