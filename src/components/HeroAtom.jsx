import { motion } from "framer-motion";
import { FaJs, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiRedux, SiSass, SiTailwindcss } from "react-icons/si";
import styled, { css, keyframes } from "styled-components";

const HeroAtom = () => {
  return (
    <AtomContainer>
      {/* --- Nucleus (Avatar) --- */}
      <Nucleus
        as={motion.div}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "backOut" }}
      >
        <div className="avatar-wrapper">
          <img src="/circle2.png" alt="yousef~Al~noumany" className="avatar" />
        </div>
      </Nucleus>

      {/* --- Orbit 1 (Flat - 0deg) --- */}
      <OrbitPlane $angle={0}>
        <OrbitRing $duration={10}>
          <ElectronWrapper $pos="top">
            <Electron $color="#61dafb" $duration={10} $angle={0}>
              <FaReact />
            </Electron>
          </ElectronWrapper>
          <ElectronWrapper $pos="bottom">
            <Electron $color="#ffffff" $duration={10} $angle={0}>
              <SiNextdotjs />
            </Electron>
          </ElectronWrapper>
        </OrbitRing>
      </OrbitPlane>

      {/* --- Orbit 2 (Tilted 60deg) --- */}
      <OrbitPlane $angle={60}>
        <OrbitRing $duration={14} $reverse>
          <ElectronWrapper $pos="top">
            <Electron $color="#06b6d4" $duration={14} $angle={60} $reverse>
              <SiTailwindcss />
            </Electron>
          </ElectronWrapper>
          <ElectronWrapper $pos="bottom">
            <Electron $color="#764abc" $duration={14} $angle={60} $reverse>
              <SiRedux />
            </Electron>
          </ElectronWrapper>
        </OrbitRing>
      </OrbitPlane>
      <OrbitPlane $angle={0}>
        <OrbitRing $duration={10}>
          <ElectronWrapper $pos="top">
            <Electron $color="#61dafb" $duration={10} $angle={0}>
              <FaReact />
            </Electron>
          </ElectronWrapper>
          <ElectronWrapper $pos="bottom">
            <Electron $color="#ffffff" $duration={10} $angle={0}>
              <SiNextdotjs />
            </Electron>
          </ElectronWrapper>
        </OrbitRing>
      </OrbitPlane>

      {/* --- Orbit 2 (Tilted 60deg) --- */}
      <OrbitPlane $angle={60}>
        <OrbitRing $duration={14} $reverse>
          <ElectronWrapper $pos="top">
            <Electron $color="#06b6d4" $duration={14} $angle={60} $reverse>
              <SiTailwindcss />
            </Electron>
          </ElectronWrapper>
          <ElectronWrapper $pos="bottom">
            <Electron $color="#764abc" $duration={14} $angle={60} $reverse>
              <SiRedux />
            </Electron>
          </ElectronWrapper>
        </OrbitRing>
      </OrbitPlane>

      {/* --- Orbit 2 (Tilted 60deg) --- */}
      <OrbitPlane $angle={60}>
        <OrbitRing $duration={14} $reverse>
          <ElectronWrapper $pos="top">
            <Electron $color="#06b6d4" $duration={14} $angle={60} $reverse>
              <SiTailwindcss />
            </Electron>
          </ElectronWrapper>
          <ElectronWrapper $pos="bottom">
            <Electron $color="#764abc" $duration={14} $angle={60} $reverse>
              <SiRedux />
            </Electron>
          </ElectronWrapper>
        </OrbitRing>
      </OrbitPlane>

      {/* --- Orbit 3 (Tilted -60deg) --- */}
      <OrbitPlane $angle={-60}>
        <OrbitRing $duration={18}>
          <ElectronWrapper $pos="top">
            <Electron $color="#f7df1e" $duration={18} $angle={-60}>
              <FaJs />
            </Electron>
          </ElectronWrapper>
          <ElectronWrapper $pos="bottom">
            <Electron $color="#cc6699" $duration={18} $angle={-60}>
              <SiSass />
            </Electron>
          </ElectronWrapper>
        </OrbitRing>
      </OrbitPlane>
    </AtomContainer>
  );
};

/* --- ANIMATIONS --- */
const spin = keyframes`
  0% { transform: rotateZ(0deg); }
  100% { transform: rotateZ(360deg); }
`;

const spinReverse = keyframes`
  0% { transform: rotateZ(360deg); }
  100% { transform: rotateZ(0deg); }
`;

const counterRotate = (angle) => keyframes`
  0% { transform: rotateZ(360deg) rotateX(-70deg) rotateZ(${-angle}deg); }
  100% { transform: rotateZ(0deg) rotateX(-70deg) rotateZ(${-angle}deg); }
`;

const counterRotateReverse = (angle) => keyframes`
  0% { transform: rotateZ(0deg) rotateX(-70deg) rotateZ(${-angle}deg); }
  100% { transform: rotateZ(360deg) rotateX(-70deg) rotateZ(${-angle}deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const shine = keyframes`
  0% { left: -150%; }
  20% { left: 150%; }
  100% { left: 150%; }
`;

/* --- STYLED COMPONENTS --- */
const AtomContainer = styled.div`
  position: relative;
  width: 320px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  transform-style: preserve-3d;

  /* الموضع الافتراضي (للموبايل أو الشاشات الصغيرة) */
  margin: 26rem auto 2rem auto;

  /* للشاشات الكبيرة (لاب توب وديسكتوب) عشان تقف جنب شاشة الكمبيوتر على الشمال */
  @media (min-width: 1024px) {
    position: absolute;
    left: 8%; /* تقدر تتحكم في القيمة دي يمين أو شمال حسب مكان الشاشة عندك */
    top: 20%; /* لتحديد الارتفاع المظبوط قصاد الشاشة */
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
    position: absolute;
    left: 50%; /* بتزق العنصر لحد نص الشاشة بالضبط */
    transform: translateX(-50%); /* بتسحب العنصر نص عرضه عشان يسنتر تماماً */
    bottom: 12%; /* المسافة من أسفل الشاشة، تقدر تتحكم فيها براحتك */
    margin: 0;
  }
`;

const Nucleus = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  padding: 5px;
  background: linear-gradient(135deg, rgb(97, 218, 251) 0%, #000000 100%);
  box-shadow:
    0 0 30px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.05);
  animation: ${float} 6s ease-in-out infinite;
  transform-style: preserve-3d;

  .avatar-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    background: #fff;
    backface-visibility: hidden;

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -150%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-25deg);
      animation: ${shine} 4s ease-in-out infinite;
    }
  }

  @media (max-width: 768px) {
    width: 110px;
    height: 110px;
  }
`;

const OrbitPlane = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateZ(${(props) => props.$angle}deg) rotateX(70deg);
`;

const OrbitRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  will-change: transform;

  animation: ${(props) => (props.$reverse ? spinReverse : spin)}
    ${(props) => props.$duration}s linear infinite;
`;

const ElectronWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;

  ${(props) =>
    props.$pos === "top" &&
    css`
      top: 0;
      left: 50%;
    `}

  ${(props) =>
    props.$pos === "bottom" &&
    css`
      top: 100%;
      left: 50%;
    `}

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const Electron = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(30, 30, 35, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(100, 100, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${(props) => props.$color};
  font-size: 1.4rem;
  will-change: transform;

  animation: ${(props) =>
      props.$reverse
        ? counterRotateReverse(props.$angle)
        : counterRotate(props.$angle)}
    ${(props) => props.$duration}s linear infinite;

  svg {
    filter: drop-shadow(0 0 2px ${(props) => props.$color});
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default HeroAtom;
