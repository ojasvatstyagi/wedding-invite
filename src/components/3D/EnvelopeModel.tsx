import { useRef, useState, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, useTexture, useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ParticleBurst from "./ParticleBurst";

function CardMaterial() {
  const texture = useTexture("/images/ganesh.png");
  return (
    <meshStandardMaterial map={texture} roughness={0.4} transparent={true} />
  );
}

interface EnvelopeProps {
  open: boolean;
  onOpen: () => void;
}

export default function EnvelopeModel({ open, onOpen }: EnvelopeProps) {
  const group = useRef<THREE.Group>(null);
  const envelopeBody = useRef<THREE.Group>(null);
  const flapGroup = useRef<THREE.Group>(null);
  const card = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  // Access scroll data to move card on scroll
  const scroll = useScroll();

  useCursor(hovered);

  // Initial State: Hidden
  useLayoutEffect(() => {
    if (group.current) {
      group.current.position.y = -5;
      group.current.scale.set(0, 0, 0);
    }
    // Ensure card starts slightly smaller to fit perfectly inside envelope
    if (card.current) {
      card.current.scale.set(0.9, 0.9, 1);
    }
  }, []);

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (onOpen) onOpen();

    const tl = gsap.timeline();

    // 0. ENTRANCE: Float Up and Scale In
    if (group.current) {
      tl.to(group.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.2,
        ease: "back.out(1.2)",
      }).to(
        group.current.position,
        {
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "<"
      );
    }

    // 1. OPENING: Rotate flap open
    if (flapGroup.current) {
      tl.to(
        flapGroup.current.rotation,
        {
          x: -Math.PI / 1.1,
          duration: 1.0,
          ease: "power2.inOut",
        },
        ">-0.2"
      );
    }

    // 2. REVEAL: Card Slides Up AND Scales Up
    if (card.current) {
      tl.to(
        card.current.position,
        {
          y: 0.5, // Lowered from 1.5 to add top padding
          duration: 1.2,
          ease: "power2.out",
          onStart: () => {
            setTimeout(() => setShowBurst(true), 200);
          },
        },
        ">"
      ).to(
        card.current.scale,
        {
          x: 3, // Significantly larger to fill screen
          y: 3,
          duration: 1.2,
          ease: "power2.out",
        },
        "<"
      );
    }

    // 3. DISMISSAL: Drop ONLY the ENVELOPE BODY
    // Synchronized with the card reveal ("<") so it happens simultaneously
    if (envelopeBody.current) {
      tl.to(
        envelopeBody.current.position,
        {
          y: -15,
          duration: 1.2,
          ease: "power2.in",
        },
        "<"
      );
    }
  };

  useFrame(() => {
    // Trigger animation once when open
    if (open && !isAnimating && group.current?.scale.x === 0) {
      triggerAnimation();
    }

    // Scroll Logic: Move card UP as page scrolls down
    if (open && card.current) {
      const scrollOffset = scroll?.offset || 0;
      card.current.position.y = 0.5 + scrollOffset * 25;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!open && !isAnimating && onOpen) onOpen();
  };

  const envelopeColor = "#E8E0D5";
  const envelopeMaterial = new THREE.MeshStandardMaterial({
    color: envelopeColor,
    roughness: 0.8,
    metalness: 0.1,
  });

  return (
    <group
      ref={group}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <ParticleBurst active={showBurst} count={300} />

      {/* ENVELOPE BODY (Separated for independent animation) */}
      <group ref={envelopeBody} scale={[1.3, 1.3, 1]}>
        {/* Back Panel - Furthest Back (-0.06) */}
        <mesh position={[0, 0, -0.06]} material={envelopeMaterial}>
          <boxGeometry args={[6, 4, 0.01]} />
        </mesh>
        {/* Front Pocket - In Front of Card (0.06) */}
        <mesh position={[0, -1, 0.06]} material={envelopeMaterial}>
          <boxGeometry args={[6, 2, 0.01]} />
        </mesh>
        {/* Side Folds */}
        <mesh position={[-2.95, 0, 0.06]} material={envelopeMaterial}>
          <boxGeometry args={[0.1, 4, 0.01]} />
        </mesh>
        <mesh position={[2.95, 0, 0.06]} material={envelopeMaterial}>
          <boxGeometry args={[0.1, 4, 0.01]} />
        </mesh>
        {/* Flap Group - Top Front (0.05) */}
        <group ref={flapGroup} position={[0, 2, 0.05]}>
          <mesh
            position={[0, -1.35, 0]}
            rotation={[0, 0, Math.PI]}
            scale={[1, 1, 0.01]}
            material={envelopeMaterial}
          >
            <coneGeometry args={[4.6, 3.5, 3]} />
          </mesh>
          <mesh position={[0, -0.8, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
            <meshStandardMaterial color="#800020" roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* CARD GROUP - In the Middle (0) */}
      <group ref={card} position={[0, -0.2, 0]}>
        {/* Solid Gold Backing (Slightly behind card face) */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[5.6, 3.6, 0.01]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Card Face (Image) - Using PlaneGeometry to fix mapping */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[5.4, 3.4]} />
          <CardMaterial />
        </mesh>
      </group>
    </group>
  );
}
