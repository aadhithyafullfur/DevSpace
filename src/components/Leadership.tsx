import { motion } from "framer-motion";
import { Users, Building, Calendar } from "lucide-react";
import { Section } from "./Section";
import { resumeData } from "../data/resume";
import { TextReveal } from "./TextReveal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const LeadershipCard = ({
  item,
}: {
  item: typeof resumeData.leadership[0];
}) => {
  return (
    <motion.div variants={itemVariants} className="w-full flex h-full">
      <motion.div 
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group relative w-full rounded-[24px] bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.3)] transition-all duration-500 flex flex-col md:flex-row overflow-hidden z-10"
      >
        {/* Animated Gradient Background on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />
        
        {/* Top Highlight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-full transition-all duration-700 ease-out" />

        {/* Image Container */}
        <div className="relative w-full md:w-2/5 h-56 md:h-auto overflow-hidden bg-white/5 border-b md:border-b-0 md:border-r border-white/5 group-hover:border-cyan-500/20 transition-colors duration-500">
          <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
            {/* If the image fails to load or before user adds it, we show a sleek icon fallback */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={item.image} 
                alt={item.club} 
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out drop-shadow-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
              />
              <Users className="fallback-icon hidden text-cyan-500/40 w-16 h-16 group-hover:scale-110 group-hover:text-cyan-400/60 transition-all duration-500" />
            </div>
          </div>
          {/* Subtle image overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0c]/80 to-transparent z-20 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative flex-1 p-6 md:p-8 flex flex-col justify-center gap-4 z-20">
          <div className="space-y-2">
            <h4 className="font-extrabold text-white tracking-tight text-xl md:text-2xl group-hover:text-cyan-50 transition-colors duration-300">
              {item.role}
            </h4>
            
            <div className="flex flex-col gap-2 mt-3">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold tracking-wide text-sm md:text-base">
                <Users size={16} className="text-cyan-500" />
                <span>{item.club}</span>
              </div>
              <div className="inline-flex items-center gap-2 text-slate-400 text-sm md:text-base font-medium">
                <Building size={14} className="text-slate-500" />
                <span>{item.institution}</span>
              </div>
            </div>
          </div>

          {/* Bottom details / Year */}
          <div className="mt-4 pt-4 border-t border-white/5 group-hover:border-cyan-500/20 transition-colors duration-500 flex items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-slate-300 backdrop-blur-md group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-300">
              <Calendar size={12} className="text-cyan-400" />
              {item.year}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Leadership = () => {
  return (
    <Section id="leadership" className="relative overflow-hidden w-full">
      <div className="flex flex-col items-center max-w-6xl mx-auto gap-16 relative py-20 px-4 md:px-8">
        
        {/* Ambient Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -z-10 pointer-events-none opacity-30" />

        <div className="flex flex-col items-center text-center space-y-4 relative z-10 w-full group cursor-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner"
          >
            <Users size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold tracking-widest text-slate-300 uppercase">Community</span>
          </motion.div>
          
          <div className="relative inline-block mt-2">
            <TextReveal
              text="Leadership"
              className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-sm"
            />
            {/* Reveal Underline effect */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />
          </div>
          <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-medium tracking-wide mt-6">
            Driving impact through collaboration, management, and technical guidance.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {resumeData.leadership?.map((item, index) => (
            <LeadershipCard key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
