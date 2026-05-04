import { motion } from "framer-motion";
import { ArrowRight, MapPin, Terminal } from "lucide-react";
import { Section } from "./Section";

export const About = () => {
  const techTags = ["React", "Node.js", "TensorFlow", "AWS", "LLMs", "System Design"];

  return (
    <Section id="about">
      <div className="flex flex-col gap-6 w-full pt-4 md:pt-6">
        <div className="relative p-6 md:p-8 lg:p-10 rounded-[2rem] bg-black/20 backdrop-blur-[28px] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.45)] overflow-hidden group">

          {/* Subtle glowing accents */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none transition-all duration-700 ease-in-out" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none transition-all duration-700 ease-in-out" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center relative z-10">

            {/* Left Column: Text */}
            <div className="space-y-6 max-w-2xl mx-auto lg:mx-0 w-full">

              {/* Header Info */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-[var(--text-tertiary)] uppercase tracking-widest font-semibold">
                  <Terminal size={14} className="text-[#00e6ff]" />
                  <span>Engineering + Problem Solving</span>
                </div>

                <h2 className="text-[2.8rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tight leading-[0.95]">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300 text-5xl md:text-6xl lg:text-7xl font-black drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                    AI Engineer
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-sky-400 text-3xl md:text-4xl lg:text-5xl font-black drop-shadow-[0_0_18px_rgba(56,189,248,0.22)] mt-2">
                    Software Developer
                  </span>
                </h2>

                <div className="flex items-center gap-2 text-[var(--text-tertiary)] text-xs md:text-sm pt-2">
                  <MapPin size={14} />
                  <span>Coimbatore, India</span>
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base"
              >
                <p>
                  Building intelligent, <strong className="text-white font-semibold">scalable systems</strong> that bridge <strong className="text-blue-300 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]">machine learning</strong> with real-world applications. Designing secure, cloud-native architectures engineered for performance and reliability.
                </p>
              </motion.div>

              {/* Highlight Line */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pl-4 border-l-[3px] border-cyan-500/40 py-1 relative"
              >
                <div className="absolute -left-[3px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00e6ff] to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-base md:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00e6ff] to-[#00bcd4] italic">
                  "Turning intelligence into systems. Turning systems into impact."
                </p>
              </motion.div>

              {/* Mindset & Signature & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-5 pt-2"
              >
                <a
                  href="#projects"
                  className="group/btn relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all duration-300 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(0,230,255,0.15)]"
                >
                  <span className="relative z-10 text-xs uppercase tracking-wider font-bold">View Projects</span>
                  <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </a>
              </motion.div>
            </div>

            {/* Right Column: Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[250px] md:h-[350px] lg:h-[400px] flex items-center justify-center w-full mt-8 lg:mt-0"
            >
              {/* Abstract Animated Blob Background */}
              <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full" />
              <div className="absolute w-[60%] h-[60%] border border-white/10 rounded-full border-dashed" />

              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                  borderRadius: ["40% 60% 70% 30%", "50% 50% 30% 70%", "40% 60% 70% 30%"]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-56 h-56 md:w-72 md:h-72 bg-gradient-to-tr from-cyan-600/10 via-blue-500/10 to-transparent blur-3xl"
              />

              {/* Central AI/System Core Graphic */}
              <div className="relative z-10 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 bg-[#0a0a0f]/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,230,255,0.15)] group-hover:shadow-[0_0_60px_rgba(0,230,255,0.25)] transition-shadow duration-700">
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '4s' }} />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-t border-r border-blue-400/40"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 rounded-full border-b border-l border-cyan-400/40"
                />

                {/* Core Dot & Text */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#00e6ff] mb-2" />
                  <div className="text-center font-mono text-[9px] md:text-[10px] text-cyan-200/80 tracking-widest uppercase leading-tight font-semibold">
                    Intelligence<br />+<br />Systems
                  </div>
                </div>
              </div>

              {/* Floating Tech Stack Tags */}
              {techTags.map((tag, i) => {
                const angle = (i * 360) / techTags.length - 90; // Start from top
                const radiusX = window.innerWidth < 768 ? 100 : 150;
                const radiusY = window.innerWidth < 768 ? 120 : 170;

                return (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="absolute z-20 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-[#111116]/80 border border-white/10 backdrop-blur-md text-[10px] md:text-xs font-medium text-gray-300 shadow-xl hover:scale-110 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
                    style={{
                      top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radiusY}px - 16px)`,
                      left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radiusX}px - 32px)`,
                    }}
                  >
                    {tag}
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </div>
    </Section>
  );
};
