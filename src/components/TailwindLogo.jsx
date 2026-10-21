import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useRef } from "react";
// import { useEffect } from "react";
// import * as THREE from "three";

export default function TailwindLogo(props) {
  const { scene } = useGLTF("/models/tailwindcss-logo.glb");
  const logoRef = useRef();
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
  return <primitive ref={logoRef} object={scene} {...props} />;

  // useEffect(() => {
  //   if (scene) {
  //     scene.traverse((child) => {
  //       if (child.isMesh && child.material) {
  //         // حط أي لون تحبه هنا (Hex Code أو اسم اللون)
  //         child.material.color = new THREE.Color("#38bdf8"); // مثال: أخضر نيون

  //         // خيارات إضافية لو حابب تزود اللمعان:
  //         // child.material.metalness = 0.5;
  //         // child.material.roughness = 0.2;
  //       }
  //     });
  //   }
  // }, [scene]);
}
