import { useProgress } from "@react-three/drei";

export default function LoadingScreen() {
  const { progress, active } = useProgress();

  return (
    <div
      className={`fixed inset-0 z-[100] bg-gradient-to-b from-[#7e121d] to-[#4a0505] flex flex-col items-center justify-center transition-opacity duration-1000 ${
        active
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative">
        <div className="w-24 h-24 border-4 border-gold-900/30 rounded-full animate-spin border-t-gold-400" />
        <div className="absolute inset-0 flex items-center justify-center font-serif text-gold-200 font-bold text-xl animate-pulse">
          A & A
        </div>
      </div>

      <div className="mt-6 font-sans text-gold-600 text-sm tracking-widest uppercase">
        Loading Romance... {Math.round(progress)}%
      </div>
    </div>
  );
}
