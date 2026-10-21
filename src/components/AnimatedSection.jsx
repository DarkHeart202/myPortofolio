import { motion } from "framer-motion";

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  yOffset = 50,
  id,
}) {
  return (
    <motion.section
      id={id}
      // الحالة الابتدائية (قبل ما يظهر في الشاشة)
      initial={{ opacity: 0, y: yOffset }}
      // الحالة عند الوصول للسكشن
      whileInView={{ opacity: 1, y: 0 }}
      // لتشغيل الأنيميشن مرة واحدة فقط عند التمرير (لا يتكرر عند الصعود والنزول)
      viewport={{ once: true, amount: 0.2 }}
      // إعدادات الحركة لتكون سلسة جداً (Smooth Transition)
      transition={{
        duration: 1.5,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom Cubic Bezier لحركة ناعمة
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
