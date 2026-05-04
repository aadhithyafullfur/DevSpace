import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "./components/Loader";
import { Background } from "./components/Background";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { DetailedSkills } from "./components/DetailedSkills";
import { Contact } from "./components/Contact";
import { Achievements } from "./components/Achievements";
import { Certifications } from "./components/Certifications";
import { Leadership } from "./components/Leadership";
import { Education } from "./components/Education";
import { Analytics } from "./components/Analytics";

import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";
import { Chatbot } from "./components/Chatbot";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen font-sans selection:bg-white/30 overflow-x-hidden relative w-full">
      <CustomCursor />
      <Chatbot />

      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        ref={mainContainerRef}
        className={`relative h-screen w-full overflow-y-auto overflow-x-hidden transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <ScrollProgress containerRef={mainContainerRef} />
        <Background />
        <Sidebar />
        <main className="md:pl-24 transition-all duration-300">
          <Hero />
          <About />
          <Education />
          <Projects />
          <Achievements />
          <Certifications />
          <Leadership />
          <Analytics />
          <Skills />
          <DetailedSkills />
          <Contact />
        </main>

        <footer className="py-8 text-center text-[var(--text-tertiary)] text-sm border-t border-[var(--border-card)] bg-[var(--bg-primary)] relative z-10">
          <p>© {new Date().getFullYear()} Aadhithya R. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
