import { useParams, Link } from "react-router-dom";
import { projects } from "../data";
import { MoveLeft, LayoutGrid, Maximize2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ImageModal from "../components/ImageModal";

export default function GalleryPage() {
  const { category } = useParams<{ category: string }>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredProjects = category && category !== "all" 
    ? projects.filter(p => p.classification.toLowerCase().includes(category.toLowerCase()))
    : projects;

  const allImages = filteredProjects.flatMap(p => p.gallery || [p.image]);

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < allImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="pt-20 md:pt-24 pb-12 md:pb-16 min-h-screen bg-bg-warm/30">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/portfolio" className="inline-block group mb-6 md:mb-10">
          <motion.div
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/60 group-hover:text-ink transition-colors"
          >
            <MoveLeft size={14} />
            Back to Portfolio
          </motion.div>
        </Link>

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-ink/40">
              <LayoutGrid size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Project Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight">
              {category ? `${category} Works` : "All Projects"}
            </h1>
          </div>
          <p className="max-w-md text-xs md:text-sm text-ink/60 leading-relaxed md:text-right">
            A comprehensive collection of architectural visualizations, BIM coordination models, and structural details.
          </p>
        </div>

        <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6">
          {allImages.map((img, idx) => (
            <motion.div
              key={`${img}-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.05 }}
              className="relative group cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl md:rounded-3xl shadow-sm"
              onClick={() => setSelectedIndex(idx)}
            >
              <motion.img
                initial={{ filter: "grayscale(100%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                viewport={{ amount: 0.6, margin: "-10%" }}
                whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                src={img}
                alt="Architectural work"
                className="w-full h-auto transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-ink/20 opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur p-4 rounded-full text-ink shadow-xl">
                  <Maximize2 size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageModal 
        isOpen={selectedIndex !== null} 
        onClose={() => setSelectedIndex(null)} 
        imageSrc={selectedIndex !== null ? allImages[selectedIndex] : null} 
        altText="Architectural Work"
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex !== null && selectedIndex < allImages.length - 1}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
      />
    </div>
  );
}
