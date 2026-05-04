import { useState, useEffect, useRef } from "react";
import { Home, User, Folder, Mail, GraduationCap, Award, Code, Users } from "lucide-react";
import { motion } from "framer-motion";


const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: GraduationCap, label: "Education", href: "#education" },
  { icon: Folder, label: "Projects", href: "#projects" },
  { icon: Award, label: "Achievements", href: "#achievements" },
  { icon: Users, label: "Leadership", href: "#leadership" },
  { icon: Code, label: "Skills", href: "#skills" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

export const Sidebar = () => {
  const [active, setActive] = useState("Home");
  const activeRef = useRef("Home");


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const matchingItem = navItems.find((item) => item.href === `#${id}`);
            if (matchingItem && activeRef.current !== matchingItem.label) {
              activeRef.current = matchingItem.label;
              setActive(matchingItem.label);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    const sections = navItems.map((item) => document.querySelector(item.href)).filter(Boolean);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    setActive(item.label);
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-4">
      {/* Container with Glassmorphism, Neumorphism & dark gradient pattern */}
      <div
        className="relative flex flex-col items-center gap-3 py-6 px-4 rounded-full border border-[rgba(255,255,255,0.05)] shadow-[8px_8px_20px_rgba(0,0,0,0.8),-4px_-4px_12px_rgba(255,255,255,0.03)]"
        style={{
          background: "linear-gradient(145deg, rgba(20,20,24,0.7), rgba(8,8,10,0.9))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          backgroundImage: `
            linear-gradient(145deg, rgba(20,20,24,0.7), rgba(8,8,10,0.9)),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.015) 2px,
              rgba(255, 255, 255, 0.015) 4px
            )
          `
        }}
      >
        {navItems.map((item) => {
          const isActive = active === item.label;
          return (
            <div key={item.label} className="relative group">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-in-out ${isActive
                  ? "text-white scale-110"
                  : "text-white/50 hover:text-white/90 hover:scale-[1.05]"
                  }`}
                style={{
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  boxShadow: isActive ? "0 0 15px rgba(255,255,255,0.15), inset 0 2px 4px rgba(255,255,255,0.05)" : "none"
                }}
              >
                <item.icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-300 ease-in-out ${isActive ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""}`}
                />
              </a>

              {/* Tooltip */}
              <div className="absolute left-full ml-5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#111115] text-gray-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out pointer-events-none whitespace-nowrap border border-white/5 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.5)] -translate-x-2 group-hover:translate-x-0 z-50">
                {item.label}
                {/* Tooltip Arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-[#111115]" />
              </div>

              {/* Active Indicator Animation */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 rounded-full z-0 pointer-events-none border border-white/10 backdrop-blur-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-5 bg-white/90 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                </motion.div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};
