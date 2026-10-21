"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "../util/cn";

export default function Swipper() {
  const numbers = [
    19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 3, 2, 1,
  ];

  const images = numbers.map((num) => ({
    src: `/sliders/slider${num}.png`,
    alt: `UI Component ${num}`,
  }));

  return (
    // 💡 الحاوية الكبرى واخدة overflow-hidden لمنع السكرول الأفقي، مع إعطاء مسافة padding مريحة للظلال
    <div className="w-full py-16 flex items-center justify-center overflow-hidden">
      <Carousel_003 images={images} showPagination loop autoplay />
    </div>
  );
}

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = true,
  spaceBetween = 0,
}) => {
  const css = `
  /* 💡 جعلنا الـ Overflow مرئي للسماح بظهور الشادو الضخم */
  .Carousal_003 {
    width: 100% !important;
    height: 600px;
    padding-bottom: 70px !important;
    padding-top: 20px !important;
    overflow: visible !important; 
  }

  .Carousal_003 .swiper-pagination {
    padding-top: 40px !important;
    position: relative !important;
    bottom: 0 !important;
  }
  
  /* 💡 الشادو الأساسي الداكن على الكارت قبل الهوفر لمنحه عمق 3D */
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 850px;
    border-radius: 1rem;
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.9), 
                0 0 40px 1px rgba(59, 130, 246, 0.1); /* شادو أسود عميق + توهج كحلي خفيف */
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  }

  @media (max-width: 1024px) {
    .Carousal_003 .swiper-slide {
      width: 500px;
    }
  }

  @media (max-width: 640px) {
    .Carousal_003 .swiper-slide {
      width: 320px;
    }
  }

  /* 💡 تقوية شادو التفاعل والتوهج الأزرق عند مرور الماوس (Hover) */
  .Carousal_003 .swiper-slide:hover {
    transform: translateY(-8px) scale(1.01); /* حركة رفع خفيفة تبرز الشادو */
    box-shadow: 0 45px 75px -10px rgba(0, 0, 0, 0.95), 
                0 0 50px 5px rgba(59, 130, 246, 0.35) !important; /* توهج أزرق/كحلي يتماشى مع هويتك */
  }

  .Carousal_003 .swiper-slide-shadow-left,
  .Carousal_003 .swiper-slide-shadow-right {
    border-radius: 1rem;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0)
    ) !important;
  }

  .swiper-pagination-bullet {
    background-color: #ffffff !important;
    opacity: 0.3;
    width: 10px;
    height: 10px;
    transition: all 0.3s ease-in-out !important;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background-color: #3B82F6 !important;
    width: 28px !important;
    border-radius: 999px !important;
    box-shadow: 0 0 14px rgba(59, 130, 246, 0.8) !important;
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      // 💡 تم تغيير overflow-hidden هنا لـ overflow-visible لكي لا يُقَص الشادو من الأطراف
      className={cn("relative w-full overflow-visible", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          speed={1200}
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 140,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              // 💡 تم إضافة البوردر الخفيف والظل الداكن مع spotlight-card
              className="spotlight-card group relative rounded-2xl border border-white/10 bg-slate-950 transition-all duration-300"
            >
              <img
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                src={image.src}
                alt={image.alt}
              />
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };
