import { motion, useScroll, useSpring } from "framer-motion";
import type { RefObject } from "react";

interface ScrollProgressProps {
  containerRef?: RefObject<HTMLElement | null>;
}

export const ScrollProgress = ({ containerRef }: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined
  );
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent-primary)] origin-[0%] z-[100]"
      style={{ scaleX }}
    />
  );
};
