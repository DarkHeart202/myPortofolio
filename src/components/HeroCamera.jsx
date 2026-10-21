import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

function HeroCamera({ children, isMobile, isActive }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 30], 0.25, delta);

    if (!groupRef.current) return;

    const targetX = isActive && !isMobile ? -state.pointer.y / 3 : 0;

    const targetY = isActive && !isMobile ? -state.pointer.x / 5 : 0;

    easing.dampE(groupRef.current.rotation, [targetX, targetY, 0], 0.25, delta);
  });

  return <group ref={groupRef}>{children}</group>;
}

export default HeroCamera;
