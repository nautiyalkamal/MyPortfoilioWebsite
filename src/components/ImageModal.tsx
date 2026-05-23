import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  altText?: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  filter?: string;
  currentIndex?: number;
  totalCount?: number;
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  altText,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  filter,
  currentIndex,
  totalCount
}: ImageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/94 p-4 md:p-12 select-none"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Navigation buttons are hidden as requested by the user ("hide those next and previous button") */}

          {/* Image container with drag to swipe left and right */}
          <motion.div
            key={imageSrc}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 240 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(event, info) => {
              const swipeThreshold = 55;
              if (info.offset.x < -swipeThreshold) {
                if (hasNext && onNext) {
                  onNext();
                }
              } else if (info.offset.x > swipeThreshold) {
                if (hasPrev && onPrev) {
                  onPrev();
                }
              }
            }}
            className="relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none z-[105]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageSrc}
              alt={altText || "Full size image"}
              className="max-w-full max-h-[62vh] sm:max-h-[70vh] md:max-h-[75vh] object-contain rounded-xl shadow-2xl selection:bg-none pointer-events-none border border-white/5 bg-zinc-950/40"
              referrerPolicy="no-referrer"
              style={filter ? { filter } : undefined}
            />
          </motion.div>
          
          {/* Carousel indicator / Caption details in concentrated, compact bottom panel */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex flex-col items-center gap-3 w-full max-w-sm sm:max-w-md px-6 text-center select-none pointer-events-none">
            {altText && (
              <motion.p
                key={imageSrc}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1 select-none font-sans drop-shadow-sm pointer-events-auto"
              >
                {altText}
              </motion.p>
            )}

            {totalCount !== undefined && totalCount > 1 && (
              <div className="flex flex-col items-center gap-2.5 pointer-events-auto">
                <div className="flex justify-center gap-1.5">
                  {Array.from({ length: totalCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === currentIndex 
                          ? "w-5 bg-white" 
                          : "w-1 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-white/60 text-[9px] font-mono tracking-widest bg-zinc-900/40 border border-white/5 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  <span className="text-white font-bold">{(currentIndex !== undefined ? currentIndex : 0) + 1}</span>
                  <span className="text-white/20 mx-1.5">/</span>
                  <span>{totalCount}</span>
                </div>
              </div>
            )}
          </div>

          {/* Backdrop text hint */}
          <div className="absolute bottom-4 left-4 text-white/25 text-[8px] font-bold uppercase tracking-[0.2em] pointer-events-none hidden md:block select-none">
            Swipe or use arrow keys to navigate
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
