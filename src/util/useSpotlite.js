import { useEffect } from "react";

export function useSpotlight() {
  useEffect(() => {
    const handlePointerMove = (e) => {
      // البحث عن أقرب عنصر يحمل كلاس spotlight-card تحت الماوس
      const card = e.target.closest(".spotlight-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    };

    const handlePointerLeave = (e) => {
      const card = e.target.closest(".spotlight-card");
      if (!card) return;

      card.style.setProperty("--mx", "-9999px");
      card.style.setProperty("--my", "-9999px");
    };

    // إضافة المستمعين على مستوى الـ document بالكامل
    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerout", handlePointerLeave, {
      passive: true,
    });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerLeave);
    };
  }, []);
}
