import { motion } from "framer-motion";
import { Code2, Layers, Database, BrainCircuit, ShieldCheck, Terminal } from "lucide-react";
import { Section } from "./Section";
import { TextReveal } from "./TextReveal";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["C", "Java", "JavaScript", "Python"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    skills: [
      "React",
      "React Native",
      "Redux",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "NestJS",
      "Spring Boot",
    ],
  },
  {
    title: "Cloud & Databases",
    icon: Database,
    skills: ["AWS", "Docker", "MongoDB", "MySQL", "Redis", "Firebase", "Azure"],
  },
  {
    title: "AI / ML & Data Science",
    icon: BrainCircuit,
    skills: [
      "NumPy",
      "Pandas",
      "TensorFlow",
      "Keras",
      "CNN",
      "OpenCV",
      "NLP",
      "LLM",
      "RAG",
    ],
  },
  {
    title: "Security & Tools",
    icon: ShieldCheck,
    skills: ["JWT", "OAuth2", "API Security", "Git", "Postman", "Figma", "N8N"],
  },
];

// Helper to chunk skills into arrays of 3 for multi-line display
const chunkArray = (arr: string[], size: number) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const DetailedSkills = () => {
  return (
    <Section id="detailed-skills" className="relative w-full">
      <div className="flex flex-col items-center max-w-6xl mx-auto gap-12 relative py-20 px-4 md:px-8">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00e6ff]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-3 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00e6ff]/5 border border-[#00e6ff]/10 backdrop-blur-md"
          >
            <Terminal size={14} className="text-[#00e6ff]" />
            <span className="text-xs font-medium tracking-widest text-[#00e6ff] uppercase">Expertise</span>
          </motion.div>
          
          <TextReveal
            text="Technical Skills"
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          />
        </div>

        {/* Structured Centered Layout */}
        <div className="w-full relative z-10 flex flex-wrap justify-center gap-6 lg:gap-8 items-stretch">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            // Split skills into rows of 3 to avoid long strings
            const skillRows = chunkArray(category.skills, 3);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)] group relative flex flex-col rounded-2xl bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/5 hover:border-[#00e6ff]/30 transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] hover:shadow-[0_8px_30px_rgba(0,230,255,0.08)] overflow-hidden"
              >
                {/* Subtle Inner Gradient & Grid Noise */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00e6ff]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

                <div className="p-6 md:p-8 flex flex-col items-center h-full relative z-10 text-center">
                  <div className="flex flex-col items-center gap-3 pb-5 border-b border-white/10 mb-5 w-full group-hover:border-[#00e6ff]/20 transition-colors duration-300">
                    <div className="p-2.5 rounded-xl bg-[#00e6ff]/10 border border-[#00e6ff]/20 text-[#00e6ff] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,230,255,0.4)] transition-all duration-300 mb-2">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00e6ff] transition-colors duration-300 tracking-wide">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 flex-1 w-full justify-center">
                    {skillRows.map((row, rIndex) => (
                      <div key={rIndex} className="flex items-center justify-center flex-wrap">
                        {row.map((skill, sIndex) => (
                          <span key={sIndex} className="text-sm font-medium text-gray-400">
                            {skill}
                            {sIndex < row.length - 1 && (
                              <span className="mx-2.5 text-gray-700 font-light select-none">•</span>
                            )}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </Section>
  );
};
