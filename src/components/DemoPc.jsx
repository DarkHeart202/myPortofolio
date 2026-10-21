import { useGSAP } from "@gsap/react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import gsap from "gsap";
import { useRef } from "react";

export default function DemoPc(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/personal_computer.glb");
  const txt = useVideoTexture(
    props.texture ? props.texture : "/textures/project/project1.mp4",
  );
  if (txt) {
    txt.flipY = true; // خلّيها true بدل false
  }

  useGSAP(
    () => {
      if (!group.current) return;

      gsap.fromTo(
        group.current.rotation,
        { y: Math.PI / 2 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    },
    {
      scope: group,
      dependencies: [props.texture],
      revertOnUpdate: true,
    },
  );

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.003}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_PC_0.geometry}
              material={materials.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_LightMat_0.geometry}
              material={materials.LightMat}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_Screen_0.geometry}
              material={materials.Screen}
            >
              <meshBasicMaterial map={txt} toneMapped={false} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_Keyboard_0.geometry}
              material={materials.Keyboard}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/personal_computer.glb");
