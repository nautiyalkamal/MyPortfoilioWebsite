import { motion, AnimatePresence } from "motion/react";
import { projects } from "../data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageModal from "./ImageModal";
import { Maximize2 } from "lucide-react";

const classifications = ["ALL", "ARCHITECTURE", "BIM", "RESIDENCIAL", "INTERIORS", "WALKTHROUGH WORKS"];

export default function Projects() {
  const [filter, setFilter] = useState("ALL");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const filteredProjects = filter === "ALL" 
    ? projects 
    : projects.filter(p => p.classification === filter);

  const handleNext = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex < filteredProjects.length - 1) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    }
  };

  return (
    <section id="portfolio" className="py-16 md:py-20 px-6 scroll-mt-24">
      <div className="flex flex-col items-center mb-10 md:mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter mb-4 text-center">
          PORTFOLIO
        </h2>
        <div className="w-16 h-1.5 bg-ink mb-10 md:mb-12" />
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl">
          {classifications.map((c) => (
            <button
              key={c}
              onClick={() => {
                if (c === "ARCHITECTURE" || c === "BIM" || c === "RESIDENCIAL" || c === "INTERIORS" || c === "WALKTHROUGH WORKS") {
                  navigate(`/gallery/${c.split(' ')[0].toLowerCase()}`);
                } else {
                  setFilter(c);
                }
              }}
              className={`px-4 md:px-5 py-2 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest transition-all ${
                filter === c 
                  ? "bg-ink text-white" 
                  : "bg-ink/5 text-ink hover:bg-ink/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProjectIndex(index)}
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[1rem] md:rounded-[1.5rem] mb-2 md:mb-3">
                <motion.img
                  initial={{ filter: "grayscale(100%)" }}
                  whileInView={{ filter: "grayscale(0%)" }}
                  viewport={{ amount: 0.6, margin: "-10%" }}
                  whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur p-4 rounded-full text-ink shadow-xl scale-75 md:scale-100">
                      <Maximize2 size={18} />
                    </div>
                </div>

                <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-wrap gap-1 justify-end max-w-[80px] md:max-w-[120px]">
                  {project.software.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="bg-white/90 backdrop-blur px-1 py-0.5 rounded-full text-[4px] md:text-[6px] uppercase font-bold tracking-widest text-ink shadow-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-start gap-2 px-0.5" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-0.5">
                  <p className="text-[6px] md:text-[8px] uppercase font-bold tracking-widest text-ink/40">
                    {project.classification}{project.year ? ` — ${project.year}` : ''}
                  </p>
                  <h3 className="text-xs md:text-lg font-bold tracking-tight group-hover:text-ink/80 transition-colors leading-tight">
                    {project.title}
                  </h3>
                </div>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  className="h-5 w-5 md:h-7 md:w-7 flex-shrink-0 flex items-center justify-center rounded-full border border-ink/10 group-hover:bg-ink group-hover:text-white transition-all"
                >
                  <svg width="6" height="6" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-2 md:h-2">
                    <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ImageModal 
        isOpen={selectedProjectIndex !== null} 
        onClose={() => setSelectedProjectIndex(null)} 
        imageSrc={selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex].image : null} 
        altText={selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex].title : ""}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedProjectIndex !== null && selectedProjectIndex < filteredProjects.length - 1}
        hasPrev={selectedProjectIndex !== null && selectedProjectIndex > 0}
      />
    </section>
  );
}
