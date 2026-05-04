import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, ArrowRight } from "lucide-react";
import { Section } from "./Section";
import { resumeData } from "../data/resume";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectCard = memo(({ project, index }: { project: any; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-6 w-full hover:-translate-y-[5px] transition-transform duration-300"
    >
      {/* Featured Showcase Image */}
      <a
        href={project.link || project.github || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full aspect-[16/10] overflow-hidden rounded-2xl bg-white/[0.01] border border-white/5"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-black transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        )}

        {/* Subtle dark gradient overlay fading in on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </a>

      {/* Clean Content Below Image */}
      <div className="flex flex-col gap-3 px-1">
        <div className="flex items-start justify-between gap-4">
          <a
            href={project.link || project.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-bold text-white/90 group-hover:text-cyan-400 transition-colors duration-300 tracking-tight"
          >
            {project.name}
          </a>
          <span className="shrink-0 text-xs font-mono text-cyan-400/80 border border-cyan-500/20 px-2.5 py-1 rounded-md bg-cyan-500/5">
            {project.year}
          </span>
        </div>

        <p className="text-base text-slate-400 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Minimal Tech Tags */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
          {project.techStack.slice(0, 4).map((tech: string) => (
            <span key={tech} className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between mt-4">
          <a
            href={project.link || project.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 border border-white/10 rounded-lg px-4 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all group/btn"
          >
            View Details
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </a>

          {project.github && (
            <div className="flex items-center">
              <div className="w-[1px] h-6 bg-white/10 mr-4" /> {/* Divider */}
              <div className="relative group/github">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project on GitHub"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(0,230,255,0.2)]"
                >
                  <Github size={18} />
                </a>
                {/* Tooltip */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover/github:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-[#111115] border border-white/5 text-xs text-gray-200 px-3 py-1.5 rounded-lg backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20">
                  View on GitHub
                  {/* Tooltip Arrow */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-[#111115]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export const Projects = () => {
  // Start with 9 to perfectly fill 3 rows of a 3-column grid
  const [visibleCount, setVisibleCount] = useState(9);
  const totalProjects = resumeData.projects.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, totalProjects));
  };

  return (
    <Section id="projects" className="bg-transparent">
      <div className="relative w-full py-32 overflow-hidden isolation-auto">

        <div className="relative z-10 flex flex-col gap-20 max-w-[1400px] mx-auto px-6 md:px-12">

          {/* Showcase Header */}
          <div className="flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
            >
              Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400/80 tracking-wide font-medium"
            >
              Building intelligent systems that scale, adapt, and solve.
            </motion.p>
          </div>

          {/* Premium Grid layout */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 min-h-[600px]">
            <AnimatePresence mode="popLayout">
              {resumeData.projects.slice(0, visibleCount).map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Minimal View More */}
          {visibleCount < totalProjects && (
            <div className="flex justify-center pt-10">
              <button
                onClick={handleViewMore}
                className="group flex items-center justify-center gap-2 px-8 py-3 bg-transparent text-slate-300 border border-white/10 rounded-full font-medium hover:text-white hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                View More Projects
                <ChevronDown
                  size={18}
                  className="group-hover:translate-y-1 transition-transform text-cyan-400"
                />
              </button>
            </div>
          )}

        </div>
      </div>
    </Section>
  );
};
