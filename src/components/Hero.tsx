import { motion } from "motion/react";
import { useState } from "react";
import ImageModal from "./ImageModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroImage = "https://i.ibb.co/HDkHfjKH/kml.png";

  return (
    <section id="home" className="relative min-h-[90vh] w-full flex flex-col justify-center px-6 overflow-hidden scroll-mt-32 py-16 md:py-0">
      <div className="relative flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 items-center h-full pt-16 md:pt-24 lg:pt-16">
        {/* Typography */}
        <div className="lg:col-span-5 z-30 order-2 lg:order-1 absolute lg:relative top-[14%] sm:top-[18%] lg:top-0 left-[-1rem] sm:left-2 lg:left-0 pointer-events-none lg:pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <p className="font-serif italic text-xl md:text-3xl text-ink/80 mb-2 md:mb-4 drop-shadow-sm lg:drop-shadow-none">
              Hey, there
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.85] md:leading-[0.8] mb-10 md:mb-12 tracking-tighter drop-shadow-md lg:drop-shadow-none text-ink">
              I AM<br />KAMAL<br />NAUTIYAL
            </h1>
          </motion.div>
        </div>

        {/* Center - Portrait */}
        <div className="lg:col-span-4 h-full relative order-1 lg:order-2 flex justify-end lg:justify-center items-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="h-full w-full max-w-[260px] sm:max-w-xs md:max-w-md flex items-end justify-end lg:justify-center translate-x-12 lg:translate-x-0"
          >
            <div 
                className="relative group cursor-zoom-in"
                onClick={() => setIsModalOpen(true)}
            >
                <img
                    src={heroImage}
                    alt="Kamal Nautiyal - BIM Design Engineer"
                    className="w-full max-h-[45vh] md:max-h-[60vh] object-contain transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Info */}
        <div className="lg:col-span-3 z-10 flex flex-col justify-center gap-6 md:gap-10 order-3 lg:order-3 text-left md:text-left">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="space-y-4 md:space-y-6 -translate-y-24 lg:translate-y-0"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase leading-none tracking-tight">
              BIM<br className="lg:block" /> DESIGN<br className="lg:block" /> ENGINEER
            </h2>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-ink/60 max-w-xs md:mx-0">
              Specializing in Intelligent 3D Modelling, RCC Detailing, and Coordinated BIM Solutions in an Streamline Workflows.
            </p>
            <div className="flex items-center gap-3 py-2 px-4 bg-white/60 backdrop-blur-md border border-ink/5 w-fit rounded-full mt-4 shadow-sm relative z-40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.15em] text-ink/60">
                Available for BIM & Architectural Opportunities
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      <ImageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        imageSrc={heroImage} 
        altText="Kamal Nautiyal - BIM Design Engineer"
      />
    </section>
  );
}
