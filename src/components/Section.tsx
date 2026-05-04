import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ children, id, className = "" }: SectionProps) => {
  return (
    <section id={id} className={`relative min-h-screen py-20 scroll-mt-24 px-6 md:px-12 w-full mx-auto flex flex-col justify-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </section>
  );
};
