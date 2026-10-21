import {
  ContactShadows,
  Environment,
  Float,
  // OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import AseemModel from "../components/AseemModel";
import CanvasLoader from "../components/CanvasLoader";
import TailwindLogo from "../components/TailwindLogo";
import { calculateSizes } from "../constants";
import ReactIcon from "../components/ReactIcon";
import Rings from "../components/Rings";
import HeroAtom from "../components/HeroAtom";
import HeroCamera from "../components/HeroCamera";
import { useState } from "react";
import Button from "../components/Button";
// import { useControls } from "leva";

function HeroSection() {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const [isActive, setIsActive] = useState(false);

  // const { rotX, rotY, rotZ } = useControls("Model Rotation", {
  //   rotX: { value: 0, min: -180, max: 180, step: 1 },
  //   rotY: { value: -90, min: -180, max: 180, step: 1 }, // -90 درجة
  //   rotZ: { value: 0, min: -180, max: 180, step: 1 },
  // });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  return (
    <section
      id="home"
      className="h-screen w-full flex flex-col relative bg-dot-pattern"
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
    >
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-25 c-space gap-3 z-10">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi, I am Aseem <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Products & Brands
        </p>
      </div>

      <div className="w-full h-full absolute">
        {/* اللودر هنا أصبح HTML Overlay يقرأ useProgress ويغطي الـ Canvas حتى ينتهي التحميل */}

        <CanvasLoader />
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 30]} />

          {/* 1. بيئة إضاءة خفيفة بتنور الـ Materials من كل الاتجاهات بنعومة */}
          <Environment preset="city" environmentIntensity={0.4} />

          {/* 2. إضاءة محيطية معتدلة تظهر ألوان الشاشة والكيسة والمكتب */}
          <ambientLight intensity={1.2} />

          {/* 3. ضوء رئيسي من الأمام والأعلى قليلاً (Z أبعد) عشان يضرب في وش المكتب مش يعكس لورا */}
          <directionalLight position={[0, 3, 18]} intensity={1.2} />

          {/* 4. ضوء جانبي خفيف يبرز تفاصيل كيسة الـ PC على اليمين */}
          <directionalLight position={[10, 10, 5]} intensity={0.5} />

          {/* Testing Rotation */}
          {/* <OrbitControls makeDefault enableZoom={true} /> */}

          <Suspense fallback={null}>
            <HeroCamera isMobile={isMobile} isActive={isActive}>
              <AseemModel
                scale={sizes.aseemScale}
                position={sizes.aseemPosition}
                rotation={sizes.aseemRotation}
                // scale={sizes.aseemScale}
                // position={sizes.aseemPosition}
                // rotation={[
                //   (rotX * Math.PI) / 180,
                //   (rotY * Math.PI) / 180,
                //   (rotZ * Math.PI) / 180,
                // ]}
              />
            </HeroCamera>

            <Float floatIntensity={3} speed={2.5} rotationIntensity={0.5}>
              <group>
                <TailwindLogo
                  position={sizes.targetPosition}
                  scale={sizes.targetScale}
                />
                <ReactIcon
                  position={sizes.reactLogoPosition}
                  scale={sizes.reactLogoScale}
                />
                <Rings position={sizes.ringPosition} />
              </group>
            </Float>
          </Suspense>

          <ContactShadows
            position={[0, -4.5, 0]}
            opacity={0.75}
            scale={20}
            blur={2.5}
            far={4.5}
          />
        </Canvas>
      </div>

      <HeroAtom />

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
