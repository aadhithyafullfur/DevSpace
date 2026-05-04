import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Trophy, Award, Sparkles, Star } from "lucide-react";
import { Section } from "./Section";
import { resumeData } from "../data/resume";
import { TextReveal } from "./TextReveal";
import { useRef } from "react";
import type { MouseEvent } from "react";

const AchievementItem = ({ achievement, index }: { achievement: any, index: number }) => {
  const isEven = index % 2 === 0;

  // Mouse position for proximity glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className={`relative flex items-center justify-between md:justify-normal w-full mb-16 md:mb-32 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>

      {/* Center Timeline Node */}
      <div className="absolute left-[16px] md:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-20">
        <div className="w-full h-full bg-[#0a0a0c] rounded-full border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"
          />
        </div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="hidden md:block w-1/2" />

      {/* Card Container */}
      <div className={`w-full md:w-5/12 pl-14 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          onMouseMove={handleMouseMove}
          className="group relative rounded-3xl bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/5 overflow-hidden p-[1px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.3)]"
        >
          {/* Spotlight follow cursor effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  450px circle at ${mouseX}px ${mouseY}px,
                  rgba(34, 211, 238, 0.2),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Border glow gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Inner Content */}
          <div className="relative bg-[#0a0a0c]/80 rounded-[23px] p-8 h-full flex flex-col gap-6 z-10 border border-white/5 group-hover:border-white/10 transition-colors duration-500 backdrop-blur-xl">

            {/* Light reflection sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-[23px] pointer-events-none">
              <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:translate-x-[300%] transition-transform duration-[1.5s] ease-in-out" />
            </div>

            {/* Header: Icon + Year + Subtitle */}
            <div className={`flex flex-col gap-4 relative z-20 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  {index === 0 ? <Trophy className="text-cyan-400 w-6 h-6" /> : <Award className="text-purple-400 w-6 h-6" />}
                </div>
                {achievement.year && (
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-slate-300 backdrop-blur-md shadow-inner">
                    {achievement.year}
                  </span>
                )}
              </div>

              {achievement.subtitle && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/10 backdrop-blur-sm shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                  <Star className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" />
                  <span className="text-xs font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                    {achievement.subtitle}
                  </span>
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-4 relative z-20">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight relative inline-block">
                {achievement.title}
                {/* Glowing underline on hover */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              </h3>

              <p className="text-slate-400 leading-relaxed font-medium text-sm md:text-base">
                {achievement.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="achievements" className="relative overflow-hidden w-full">
      <div className="flex flex-col items-center max-w-7xl mx-auto gap-20 relative py-24 px-4 md:px-8">

        {/* Ambient Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] -z-10 pointer-events-none opacity-50" />

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner"
          >
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold tracking-widest text-slate-300 uppercase">Spotlight</span>
          </motion.div>

          <TextReveal
            text="Achievements"
            className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-sm"
          />
          <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-medium tracking-wide">
            Milestones of excellence and competitive problem-solving.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto mt-10 md:mt-20">

          {/* Central Line Base */}
          <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5" />

          {/* Central Line Animated Fill */}
          <motion.div
            className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)] origin-top"
            style={{ scaleY: lineHeight }}
          />

          {resumeData.achievements.map((achievement, index) => (
            <AchievementItem key={index} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

