import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { navLinks } from "../constants";

function NavItems() {
  return (
    <ul className="nav-ul">
      {navLinks.map(({ id, href, name }) => (
        <li key={id} className="nav-li">
          <a href={href} className="nav-li_a" onClick={() => {}}>
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // لا تتفاعل إلا إذا كانت الحركة حقيقية وواضحة (أكثر من 10 بكسل مثلاً)
    if (diff > 10 && latest > 150 && !isOpen) {
      setHidden(true);
    } else if (diff < -10) {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-navy/70 backdrop-blur-md  border-b border-navy-300/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="flex items-center   group">
            {/* لوجو حرف A الهندسي بـ SVG */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              {/* الضلع الأيسر والأيمن */}
              <path
                d="M20 5L6 35H14L20 20L26 35H34L20 5Z"
                fill="url(#navy-gradient)"
              />
              {/* الشرطة المتوسطة المضيئة */}

              <defs>
                <linearGradient
                  id="navy-gradient"
                  x1="6"
                  y1="5"
                  x2="34"
                  y2="35"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffffff" />
                  <stop
                    offset="1"
                    stopColor="#a1a1a1"
                    className="transition-colors duration-300 group-hover:[stop-color:#e5e5e5]"
                  />
                </linearGradient>
              </defs>
            </svg>

            <span className="text-neutral-400 font-bold text-xl tracking-wide group-hover:text-white transition-colors">
              seem
            </span>
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle Menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>

          {/* قائمة شاشات الكمبيوتر */}
          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      {/* قائمة الموبايل Sidebar */}
      {isOpen && (
        <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
          <nav className="p-5">
            <NavItems />
          </nav>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
