import Globe from "react-globe.gl";
import Button from "../components/Button";
import { useRef, useEffect } from "react";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";

function About() {
  const [hasCopied, setHasCopied] = useState(false);
  function handleCopy(e) {
    e.preventDefault();
    navigator.clipboard.writeText("mahmoud.aseem2002@gmail.com");

    setHasCopied(true);
    setTimeout(() => {}, 2000);
  }
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;

      globeRef.current.pointOfView({
        lat: 20,
        lng: 0,
        altitude: 2.5,
      });
    }
  }, []);

  return (
    <AnimatedSection id="about" className="c-space my-20 max-w-7xl mx-auto">
      {/* 1. غيّرنا h-full إلى h-auto */}
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-auto">
        {/* Card 1 */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container spotlight-card">
            <p className="text-base text-[#afb0b6] font-fira">01</p>
            <img
              src="/assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div className="mt-auto">
              <p className="grid-headtext">Hi, I'm Mahmoud</p>
              <p className="grid-subtext">
                With 5+ years of experience, I bridge the gap between Senior
                UI/UX design and frontend development, specializing in animated
                3D.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container spotlight-card">
            <p className="text-base text-[#afb0b6] font-fira">02</p>
            <img
              src="/assets/grid2.png"
              alt="grid-2"
              className="w-full  h-fit object-contain"
            />
            <div className="mt-auto">
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in JavaScript with a focus on React and Next.js
                ecosystems.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 (Globe) */}
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container spotlight-card">
            <p className="text-base text-[#afb0b6] font-fira">03</p>
            {/* 2. ضفنا overflow-hidden و w-full هنا لحماية الكارد في الموبايل */}
            <div className="rounded-3xl w-full sm:h-[326px] h-[300px] flex justify-center items-center overflow-hidden">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0,0,0,0)"
                backgroundOpacity={0.5}
                showAtmosphere
                showGraticules
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  {
                    lat: 31.0409,
                    lng: 31.3785,
                    text: "I'm here!",
                    color: "white",
                    size: 50,
                  },
                ]}
              />
            </div>
            <div className="mt-auto">
              <p className="grid-headtext">
                I work remotely across most timezones.
              </p>
              <p className="grid-subtext">
                I'm based in Egypt, with remote work available.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-4" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        {/* 3. تعديل col-span لتكون متوافقة مع الموبايل والـ XL */}
        <div className="col-span-1 xl:col-span-2 xl:row-span-3">
          <div className="grid-container spotlight-card">
            <p className="text-base text-[#afb0b6] font-fira">04</p>
            <img
              src="/assets/grid03.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />
            <div className="mt-auto">
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Coding
                isn't just my profession - it is my passion.
              </p>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="col-span-1 xl:row-span-2">
          <div className="grid-container spotlight-card">
            <p className="text-base text-[#afb0b6] font-fira">05</p>
            <img
              src="/assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[200px] sm:h-[270px]   h-fit object-cover sm:object-top"
            />
            <div className="space-y-2 ">
              <p className="grid-subtext text-center">{`${hasCopied ? "Mail Copied to clipboard" : "Contact"} `}</p>

              <button
                type="button"
                onClick={handleCopy}
                className={`focus:outline-none ${hasCopied ? "c" : "cursor-pointer "} flex gap-2 items-center justify-center mx-auto`}
              >
                <img
                  src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-base  font-normal text-gray_gradient text-white">
                  mahmoud.aseem2002@gmail.com
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default About;
