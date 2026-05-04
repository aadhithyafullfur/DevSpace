import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { resumeData } from "../data/resume";
import { TiltCard } from "./TiltCard";
import { TextReveal } from "./TextReveal";

export const Experience = () => {
  return (
    <Section id="experience">
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <TextReveal
            text="Experience"
            className="text-3xl md:text-4xl font-bold"
          />
          <div className="mt-2 text-[var(--text-secondary)] text-lg">
            My professional journey and contributions to impactful teams.
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 bg-[var(--accent-primary)] rounded-full"
          />
        </div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-[var(--border-card)] md:left-5">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--accent-primary)] to-blue-500 origin-top"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </div>

          <div className="space-y-12">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative pl-12 md:pl-20 group">
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute left-[0.6rem] top-8 h-4 w-4 origin-center rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-primary)] group-hover:scale-150 group-hover:bg-[var(--accent-primary)] transition-all duration-500 z-10 shadow-[0_0_10px_var(--accent-primary)] md:left-[0.85rem]"
                />

                <TiltCard className="w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-card)] group-hover:border-[var(--border-card-hover)] transition-all duration-500 backdrop-blur-md overflow-hidden"
                  >
                    <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[var(--text-primary)] transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-xl text-[var(--accent-primary)] font-medium">
                            {exp.company}
                          </p>
                        </div>

                        {Array.isArray(exp.description) ? (
                          <ul className="list-disc list-outside ml-4 space-y-2 text-[var(--text-secondary)] leading-relaxed text-base">
                            {exp.description.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                            {exp.description}
                          </p>
                        )}
                      </div>

                      <div className="flex-shrink-0 mt-2 md:mt-0">
                        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-tertiary)] bg-[var(--bg-primary)]/50 px-4 py-2 rounded-full border border-[var(--border-card)] shadow-inner">
                          <Calendar
                            size={16}
                            className="text-[var(--accent-primary)]"
                          />
                          {exp.duration}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
