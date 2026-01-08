import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ScrollControls,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import ParticleSystem from "./ParticleSystem";

interface Scene3DProps {
  children: React.ReactNode;
}

export default function Scene3D({ children }: Scene3DProps) {
  const [pages, setPages] = useState(8);

  useEffect(() => {
    const updatePages = () => {
      // Mobile needs more scroll space because elements stack vertically
      const isMobile = window.innerWidth < 768;
      setPages(isMobile ? 12 : 8);
    };

    updatePages();
    window.addEventListener("resize", updatePages);
    return () => window.removeEventListener("resize", updatePages);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />

        {/* Ambient Light - Soft general illumination */}
        <ambientLight intensity={0.5} color="#fff0f0" />

        {/* Main Key Light - Warm Gold */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#ffd700"
        />

        {/* Fill Light - Cool for contrast */}
        <pointLight position={[-10, 0, -10]} intensity={0.5} color="#e6e6fa" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <ParticleSystem count={300} color="#D4AF37" />

          {/* Damping=0 uses native browser scroll, essential for GSAP ScrollTrigger to work reliably without a scroller proxy */}
          <ScrollControls pages={pages} damping={0}>
            {children}
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
