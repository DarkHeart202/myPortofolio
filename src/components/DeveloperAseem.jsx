import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Developer({ animationName = "idle", ...props }) {
  const animGroup = useRef();
  const { scene } = useGLTF("/models/Human.glb");

  const { animations: idleAnimation } = useFBX("/models/animations/idle.fbx");
  const { animations: saluteAnimation } = useFBX(
    "/models/animations/salute.fbx",
  );
  const { animations: clappingAnimation } = useFBX(
    "/models/animations/clapping.fbx",
  );
  const { animations: victoryAnimation } = useFBX(
    "/models/animations/victory.fbx",
  );

  if (idleAnimation?.[0]) idleAnimation[0].name = "idle";
  if (saluteAnimation?.[0]) saluteAnimation[0].name = "salute";
  if (clappingAnimation?.[0]) clappingAnimation[0].name = "clapping";
  if (victoryAnimation?.[0]) victoryAnimation[0].name = "victory";

  const { actions } = useAnimations(
    [
      ...(idleAnimation || []),
      ...(saluteAnimation || []),
      ...(clappingAnimation || []),
      ...(victoryAnimation || []),
    ],
    animGroup,
  );

  useEffect(() => {
    const currentName = animationName ? animationName.toLowerCase() : "idle";
    const action = actions?.[currentName] || actions?.["idle"];

    if (action) {
      action.reset().fadeIn(0.2).play();
    }

    return () => {
      if (action) action.fadeOut(0.2);
    };
  }, [animationName, actions]);

  return (
    <group {...props}>
      <group ref={animGroup} dispose={null}>
        <primitive object={scene} />
      </group>
    </group>
  );
}
