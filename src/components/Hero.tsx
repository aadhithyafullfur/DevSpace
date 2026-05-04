import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, X, Minus, Maximize2, Minimize2, RotateCcw, Terminal, Github, Linkedin, Instagram } from "lucide-react";
import { resumeData } from "../data/resume";
import { TiltCard } from "./TiltCard";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, type ReactElement } from "react";

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.11 2.89A9.94 9.94 0 0 0 14.05 0H14a9.96 9.96 0 0 0-9.64 12.5L2 22l9.74-2.43A9.94 9.94 0 0 0 14 20h.05A10 10 0 0 0 24 10.05a9.94 9.94 0 0 0-2.89-7.16z" />
    <path d="M16.48 13.56c-.24-.12-1.4-.69-1.62-.77-.21-.08-.37-.12-.52.12-.16.24-.61.77-.75.93-.14.16-.29.18-.53.06a6.52 6.52 0 0 1-1.92-1.18 7.16 7.16 0 0 1-1.33-1.66c-.14-.24-.01-.38.11-.5.1-.11.24-.28.36-.42.11-.14.15-.24.22-.4.07-.16.03-.3-.02-.42-.06-.12-.52-1.26-.71-1.72-.19-.46-.39-.39-.53-.4-.13-.01-.28-.01-.43-.01a.82.82 0 0 0-.59.28c-.21.22-.8.78-.8 1.9 0 1.12.82 2.2 0.94 2.36.12.16 1.62 2.47 3.92 3.46.55.24 1.05.38 1.45.49.54.14 1.04.12 1.43.08.44-.05 1.4-.57 1.6-1.12.19-.55.19-1.02.13-1.12-.05-.09-.2-.15-.44-.27z" />
  </svg>
);

