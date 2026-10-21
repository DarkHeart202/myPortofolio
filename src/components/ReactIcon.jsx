import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ReactIcon(props) {
  const { nodes, materials } = useGLTF("/models/react.glb");
  const logoRef = useRef();

  const texture = useTexture("/textures/react.png");

  useGSAP(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current.rotation, {
        y: Math.PI * 2, // دورة كاملة 360 درجة
        duration: 5, // يأخذ 4 ثواني لكل دورة
        repeat: -1, // تكرار لا نهائي
        ease: "none", // حركة منتظمة وبدون إبطاء في النهاية
      });
    }
  }, []);
  return (
    <group ref={logoRef} {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["React-Logo_Material002_0"].geometry}
          material={materials["Material.002"]}
          position={[0, 7.935, 18.102]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[39.166, 39.166, 52.734]}
        >
          <meshMatcapMaterial matcap={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/react.glb");
