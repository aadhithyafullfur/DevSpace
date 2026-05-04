import { useState, useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { Github, Code2, Terminal } from "lucide-react";
import { Section } from "./Section";
import { TextReveal } from "./TextReveal";

// --- API Types ---
interface LeetCodeData {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

interface GithubContribution {
  date: string;
  contributionCount: number;
}

interface GithubData {
  totalContributions: number;
  contributions: GithubContribution[][]; // Array of weeks
}

const CountUp = ({ to }: { to: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    const animation = animate(count, to, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [to]);

  return <motion.span>{rounded}</motion.span>;
};

const CircularProgress = ({ value, max, size = 120, strokeWidth = 6, label }: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const safeMax = max || 1;
  const percentage = Math.min(value / safeMax, 1);
  const offset = circumference - percentage * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 transform -rotate-90" width={size} height={size}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* White Animated Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#00e6ff"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-white tracking-tighter">
          <CountUp to={value} />
        </span>
        {label && <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">{label}</span>}
      </div>
    </div>
  );
};

const ProgressBar = ({ label, value, max }: any) => {
  const safeMax = max || 1;
  const percentage = Math.min((value / safeMax) * 100, 100);
  
  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-gray-400 tracking-wide">{label}</span>
        <span className="text-white bg-white/5 px-2 py-0.5 rounded border border-white/10 text-xs">
          <CountUp to={value} />
        </span>
      </div>
      <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden border border-white/5 relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="h-full rounded-full bg-[#00e6ff] shadow-[0_0_8px_rgba(0,230,255,0.5)]"
        />
      </div>
    </div>
  );
};

export const Analytics = () => {
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [ghData, setGhData] = useState<GithubData | null>(null);

  useEffect(() => {
    fetch("https://alfa-leetcode-api.onrender.com/Aadhithya_Rathakrishnan/solved")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setLcData(data))
      .catch((err) => console.error("LC Fetch Error", err));

    fetch("https://github-contributions-api.deno.dev/aadhithyafullfur.json")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setGhData(data))
      .catch((err) => console.error("GH Fetch Error", err));
  }, []);

  const getCellColorClass = (count: number) => {
    if (count === 0) return "bg-white/5";
    if (count <= 2) return "bg-[#00e6ff]/20";
    if (count <= 5) return "bg-[#00e6ff]/50";
    if (count <= 8) return "bg-[#00e6ff]/80";
    return "bg-[#00e6ff] shadow-[0_0_8px_rgba(0,230,255,0.8)] z-10";
  };

  const getDayName = (dayIndex: number) => {
    if (dayIndex === 1) return "Mon";
    if (dayIndex === 3) return "Wed";
    if (dayIndex === 5) return "Fri";
    return "";
  };

  const totalSolved = lcData?.solvedProblem || 0;
  const easySolved = lcData?.easySolved || 0;
  const medSolved = lcData?.mediumSolved || 0;
  const hardSolved = lcData?.hardSolved || 0;
  
  const totalMax = 500; 
  const easyMax = 200;
  const medMax = 250;
  const hardMax = 50;

  return (
    <Section id="analytics" className="relative w-full">
      <div className="flex flex-col items-center max-w-6xl mx-auto gap-10 relative py-20 px-4 md:px-8">
        
        {/* Minimal cyan ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00e6ff]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Terminal size={14} className="text-gray-300" />
            <span className="text-xs font-medium tracking-widest text-gray-300 uppercase">Dashboard</span>
          </motion.div>
          
          <TextReveal
            text="Developer Analytics"
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          />
        </div>

        {/* Dashboard Grid - Perfect 2 Column Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full relative z-10">
          
          {/* LEETCODE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group rounded-2xl bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 flex flex-col gap-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <Code2 className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white tracking-wide">LeetCode Status</h3>
                <p className="text-xs text-gray-500 mt-0.5">@Aadhithya_Rathakrishnan</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-6 xl:gap-10">
              <div className="shrink-0">
                <CircularProgress 
                  value={totalSolved} 
                  max={totalMax} 
                  label="Solved"
                  size={130}
                  strokeWidth={5}
                />
              </div>
              
              <div className="flex-1 w-full flex flex-col justify-center gap-4">
                <ProgressBar label="Easy" value={easySolved} max={easyMax} />
                <ProgressBar label="Medium" value={medSolved} max={medMax} />
                <ProgressBar label="Hard" value={hardSolved} max={hardMax} />
              </div>
            </div>
          </motion.div>

          {/* GITHUB CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="group rounded-2xl bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 flex flex-col gap-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <Github className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-wide">GitHub Contributions</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{ghData?.totalContributions || 0} commits this year</p>
                </div>
              </div>
            </div>

            {/* Compact Graph Container */}
            <div className="w-full overflow-x-auto scrollbar-hide py-2 flex items-center justify-center min-h-[120px]">
              {!ghData ? (
                <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
                  <Github className="w-5 h-5 animate-spin opacity-50" />
                  <span className="text-[10px] font-semibold tracking-widest uppercase">Loading...</span>
                </div>
              ) : (
                <div className="flex gap-[2px] min-w-max">
                  {/* Y-Axis Labels */}
                  <div className="flex flex-col gap-[2px] mr-2 mt-4 text-[9px] font-medium text-gray-500 uppercase tracking-widest select-none">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                      <div key={day} className="h-[10px] flex items-center pr-1 leading-none">
                        {getDayName(day)}
                      </div>
                    ))}
                  </div>

                  {/* Heatmap Columns */}
                  {ghData.contributions.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-[2px] relative">
                      {wIndex % 4 === 0 && wIndex < ghData.contributions.length - 2 && (
                        <div className="absolute top-0 left-0 -translate-y-4 text-[9px] font-medium text-gray-500 uppercase tracking-widest whitespace-nowrap select-none">
                          {new Date(week[0].date).toLocaleString('default', { month: 'short' })}
                        </div>
                      )}
                      
                      <div className="mt-4 flex flex-col gap-[2px]">
                        {week.map((day, dIndex) => (
                          <div key={`${wIndex}-${dIndex}`} className="relative group/cell">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "50px" }}
                              transition={{ 
                                delay: (wIndex * 0.003) + (dIndex * 0.003),
                                duration: 0.2,
                              }}
                              className={`w-[10px] h-[10px] rounded-[2px] transition-all duration-200 cursor-pointer ${getCellColorClass(day.contributionCount)} hover:scale-110 hover:shadow-[0_0_8px_rgba(0,230,255,0.8)] border border-white/5`}
                            />
                            
                            {/* Pure CSS Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 rounded-md bg-[#111] border border-white/10 text-white text-[10px] shadow-lg whitespace-nowrap opacity-0 scale-95 group-hover/cell:opacity-100 group-hover/cell:scale-100 transition-all duration-150 pointer-events-none z-50 flex flex-col items-center gap-0.5 origin-bottom">
                              <span className="font-medium text-gray-300">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <span className="font-semibold text-[#00e6ff]">{day.contributionCount} <span className="text-gray-500 font-normal">commits</span></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end gap-2 text-[9px] font-medium text-gray-500 uppercase tracking-widest mt-auto">
              <span>Less</span>
              <div className="flex gap-[2px]">
                {[0, 2, 5, 8, 10].map((val, idx) => (
                  <div 
                    key={idx} 
                    className={`w-[10px] h-[10px] rounded-[2px] border border-white/5 ${getCellColorClass(val).split(' hover:')[0].split(' shadow-')[0]}`} 
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
