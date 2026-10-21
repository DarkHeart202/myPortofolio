import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        // الاستايل الأساسي الموحد لكل التوستات
        style: {
          scale: 1.3,
          background: "rgba(11, 19, 41, 0.85)", // درجة الكحلي الداكن من الخلفية مع شفافية
          color: "#f8fafc",
          border: "1px solid rgba(56, 189, 248, 0.2)", // بوردر سماوي خفيف يطابق الأيقونات
          borderRadius: "12px",
          padding: "12px 18px",
          boxShadow:
            "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(56, 189, 248, 0.15)", // توهج خفيف يناسب الـ Glow
          backdropFilter: "blur(12px)",
          fontFamily: "sans-serif",
          fontSize: "14px",
        },
        // استايل النجاح Success (إشارة خضراء مشعة)
        success: {
          iconTheme: {
            primary: "#06b6d4", // Cyan مشع متناسق مع أيقونة Ays والـ React
            secondary: "#0b1329",
          },
          style: {
            border: "1px solid rgba(6, 182, 212, 0.35)",
            boxShadow:
              "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(6, 182, 212, 0.25)",
          },
        },
        // استايل الخطأ Error (أحمر وردي متناسق مع التيم)
        error: {
          iconTheme: {
            primary: "#f43f5e",
            secondary: "#0b1329",
          },
          style: {
            border: "1px solid rgba(244, 63, 94, 0.35)",
            boxShadow:
              "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(244, 63, 94, 0.25)",
          },
        },
      }}
    />
  </StrictMode>,
);
