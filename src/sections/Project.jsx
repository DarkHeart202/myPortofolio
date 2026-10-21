import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import CanvasLoader from "../components/CanvasLoader";
import DemoPc from "../components/DemoPc";
import { myProjects } from "../constants";
import AnimatedSection from "../components/AnimatedSection";

export default function Project() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const projectCount = myProjects.length;
  function handleNavigation(direction) {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  }
  const currentProject = myProjects[selectedProjectIndex];

  return (
    <AnimatedSection id="work" className="c-space my-20 max-w-7xl mx-auto">
      <p className="head-text">My Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-navy-200">
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProject.logoStyle}
          >
            <img
              src={currentProject.logo}
              alt="logo"
              className="w-12 h-12 object-contain shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentProject.title}
            </p>
            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo ">
                  <img
                    src={tag.path}
                    alt={tag.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
            {currentProject.href && (
              <a
                className="flex items-center gap-05 cursor-pointer text-white-600"
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
              >
                <p>Check Live Site</p>
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.825 23.1993C10.3693 23.655 9.63065 23.655 9.17504 23.1993C8.71943 22.7437 8.71943 22.005 9.17504 21.5494L10 22.3744L10.825 23.1993ZM10 22.3744L9.17504 21.5494L21.5494 9.17506L22.3744 10L23.1993 10.825L10.825 23.1993L10 22.3744ZM22.3744 8.83335C23.0187 8.83335 23.541 9.35569 23.541 10L23.541 20.5C23.541 21.1444 23.0187 21.6667 22.3744 21.6667C21.73 21.6667 21.2077 21.1444 21.2077 20.5L21.2077 11.1667L11.8744 11.1667C11.23 11.1667 10.7077 10.6444 10.7077 10C10.7077 9.35569 11.23 8.83335 11.8744 8.83335L22.3744 8.83335Z"
                    fill={currentProject.color}
                  />
                </svg>
              </a>
            )}
          </div>
          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn arrow-btn-left"
              onClick={() => handleNavigation("previous")}
            >
              <img
                src="/assets/left-arrow.png"
                alt="left arrow"
                className="w-4 h-4 object-contain"
              />
            </button>
            <button
              className="arrow-btn arrow-btn-right"
              onClick={() => handleNavigation("next")}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right arrow"
                className="w-4 h-4 object-contain"
              />
            </button>
          </div>
        </div>

        <div className="spotlight-card border border-navy-300 bg-navy-100/60 backdrop-blur-md rounded-lg h-96 md:h-full">
          <CanvasLoader />
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <Environment preset="city" environmentIntensity={0.8} />

            {/* إضاءة عامة ناعمة */}
            <ambientLight intensity={0.3} />

            {/* Key Light: الإضاءة الأساسية من أعلى اليسار */}
            <directionalLight
              position={[-4, 7, 5]}
              intensity={2}
              color="#fff1df"
            />

            {/* Fill Light: توضيح تفاصيل الكيسة السوداء */}
            <directionalLight
              position={[5, 3, 4]}
              intensity={0.8}
              color="#d6e4ff"
            />

            {/* Rim Light: إضاءة الحواف من الخلف */}
            <directionalLight
              position={[0, 5, -4]}
              intensity={1.5}
              color="#8daaff"
            />
            <Suspense fallback={null}>
              {/* <group
                  scale={1.92}
                  position={[0.2, -2.8, 0]}
                  rotation={[0, -0.5, 0]}
                >
                  <DemoComputer texture={currentProject.texture} />
                </group> */}

              <group
                scale={4.3}
                position={[1.2, -1.5, 0]}
                rotation={[0.25, -0.4, 0]}
              >
                <DemoPc texture={currentProject.texture} />
              </group>
            </Suspense>

            <ContactShadows
              position={[0, -2.1, -0.2]}
              opacity={0.6}
              scale={10}
              blur={10}
              far={4}
            />
          </Canvas>
        </div>
      </div>
    </AnimatedSection>
  );
}
