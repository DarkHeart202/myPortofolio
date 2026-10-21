import { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [clickable, setClickable] = useState(false);
  const cursorRef = useRef(null);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const lastTarget = useRef(null);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      // سرعة التتبع والسلاسة (Lerp ratio)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;

      if (cursorRef.current && hasMoved.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!hasMoved.current) {
        currentPos.current = { x: e.clientX, y: e.clientY };
        hasMoved.current = true;
      }

      if (e.target !== lastTarget.current) {
        lastTarget.current = e.target;
        const isInteractive = !!e.target.closest(
          'a, button, [role="button"], input, select, textarea, label, summary'
        );
        setClickable(isInteractive);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{ transform: "translate3d(-100vw, -100vh, 0)" }}
      className={`pointer-events-none fixed top-0 left-0 z-[999] rounded-full transition-[height,width,background-color,border-color,box-shadow] duration-200 ease-out max-lg:hidden ${
        clickable
          ? "h-8 w-8 bg-blue-500/20 border border-blue-400/80 shadow-[0_0_15px_rgba(96,165,250,0.5)] backdrop-blur-[1px]"
          : "h-3.5 w-3.5 bg-blue-400/70 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
      }`}
    />
  );
}