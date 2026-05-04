import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

const FloatingIcon = ({ children, delay, x, y }: any) => (
  <motion.div
    className="absolute text-white/20 opacity-5 pointer-events-none"
    style={{ left: x, top: y, width: 48, height: 48 }}
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay }}
  >
    {children}
  </motion.div>
);

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 60fps smooth progress using requestAnimationFrame
    let start = performance.now();
    const duration = 2500; // 2.5 seconds
    let animationFrame: number;

    const update = (time: number) => {
      const elapsed = time - start;
      const t = Math.min(elapsed / duration, 1);
      
      // cubic easeOut
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);

      if (t < 1) {
        animationFrame = requestAnimationFrame(update);
      } else {
        setTimeout(onComplete, 400); // Slight pause at 100%
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Very subtle static gradient background (No heavy blur or backdrop-filter) */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, #11111a 0%, #000000 100%)'
        }}
      />

      {/* Floating Tech Elements (GPU Accelerated transforms only) */}
      {/* React */}
      <FloatingIcon x="12%" y="22%" delay={0}>
        <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor"><circle r="2.05"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
      </FloatingIcon>
      
      {/* Node.js (Hexagon structure) */}
      <FloatingIcon x="78%" y="18%" delay={1.5}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </FloatingIcon>

      {/* JavaScript */}
      <FloatingIcon x="18%" y="72%" delay={1}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M8 16v-4c0-1.1.9-2 2-2s2 .9 2 2v4"/><path d="M16 16v-6M12 16h4"/></svg>
      </FloatingIcon>

      {/* Database/MongoDB */}
      <FloatingIcon x="82%" y="75%" delay={2.5}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
      </FloatingIcon>

      {/* Git */}
      <FloatingIcon x="50%" y="10%" delay={3.5}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="9" r="3"/><path d="M18 12v-1c0-1.1-.9-2-2-2h-4"/><path d="M6 9v9"/><path d="M12 15v-6"/></svg>
      </FloatingIcon>

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center w-full max-w-sm px-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Label Text */}
        <div className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-white/40 mb-5">
          PORTFOLIO
        </div>

        {/* Large Bold Name with Gradient Accent */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Aadhithya <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e6ff] to-[#00bcd4]">R</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-white/50 tracking-wide mb-12">
          AI Engineer <span className="mx-2 text-white/20">•</span> Full Stack Developer
        </p>

        {/* Progress Section */}
        <div className="w-full mt-2">
          <div className="flex justify-between items-end mb-2.5">
            <span className="text-[11px] text-white/40 uppercase tracking-widest font-medium">Calculating stats...</span>
            <span className="text-xs font-mono text-white/70">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full h-[2px] bg-white/[0.08] overflow-hidden relative rounded-full">
            {/* Using scaleX for perfectly smooth, GPU-accelerated animation without re-layouts */}
            <motion.div 
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-[#00e6ff] to-[#00bcd4] origin-left rounded-full"
              style={{ scaleX: progress / 100 }}
            />
          </div>
        </div>

        {/* 3 pulsing dots below */}
        <div className="flex gap-2 mt-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/20"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
