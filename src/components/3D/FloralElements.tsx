import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FlowerShape({ position, color, scale = 1, rotationSpeed = 1 }: any) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x =
        state.clock.getElapsedTime() * 0.2 * rotationSpeed;
      mesh.current.rotation.y =
        state.clock.getElapsedTime() * 0.1 * rotationSpeed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position} scale={scale}>
        {/* Abstract Flower - Icosahedron */}
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.1}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Ring decoration */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function FloralElements() {
  return (
    <group>
      <FlowerShape
        position={[-8, 4, -5]}
        color="#A03040"
        scale={0.8}
        rotationSpeed={0.5}
      />
      <FlowerShape
        position={[8, -6, -5]}
        color="#F0DEAA"
        scale={1.2}
        rotationSpeed={0.3}
      />
      <FlowerShape
        position={[-6, -4, -8]}
        color="#800020"
        scale={0.6}
        rotationSpeed={0.7}
      />
      <FlowerShape
        position={[7, 5, -8]}
        color="#D4AF37"
        scale={0.9}
        rotationSpeed={0.4}
      />
    </group>
  );
}
