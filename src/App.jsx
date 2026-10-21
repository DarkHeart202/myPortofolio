import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";

import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import HeroSection from "./sections/HeroSection";
import Navbar from "./sections/Navbar";
import Project from "./sections/Project";
import Slider from "./sections/Slider";
import { useSpotlight } from "./util/useSpotlite";

function App() {
  useSpotlight();
  return (
    <main className="relative min-h-screen bg-navy-100  text-white overflow-x-hidden">
      <Background />
      <CustomCursor />
      <div className="relative">
        <Navbar />
        <HeroSection />
        <About />
        <Project />
        <Experience />
        <Slider />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

export default App;
