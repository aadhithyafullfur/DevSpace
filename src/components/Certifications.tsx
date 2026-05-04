import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import { Section } from "./Section";
import { TextReveal } from "./TextReveal";

const certificationsData = [
  {
    company: "Oracle",
    title: "Oracle Certified Professional - Java SE 17 Developer",
    year: "2026",
    skills: "Java, OOP, Streams API, Multithreading, Collections",
    image: "/certification/OCPJSE17.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B9AD57B9F14AA12BF2C3DE327AAEF8307706F00F5E4BD89DE1D18DB17526F62D",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-6 mt-1">
        <rect x="2" y="6" width="20" height="12" rx="6" stroke="#C74634" strokeWidth="3" />
      </svg>
    )
  },
  {
    company: "Azure AI",
    title: "Azure AI Developer Associate",
    year: "2025",
    skills: "Azure AI services, Machine Learning, Cognitive Services, MLOps",
    image: "/certification/microsoft-azure-badge-DzndtguP.webp",
    link: "https://learn.microsoft.com/en-in/users/aadhithyarathakrishnan-2485/credentials/3a148a2cc1c4885b",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <rect x="2" y="2" width="9" height="9" fill="#f25022" />
        <rect x="13" y="2" width="9" height="9" fill="#7fba00" />
        <rect x="2" y="13" width="9" height="9" fill="#00a4ef" />
        <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
      </svg>
    )
  },
  {
    company: "Coursera",
    title: "IBM Cloud Computing Certification",
    year: "2025",
    skills: "Cloud Infrastructure, Virtualization, Deployment Models",
    image: "/certification/IBM.png",
    link: "https://www.coursera.org/account/accomplishments/verify/3ZHRC2C74968?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#0056D2" />
        <text x="6" y="18" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif">C</text>
      </svg>
    )
  },
  {
    company: "Coursera",
    title: "IBM Software Engineering",
    year: "2024",
    skills: "Software Development, Git, APIs, DevOps Basics",
    image: "/certification/IBM.png",
    link: "https://www.coursera.org/account/accomplishments/verify/AQ6SVZFEG147?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#0056D2" />
        <text x="6" y="18" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif">C</text>
      </svg>
    )
  }
];

export const Certifications = () => {
  return (
    <Section id="certifications" className="relative w-full overflow-hidden bg-transparent">

      <div className="flex flex-col items-center max-w-[1200px] mx-auto gap-12 relative z-10 w-full py-20 px-4 md:px-8">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-3 relative w-full mb-4">
          <TextReveal
            text="Certifications"
            className="text-3xl md:text-4xl font-bold tracking-tight text-white relative z-10"
          />
        </div>

        {/* Certifications Centered Layout */}
        <div className="w-full flex flex-wrap justify-center gap-6 items-stretch">
          {certificationsData.map((cert, index) => (
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
              className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] group flex flex-col rounded-2xl bg-[#030303] border border-white/5 hover:border-white/10 transition-colors duration-300 overflow-hidden"
            >
              <div className="p-6 md:p-7 flex flex-col h-full">

                {/* Header: Logo and Title */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 flex items-center justify-center">
                    {cert.logo}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold tracking-wide">
                      <span className="text-white">{cert.company.charAt(0)}</span>
                      <span className="text-gray-400">{cert.company.slice(1)}</span>
                    </h3>
                    <p className="text-xs font-medium text-white/80 mt-1 leading-snug pr-4">
                      {cert.title}
                    </p>
                  </div>
                </div>

                {/* Subtle Divider */}
                <div className="w-full h-[1px] bg-white/[0.04] my-6" />

                {/* Center Badge Image */}
                <div className="flex justify-center mb-8">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className={`${cert.company === "Coursera" ? "h-16 md:h-20" : "h-28 md:h-32"} object-contain`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  />
                </div>

                {/* Skills Section */}
                <div className="flex flex-col mt-auto mb-6">
                  <h4 className="text-[15px] font-bold mb-2">
                    <span className="text-white">S</span>
                    <span className="text-gray-400">kills:</span>
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    {cert.skills}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[#00e6ff]">
                    <Calendar size={14} />
                    <span className="text-xs font-medium">{cert.year}</span>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-[#00e6ff] hover:text-white transition-colors duration-300"
                  >
                    <ExternalLink size={14} />
                    View Credential
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </Section>
  );
};
