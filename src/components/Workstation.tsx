import { motion } from "motion/react";
import { workstation } from "../data";
import { useState } from "react";
import ImageModal from "./ImageModal";
import { Maximize2 } from "lucide-react";

export default function Workstation() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < workstation.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <section className="py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-center">
            MY WORKSTATION
          </h2>
          <p className="font-serif italic text-base md:text-lg text-ink/60 mt-3 text-center">Precision gear for precise designs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {workstation.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative h-[45vh] md:h-[50vh] overflow-hidden rounded-[2rem] cursor-zoom-in"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-all duration-700 sm:grayscale sm:group-hover:grayscale-0 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white shadow-2xl">
                  <Maximize2 size={24} />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 translate-y-0 sm:translate-y-6 sm:group-hover:translate-y-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500">
                <p className="text-[9px] uppercase font-bold tracking-widest text-white/60 mb-1">Technical Setup</p>
                <h3 className="text-2xl md:text-xl font-bold text-white leading-tight">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ImageModal 
        isOpen={selectedIndex !== null} 
        onClose={() => setSelectedIndex(null)} 
        imageSrc={selectedIndex !== null ? workstation[selectedIndex].image : null} 
        altText={selectedIndex !== null ? workstation[selectedIndex].name : ""}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex !== null && selectedIndex < workstation.length - 1}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
      />
    </section>
  );
}
