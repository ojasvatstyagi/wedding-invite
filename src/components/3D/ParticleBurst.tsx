import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleBurstProps {
  active: boolean;
  count?: number;
  color?: string;
}

export default function ParticleBurst({
  active,
  count = 200,
  color = "#FFD700",
}: ParticleBurstProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  // Initialize particles at a central point with random outward velocities
  const data = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 5, // X spread
        (Math.random() - 0.5) * 5 + 2, // Y spread (upwards bias)
        (Math.random() - 0.5) * 2 // Z spread
      ),
      position: new THREE.Vector3(0, 0, 0),
      scale: Math.random() * 0.5 + 0.2,
      life: 1.0, // Life from 1 to 0
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!mesh.current || !active) return;

    // If not active, hide everything
    if (!active) {
      mesh.current.visible = false;
      return;
    }

    mesh.current.visible = true;

    data.forEach((particle, i) => {
      if (particle.life > 0) {
        // Init position if just starting (hacky, simple burst)
        // We really want them to explode from 0,0,0 when 'active' becomes true.
        // But for a simple effect, we can assume 'active' toggles the render loop update for them.

        // Update physics
        particle.position.addScaledVector(particle.velocity, delta);
        particle.velocity.y -= 2 * delta; // Gravity
        particle.life -= 0.5 * delta; // Decay

        // Scale down with life
        const s = Math.max(0, particle.scale * particle.life);

        dummy.position.copy(particle.position);
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
      } else {
        // Reset or hide
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
      }
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count]}
      position={[0, 0, 0]}
    >
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}