const SocialIcon = ({ href, icon: Icon, delay, glowColor }: any) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-center w-[36px] h-[36px] md:w-11 md:h-11 rounded-full border border-white/[0.08] bg-white/[0.05] backdrop-blur-md transition-transform duration-300 z-10"
      style={{
        willChange: "transform, opacity, box-shadow"
      }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 20px ${glowColor}, inset 0 0 10px ${glowColor}` }}
      />
      <Icon size={18} className="relative z-10 transition-colors duration-300 group-hover:text-white text-[var(--text-secondary)]" />
    </motion.a>
  );
};

export const Hero = () => {
  const { theme } = useTheme();
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [windowState, setWindowState] = useState<"normal" | "minimized" | "maximized" | "closed">("normal");

  // Build the code string
  const fullCode = `const profile = {
  name: "${resumeData.hero.name}",
  role: "${resumeData.hero.role}",
  mission: "${resumeData.hero.mission}",
  specialties: [
    ${resumeData.hero.specialties.map(s => `"${s}"`).join(",\n    ")}
  ],
  principles: [
    ${resumeData.hero.principles.map(p => `"${p}"`).join(",\n    ")}
  ],
  status: "${resumeData.hero.status}"
};`;

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 10;
    const startDelay = 600;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= fullCode.length) {
          setDisplayedCode(fullCode.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [fullCode]);

  const renderSyntaxHighlightedCode = (code: string) => {
    const colors = {
      keyword: theme === "dark" ? "var(--accent-primary)" : "#00bcd4",
      operator: theme === "dark" ? "#64748b" : "#94a3b8",
      bracket: theme === "dark" ? "#facc15" : "#ca8a04",
      name: theme === "dark" ? "#4ade80" : "#16a34a",
      role: theme === "dark" ? "#60a5fa" : "#2563eb",
      mission: theme === "dark" ? "#fb923c" : "#ea580c",
      array: theme === "dark" ? "#fef08a" : "#ca8a04",
      status: theme === "dark" ? "var(--accent-primary)" : "#00bcd4",
      property: theme === "dark" ? "#cbd5e1" : "#334155",
    };

    const lines = code.split('\n');
    const result: ReactElement[] = [];

    lines.forEach((line, lineIndex) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('const')) {
        const parts = line.split(/(\bconst\b|\bprofile\b|=|{)/g).filter(Boolean);
        parts.forEach((part, i) => {
          if (part === 'const') {
            result.push(<span key={`${lineIndex}-${i}`} style={{ color: colors.keyword }}>{part}</span>);
          } else if (part === '=') {
            result.push(<span key={`${lineIndex}-${i}`} style={{ color: colors.operator }}>{part}</span>);
          } else if (part === '{') {
            result.push(<span key={`${lineIndex}-${i}`} style={{ color: colors.bracket }}>{part}</span>);
          } else {
            result.push(<span key={`${lineIndex}-${i}`}>{part}</span>);
          }
        });
      } else if (trimmed.startsWith('name:')) {
        const match = line.match(/^(\s*)(name)(:)(\s*)(".*?")(,?)$/);
        if (match) {
          result.push(<span key={`${lineIndex}-0`}>{match[1]}</span>);
          result.push(<span key={`${lineIndex}-1`}>{match[2]}</span>);
          result.push(<span key={`${lineIndex}-2`} style={{ color: colors.operator }}>{match[3]}</span>);
          result.push(<span key={`${lineIndex}-3`}>{match[4]}</span>);
          result.push(<span key={`${lineIndex}-4`} style={{ color: colors.name }}>{match[5]}</span>);
          result.push(<span key={`${lineIndex}-5`} style={{ color: colors.operator }}>{match[6]}</span>);
        } else {
          result.push(<span key={lineIndex}>{line}</span>);
        }
      } else if (trimmed.startsWith('role:')) {
        const match = line.match(/^(\s*)(role)(:)(\s*)(".*?")(,?)$/);
        if (match) {
          result.push(<span key={`${lineIndex}-0`}>{match[1]}</span>);
          result.push(<span key={`${lineIndex}-1`}>{match[2]}</span>);
          result.push(<span key={`${lineIndex}-2`} style={{ color: colors.operator }}>{match[3]}</span>);
          result.push(<span key={`${lineIndex}-3`}>{match[4]}</span>);
          result.push(<span key={`${lineIndex}-4`} style={{ color: colors.role }}>{match[5]}</span>);
          result.push(<span key={`${lineIndex}-5`} style={{ color: colors.operator }}>{match[6]}</span>);
        } else {
          result.push(<span key={lineIndex}>{line}</span>);
        }
      } else if (trimmed.startsWith('mission:')) {
        const match = line.match(/^(\s*)(mission)(:)(\s*)(".*?")(,?)$/);
        if (match) {
          result.push(<span key={`${lineIndex}-0`}>{match[1]}</span>);
          result.push(<span key={`${lineIndex}-1`}>{match[2]}</span>);
          result.push(<span key={`${lineIndex}-2`} style={{ color: colors.operator }}>{match[3]}</span>);
          result.push(<span key={`${lineIndex}-3`}>{match[4]}</span>);
          result.push(<span key={`${lineIndex}-4`} style={{ color: colors.mission }}>{match[5]}</span>);
          result.push(<span key={`${lineIndex}-5`} style={{ color: colors.operator }}>{match[6]}</span>);
        } else {
          result.push(<span key={lineIndex}>{line}</span>);
        }
      } else if (trimmed.startsWith('status:')) {
        const match = line.match(/^(\s*)(status)(:)(\s*)(".*?")$/);
        if (match) {
          result.push(<span key={`${lineIndex}-0`}>{match[1]}</span>);
          result.push(<span key={`${lineIndex}-1`}>{match[2]}</span>);
          result.push(<span key={`${lineIndex}-2`} style={{ color: colors.operator }}>{match[3]}</span>);
          result.push(<span key={`${lineIndex}-3`}>{match[4]}</span>);
          result.push(<span key={`${lineIndex}-4`} style={{ color: colors.status }}>{match[5]}</span>);
        } else {
          result.push(<span key={lineIndex}>{line}</span>);
        }
      } else if (trimmed.includes('"Full-Stack"') || trimmed.includes('"Keep it simple"')) {
        result.push(<span key={lineIndex} style={{ color: colors.array }}>{line}</span>);
      } else if (trimmed.includes('[') || trimmed.includes(']')) {
        const parts = line.split(/(\[|\]|,)/g);
        parts.forEach((part, i) => {
          if (part === '[' || part === ']') {
            result.push(<span key={`${lineIndex}-${i}`} style={{ color: colors.operator }}>{part}</span>);
          } else if (part === ',') {
            result.push(<span key={`${lineIndex}-${i}`} style={{ color: colors.operator }}>{part}</span>);
          } else {
            result.push(<span key={`${lineIndex}-${i}`}>{part}</span>);
          }
        });
      } else if (trimmed === '};') {
        const match = line.match(/^(\s*)(})(;)$/);
        if (match) {
          result.push(<span key={`${lineIndex}-0`}>{match[1]}</span>);
          result.push(<span key={`${lineIndex}-1`} style={{ color: colors.bracket }}>{match[2]}</span>);
          result.push(<span key={`${lineIndex}-2`} style={{ color: colors.operator }}>{match[3]}</span>);
        } else {
          result.push(<span key={lineIndex}>{line}</span>);
        }
      } else {
        result.push(<span key={lineIndex}>{line}</span>);
      }

      if (lineIndex < lines.length - 1) {
        result.push(<span key={`newline-${lineIndex}`}>{'\n'}</span>);
      }
    });

    return <>{result}</>;
  };

  // Prevent body scrolling when maximized
  useEffect(() => {
    if (windowState === "maximized") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [windowState]);

  const renderWindowContent = (isMaximized = false) => (
    <div className={`relative z-10 w-full ${isMaximized ? "h-full rounded-none border-none" : "h-auto rounded-[20px] border border-[var(--border-card)]"} ${theme === "dark" ? (isMaximized ? "bg-[#050505]" : "bg-[var(--bg-card)]/80") : (isMaximized ? "bg-white" : "bg-white/80")
      } backdrop-blur-2xl p-4 flex flex-col justify-start overflow-hidden group ${!isMaximized ? "hover:border-[var(--border-card-hover)]" : ""} transition-colors duration-500 shadow-2xl ${theme === "dark" ? "shadow-black/50" : "shadow-gray-300/50"
      }`}>
      {/* Header */}
      <div className="mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 group/mac">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); setWindowState("closed"); }}
              style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
              className="w-3.5 h-3.5 rounded-full bg-red-500/90 flex items-center justify-center hover:bg-red-500 transition-colors cursor-pointer border-none shadow-[0_0_8px_rgba(239,68,68,0.4)]"
            >
              <X size={8} strokeWidth={3} className="opacity-0 group-hover/mac:opacity-100 text-red-950" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); setWindowState("minimized"); }}
              style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
              className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer border-none shadow-[0_0_8px_rgba(234,179,8,0.4)]"
            >
              <Minus size={8} strokeWidth={3} className="opacity-0 group-hover/mac:opacity-100 text-yellow-950" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); setWindowState(isMaximized ? "normal" : "maximized"); }}
              style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
              className="w-3.5 h-3.5 rounded-full bg-green-500/90 flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer border-none shadow-[0_0_8px_rgba(34,197,94,0.4)]"
            >
              {isMaximized ? (
                <Minimize2 size={8} strokeWidth={3} className="opacity-0 group-hover/mac:opacity-100 text-green-950" />
              ) : (
                <Maximize2 size={8} strokeWidth={3} className="opacity-0 group-hover/mac:opacity-100 text-green-950" />
              )}
            </motion.button>
          </div>
          <div className="text-xs text-[var(--text-tertiary)] font-mono ml-2 select-none">
            profile.js
          </div>
        </div>
      </div>

      <div className={`relative z-10 backdrop-blur-md p-4 rounded-xl border shadow-inner overflow-hidden flex flex-col transition-colors duration-300 ${theme === "dark"
          ? "bg-black/40 border-[var(--border-card)] shadow-[inset_0_0_20px_rgba(0,230,255,0.03)]"
          : "bg-slate-50/90 border-slate-200 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]"
        } ${isMaximized ? "text-base md:text-lg flex-1" : "text-[13px] md:text-[14px] leading-[1.5]"}`}
        style={{
          color: theme === "dark" ? "#e2e8f0" : "#334155",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace"
        }}
      >
        <div className="whitespace-pre-wrap overflow-y-auto">
          {renderSyntaxHighlightedCode(displayedCode)}
          {!isTypingComplete && (
            <span
              className="inline-block w-[2px] ml-[1px] align-middle"
              style={{
                backgroundColor: theme === "dark" ? "#00e6ff" : "#00bcd4",
                animation: "blink 1s step-end infinite",
                height: isMaximized ? "1.4em" : "1em"
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full">
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
      >

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium mb-4">
                Hello, I'm
              </h2>
              <div className="relative inline-block mb-4 h-14 md:h-20">
                {/* Invisible text to reserve exact space and prevent layout shift */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight opacity-0 pointer-events-none select-none whitespace-nowrap">
                  {resumeData.personal.name}
                  <span className="inline-block w-[4px] ml-2 opacity-0">|</span>
                </h1>

                {/* Visible typing text */}
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 h-full text-5xl md:text-7xl font-bold tracking-tight text-[var(--accent-primary)] whitespace-nowrap overflow-hidden flex items-center"
                >
                  {resumeData.personal.name.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: 0.2 + index * 0.08 }}
                    >
                      {char === " " ? "\u00a0" : char}
                    </motion.span>
                  ))}
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "circIn", repeatType: "reverse" }}
                    className="inline-block text-[var(--accent-primary)] ml-1 font-light"
                  >
                    |
                  </motion.span>
                </motion.h1>
              </div>
              <div className="h-10 overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "circOut" }}
                  className="text-2xl md:text-3xl text-[var(--text-tertiary)] font-light"
                >
                  {resumeData.personal.role}
                </motion.h2>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-xl"
            >
              I write code that scales, design that speaks, and systems that
              never sleep. Not just a developer — a craftsman who turns complex
              problems into clean, living software.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#00e6ff] to-[#00bcd4] text-black rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,230,255,0.3)] hover:shadow-[0_0_30px_rgba(0,230,255,0.5)] hover:brightness-110"
              >
                View Projects
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="/r/23ADR001-Aadhithya.R (2).pdf"
                download="Aadhithya_R_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-card)] rounded-full font-medium hover:bg-[var(--bg-card-hover)] transition-all hover:scale-105 backdrop-blur-sm"
              >
                <Download size={20} />
                Download Resume
              </a>
            </motion.div>

            {/* Social Icons Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 pt-2"
            >
              {[
                {
                  name: "GitHub",
                  icon: Github,
                  href: "https://github.com/aadhithyafullfur",
                  glowColor: "rgba(255,255,255,0.5)"
                },
                {
                  name: "LinkedIn",
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/aadhithya-r-077a7a320/",
                  glowColor: "rgba(10, 102, 194, 0.6)"
                },
                {
                  name: "Instagram",
                  icon: Instagram,
                  href: "https://instagram.com",
                  glowColor: "rgba(225, 48, 108, 0.6)"
                },
                {
                  name: "WhatsApp",
                  icon: WhatsAppIcon,
                  href: "https://wa.me/919629628246",
                  glowColor: "rgba(37, 211, 102, 0.6)"
                }
              ].map((social, index) => (
                <SocialIcon
                  key={social.name}
                  {...social}
                  delay={0.6 + index * 0.1}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-8 flex items-center gap-6 text-[var(--text-secondary)]"
            >
              <div className="flex items-center gap-2 bg-[var(--success)]/10 border border-[var(--success)]/20 px-4 py-2 rounded-full cursor-default hover:bg-[var(--success)]/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse shadow-[0_0_10px_var(--success)]" />
                <span className="text-[var(--success)] font-medium text-sm">
                  Open to work
                </span>
              </div>
              <div className="text-sm">
                Location: {resumeData.personal.location}
              </div>
            </motion.div>
          </div>

          {/* Abstract Hero Image/Visual with Window Controls */}
          <div className="relative w-full perspective-1000 flex flex-col justify-center">
            <TiltCard className="w-full relative z-20">
              <AnimatePresence mode="wait">
                {windowState === "normal" && (
                  <motion.div
                    layoutId="mac-window"
                    style={{ willChange: "transform, opacity", transform: "translateZ(0)", originX: 0.5, originY: 0.5 }}
                    transition={{
                      type: "spring", stiffness: 260, damping: 25, mass: 0.8,
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, 0],
                      filter: "blur(0px)"
                    }}
                    exit={{
                      scale: 0.85,
                      opacity: 0,
                      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className="w-full h-full"
                  >
                    {renderWindowContent(false)}
                  </motion.div>
                )}

                {windowState === "closed" && (
                  <motion.div
                    key="closed"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-full h-full flex flex-col items-center justify-center gap-4 absolute inset-0"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setWindowState("normal")}
                      className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors border ${theme === "dark"
                          ? "bg-[var(--bg-card)] border-[var(--border-card)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]"
                          : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-md"
                        }`}
                    >
                      <RotateCcw size={16} /> Restore Window
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Maximized State Overlay */}
      <AnimatePresence>
        {windowState === "maximized" && (
          <motion.div
            layoutId="mac-window"
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
            transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
            className="fixed inset-0 z-[100]"
          >
            {renderWindowContent(true)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized State (macOS Dock style) */}
      <AnimatePresence>
        {windowState === "minimized" && (
          <motion.div
            layoutId="mac-window"
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
            transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setWindowState("normal")}
            className={`fixed bottom-6 left-6 z-[100] cursor-pointer group flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl ${theme === "dark"
                ? "bg-[var(--bg-card)]/90 border-[var(--border-card)] shadow-black/50"
                : "bg-white/90 border-slate-200 shadow-gray-300/50"
              }`}
          >
            <Terminal size={18} className="text-[var(--accent-primary)]" />
            <span className="text-sm font-mono text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">profile.js</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
