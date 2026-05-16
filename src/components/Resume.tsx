import React from "react";
import { motion } from "motion/react";
import { Download, FileText } from "lucide-react";

export default function Resume() {
  const fileName = "Kamal_Nautiyal_Resume.pdf";

  const handleDownload = () => {
    window.open("https://docs.google.com/document/d/1ltSHJZ-aeCHBsIBUjlQcGAy5xucJ1s19/edit?usp=sharing&ouid=117420566697663884004&rtpof=true&sd=true", "_blank");
  };

  return (
    <section id="resume" className="py-12 md:py-20 px-6 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <p className="text-[9px] uppercase font-bold tracking-widest text-ink/40 mb-3">Curriculum Vitae</p>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-center">
            RESUME
          </h2>
          <div className="w-12 h-1 bg-ink mt-3" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[1.5rem] shadow-xl shadow-ink/5 border border-ink/5 overflow-hidden"
        >
          {/* Resume Header/Preview Interface */}
          <div className="p-5 md:p-10 border-b border-ink/5 bg-bg-warm/30 flex flex-col md:flex-row justify-between md:items-center gap-5 md:gap-6">
            <div className="flex items-center gap-3 md:gap-5">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-ink rounded-lg md:rounded-xl flex items-center justify-center text-white shrink-0">
                <FileText size={20} md:size={28} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-bold truncate">{fileName}</h3>
                <p className="text-[10px] md:text-xs text-ink/40">Updated May 2026 • 2.4 MB</p>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <button 
                onClick={handleDownload}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-ink text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
