import { motion } from "motion/react";
import { useState } from "react";
import ImageModal from "./ImageModal";

export default function About() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const aboutImage = "https://i.ibb.co/xtkFYBFN/1.jpg";

  return (
    <section id="about" className="py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-12 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8 -mt-6 lg:mt-0"
            >
              <div className="space-y-2">
                <p className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.2em] text-ink/40">About Me</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.9]">
                   Architecting <br className="hidden sm:block" />Digital Twin <br/>Realities.
                </h2>
              </div>
              <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-ink/80">
                I am a BIM Design Engineer dedicated to bridging the gap between imaginative architecture and technical precision. My approach centers on leveraging parametric workflows to optimize structural integrity and construction efficiency.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 md:pt-6">
                <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-wider">Strategy-Driven</p>
                    <p className="text-xs text-ink/60 leading-relaxed font-medium">Developing comprehensive BIM Execution Plans (BEP) that align with quality standards and project goals.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-wider">Solution-Oriented</p>
                    <p className="text-xs text-ink/60 leading-relaxed font-medium">Resolving complex spatial conflicts through advanced clash detection and multi-disciplinary coordination.</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="md:col-span-12 lg:col-span-6 relative mt-10 lg:mt-0">
             <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="aspect-square sm:aspect-video lg:aspect-square bg-bg-warm rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative shadow-lg cursor-zoom-in group"
                onClick={() => setSelectedImage(aboutImage)}
             >
                <img 
                    src={aboutImage} 
                    alt="Professional collaboration" 
                    className="w-full h-full object-cover md:object-[50%_35%] lg:object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                    </div>
                </div>
             </motion.div>
             
             {/* Decorative element */}
             <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 w-28 h-28 sm:w-32 sm:h-32 bg-ink rounded-full flex items-center justify-center -rotate-12 translate-y-4 shadow-2xl z-20">
                <div className="text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-center px-3">
                    Assisting,<br/>coordinating<br/>and resolving
                </div>
             </div>
          </div>
        </div>
      </div>
      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imageSrc={selectedImage} 
        altText="Professional collaboration"
      />
    </section>
  );
}
