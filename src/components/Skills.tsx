import { Section } from "./Section";
import { TextReveal } from "./TextReveal";
import { motion } from "framer-motion";

const allLogos = [
  { src: "/logo/azure.png", alt: "Azure" },
  { src: "/logo/c.png", alt: "C" },
  { src: "/logo/canva.png", alt: "Canva" },
  { src: "/logo/css.png", alt: "CSS" },
  { src: "/logo/express.png", alt: "Express" },
  { src: "/logo/flask.png", alt: "Flask" },
  { src: "/logo/git.png", alt: "Git" },
  { src: "/logo/github.png", alt: "GitHub" },
  { src: "/logo/html.png", alt: "HTML" },
  { src: "/logo/java.png", alt: "Java" },
  { src: "/logo/js.png", alt: "JavaScript" },
  { src: "/logo/mongodb.png", alt: "MongoDB" },
  { src: "/logo/nodejs.png", alt: "Node.js" },
  { src: "/logo/photoshop.png", alt: "Photoshop" },
  { src: "/logo/python.png", alt: "Python" },
  { src: "/logo/react.png", alt: "React" },
  { src: "/logo/IBM.png", alt: "IBM" },
];

// Shuffle or offset the second row so they don't look identical
const techLogos1 = [...allLogos];
const techLogos2 = [...allLogos].reverse();

export const Skills = () => {
  return (
    <Section id="skills" className="relative w-full overflow-hidden py-24 bg-transparent">
      <style>
        {`
          @keyframes infinite-scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes infinite-scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          
          .animate-scroll-left {
            animation: infinite-scroll-left 40s linear infinite;
          }
          .animate-scroll-right {
            animation: infinite-scroll-right 40s linear infinite;
          }
          
          .group-hover-pause:hover .animate-scroll-left,
          .group-hover-pause:hover .animate-scroll-right {
            animation-play-state: paused;
          }
          
          .mask-gradient {
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
        `}
      </style>

      <div className="flex flex-col items-center max-w-7xl mx-auto gap-16 relative px-4 md:px-8">

        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-3 relative z-10 w-full">
          <TextReveal
            text="Technology Stack"
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-medium tracking-wide mt-2"
          >
            Tools and frameworks I work with
          </motion.p>
        </div>

        {/* Marquee Container */}
        <div className="w-full relative mt-8 mask-gradient overflow-hidden pb-10 flex flex-col gap-8 md:gap-12 group-hover-pause">

          {/* ROW 1: SCROLL LEFT */}
          <div className="flex w-max animate-scroll-left items-center">
            {/* Set 1 */}
            <div className="flex items-center gap-12 md:gap-16 px-6 md:px-8">
              {techLogos1.map((logo, index) => (
                <div
                  key={`r1-s1-${index}`}
                  className="flex items-center justify-center shrink-0 w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain drop-shadow-md"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Set 2 */}
            <div className="flex items-center gap-12 md:gap-16 px-6 md:px-8">
              {techLogos1.map((logo, index) => (
                <div
                  key={`r1-s2-${index}`}
                  className="flex items-center justify-center shrink-0 w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain drop-shadow-md"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2: SCROLL RIGHT */}
          <div className="flex w-max animate-scroll-right items-center">
            {/* Set 1 */}
            <div className="flex items-center gap-12 md:gap-16 px-6 md:px-8">
              {techLogos2.map((logo, index) => (
                <div
                  key={`r2-s1-${index}`}
                  className="flex items-center justify-center shrink-0 w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain drop-shadow-md"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Set 2 */}
            <div className="flex items-center gap-12 md:gap-16 px-6 md:px-8">
              {techLogos2.map((logo, index) => (
                <div
                  key={`r2-s2-${index}`}
                  className="flex items-center justify-center shrink-0 w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain drop-shadow-md"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </Section>
  );
};
