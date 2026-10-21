import { useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress, active } = useProgress();

  // إذا اكتمل التحميل تماماً، لا تعرض شيئاً
  if (!active && progress === 100) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center  backdrop-blur-sm pointer-events-none">
      <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-lg text-white font-extrabold font-generalsans">
        {progress.toFixed(0)}%
      </p>
      <p className="text-xs text-gray-400 mt-1">Loading 3D Model...</p>
    </div>
  );
};

export default CanvasLoader;
