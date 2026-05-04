import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const isPointerRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 2000, damping: 60, mass: 0.05 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      const isPtr = isPointerRef.current;
      cursorX.set(e.clientX - (isPtr ? 10 : 2));
      cursorY.set(e.clientY - (isPtr ? 4 : 2));

      const target = e.target as HTMLElement;
      const newIsPointer =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;

      if (isPtr !== newIsPointer) {
        isPointerRef.current = newIsPointer;
        setIsPointer(newIsPointer);
      }
    };

    window.addEventListener("mousemove", mouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center text-white drop-shadow-[0_0_15px_rgba(0,230,255,0.4)]"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {isPointer ? (
        // Hand pointer SVG with glow animation
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative text-white flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#00e6ff] rounded-full blur-[10px] opacity-40 animate-pulse" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2v0a2 2 0 0 0-4 0v12"/>
            <path d="M14 10V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2v0"/>
            <path d="M10 9.5V4a2 2 0 0 0-4 0v14l-4.5-4.5a2 2 0 0 0-2.83 2.83l6.59 6.59A2 2 0 0 0 6.67 24H16a6 6 0 0 0 6-6v-7z"/>
          </svg>
        </motion.div>
      ) : (
        // Arrow pointer SVG
        <div className="relative text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
