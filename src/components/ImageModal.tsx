import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  altText?: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  altText,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasNext, hasPrev, onNext, onPrev, onClose]);

  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 select-none"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          {hasPrev && onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 md:left-10 z-[110] p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/5 group"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {hasNext && onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 md:right-10 z-[110] p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/5 group"
              aria-label="Next image"
            >
              <ChevronRight size={32} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Image container */}
          <motion.div
            key={imageSrc}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative max-w-full max-h-full flex items-center justify-center cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageSrc}
              alt={altText || "Full size image"}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl selection:bg-none"
              referrerPolicy="no-referrer"
            />
            {altText && (
              <div className="absolute -bottom-10 left-0 right-0 text-center">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{altText}</p>
              </div>
            )}
          </motion.div>
          
          {/* Backdrop text hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] pointer-events-none hidden md:block">
            Click anywhere to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
