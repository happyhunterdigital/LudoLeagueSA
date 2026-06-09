import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export const LudoBoardModel = (props: any) => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group
      ref={group}
      position={[0, 0, 0]}
      onClick={() => {}}
      {...props}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#0c4a60" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
};
