import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { Section } from "./Section";
import { resumeData } from "../data/resume";

export const Education = () => {
  return (
    <Section id="education">
      <div className="flex flex-col gap-8 w-full pt-4 md:pt-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
            <GraduationCap size={14} className="text-[#00e6ff]" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Academic</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#00e6ff]">
            Education
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-3xl mx-auto w-full mt-6 px-4 md:px-0">
          
          {/* Timeline Line */}
          {/* Mobile: left-8 (32px). Desktop: center. */}
          <div className="absolute left-8 md:left-1/2 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#00e6ff]/0 via-[#00bcd4]/30 to-[#00e6ff]/0 md:-translate-x-1/2 z-0" />

          <div className="space-y-6 md:space-y-8">
            {resumeData.education.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-2 h-2 rounded-full bg-[#00e6ff] z-10 top-6 md:top-1/2 md:-translate-y-1/2 -translate-x-[3.5px] md:-translate-x-1/2 shadow-[0_0_10px_#00e6ff]">
                    <motion.div 
                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.8, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-[#00bcd4] blur-[3px]"
                    />
                  </div>
                  
                  {/* Empty Half (Desktop only) */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <div className={`w-full pl-12 md:pl-0 md:w-1/2 flex ${isEven ? 'md:justify-start md:pr-10' : 'md:justify-end md:pl-10'}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative p-5 md:p-6 rounded-[16px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] shadow-lg hover:scale-[1.02] hover:-translate-y-1 hover:border-[#00e6ff]/50 hover:shadow-[0_0_30px_rgba(0,230,255,0.35)] transition-all duration-300 ease-in-out group w-full max-w-[420px]"
                    >
                      <div className="flex flex-col gap-3">
                        {/* Header: Institution and Duration */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <h3 className="text-base md:text-lg font-bold text-[#00e6ff] tracking-tight leading-snug">
                            {edu.institution}
                          </h3>
                          <div className="inline-flex items-center gap-1.5 text-[10px] md:text-xs text-[#00e6ff] font-mono flex-shrink-0 mt-0.5 sm:mt-0 bg-[rgba(0,230,255,0.1)] px-3 py-1 rounded-full border border-[rgba(0,230,255,0.3)]">
                            <Calendar size={12} />
                            <span>{edu.duration}</span>
                          </div>
                        </div>

                        {/* Degree */}
                        <div className="flex flex-col pt-1">
                          <p className="text-sm md:text-[15px] text-gray-300 font-medium tracking-wide">
                            {edu.degree}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};
