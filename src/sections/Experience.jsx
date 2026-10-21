import { Canvas } from "@react-three/fiber";
import { workExperiences } from "../constants";
import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Developer from "../components/DeveloperAseem";
import * as THREE from "three";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";

function Experience() {
  const [animationName, setAnimationName] = useState("idle");
  return (
    <AnimatedSection className="c-space max-w-7xl mx-auto my-20 ">
      <div className="w-full text-white-600">
        <h3 className="head-text">My Work Experience</h3>

        <div className="work-container">
          <div className="work-canvas spotlight-card">
            <CanvasLoader />
            <Canvas
              shadows
              dpr={[1, 2]}
              gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 0.85, // تقليل الـ Exposure قليلاً لضبط السطوع (كان 1)
              }}
              camera={{ position: [0, 0, 8], fov: 35 }}
            >
              <color attach="background" args={["#080d20"]} />
              {/* 1. إضاءة محيطية خفيفة هادئة */}
              <ambientLight intensity={0.35} /> {/* تقليل من 0.5 إلى 0.35 */}
              {/* 2. الإضاءة الرئيسية (Key Light) مع الظلال */}
              <directionalLight
                position={[4, 6, 5]}
                intensity={1.4} // تقليل من 2 إلى 1.4 لمنع السطوع الزائد
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              {/* 3. إضاءة التعبئة الموازنة (Fill Light) */}
              <directionalLight
                position={[-4, 2, 3]}
                intensity={0.4} // تقليل من 0.7 إلى 0.4
              />
              {/* 4. البيئة والموديل والظلال الأرضية */}
              <Suspense fallback={null}>
                <Environment preset="studio" environmentIntensity={0.6} />{" "}
                {/* إضافة تحكم بشدة انعكاس البيئة */}
                <Developer
                  position-y={-2.1}
                  scale={2.3}
                  animationName={animationName}
                  rotation={[0, 0.3, 0]}
                />
                <ContactShadows
                  position={[0, -3.01, 0]} // محاذاة مكان الظل أسفل قدم الشخصية تماماً
                  opacity={0.5}
                  scale={5}
                  blur={2.5}
                  far={4}
                />
              </Suspense>
              {/* <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} /> */}
            </Canvas>
          </div>

          <div className="work-content spotlight-card">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map(
                ({ id, name, pos, icon, duration, title, animation }) => (
                  <div
                    key={id}
                    className="work-content_container group"
                    onClick={() => setAnimationName(animation.toLowerCase())}
                    onPointerOver={() =>
                      setAnimationName(animation.toLowerCase())
                    }
                    onPointerOut={() => setAnimationName("idle")}
                  >
                    <div className="flex flex-col h-full justify-start items-center py-2">
                      <div className="work-content_logo">
                        <img src={icon} alt="logo" className="w-full h-full" />
                      </div>
                      <div className="work-content_bar" />
                    </div>

                    <div className="sm:p-5 px-2.5 py-5">
                      <p className="font-bold text-white-800">{name}</p>
                      <p className="text-sm mb-5">
                        {pos} -- {duration}
                      </p>
                      <p className="group-hover:text-white transition ease-in-out duration-500">
                        {title}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Experience;
