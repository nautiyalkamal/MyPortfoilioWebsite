import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [touchState, setTouchState] = useState({
    initialDistance: 0,
    initialScale: 1,
    startX: 0,
    startY: 0,
    isPinching: false,
    isPanning: false,
  });

  const [lastTap, setLastTap] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset scale and position when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [imageSrc]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    // Single or Double Tap Handler for zoom toggling
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (e.touches.length === 1 && now - lastTap < DOUBLE_TAP_DELAY) {
      e.preventDefault();
      e.stopPropagation();
      setScale(prev => {
        if (prev > 1) {
          setPosition({ x: 0, y: 0 });
          return 1;
        } else {
          return 2.5;
        }
      });
      setLastTap(0);
      return;
    }
    if (e.touches.length === 1) {
      setLastTap(now);
    }

    // Touch gesture logic
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const distance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      setTouchState({
        initialDistance: distance,
        initialScale: scale,
        startX: 0,
        startY: 0,
        isPinching: true,
        isPanning: false,
      });
    } else if (e.touches.length === 1 && scale > 1) {
      const t = e.touches[0];
      setTouchState(prev => ({
        ...prev,
        startX: t.clientX - position.x,
        startY: t.clientY - position.y,
        isPanning: true,
        isPinching: false,
      }));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchState.isPinching) {
      e.preventDefault();
      e.stopPropagation();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const distance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (touchState.initialDistance > 0) {
        const ratio = distance / touchState.initialDistance;
        const newScale = Math.max(1, Math.min(4, touchState.initialScale * ratio));
        setScale(newScale);
        if (newScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
      }
    } else if (e.touches.length === 1 && touchState.isPanning && scale > 1) {
      e.preventDefault();
      e.stopPropagation();
      const t = e.touches[0];
      const newX = t.clientX - touchState.startX;
      const newY = t.clientY - touchState.startY;

      // Restrain the panning limits beautifully based on dynamic scale
      const maxPanX = (scale - 1) * window.innerWidth / 2;
      const maxPanY = (scale - 1) * window.innerHeight / 2;
      const constrainedX = Math.max(-maxPanX, Math.min(maxPanX, newX));
      const constrainedY = Math.max(-maxPanY, Math.min(maxPanY, newY));

      setPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleTouchEnd = () => {
    setTouchState(prev => ({
      ...prev,
      isPinching: false,
      isPanning: false,
    }));
    if (scale < 1.05) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
      setPosition({ x: 0, y: 0 });
    }
  };

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

          {/* Desktop-only Navigation Buttons */}
          {hasPrev && onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-105 active:scale-95 group cursor-pointer backdrop-blur-md"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
          )}

          {hasNext && onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-105 active:scale-95 group cursor-pointer backdrop-blur-md"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Image container with drag to swipe left and right */}
          <motion.div
            key={imageSrc}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 240 }}
            drag={scale > 1 ? false : true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragEnd={(event, info) => {
              const swipeThreshold = 55;
              const verticalExitThreshold = 70;
              
              // If swiping vertically more than horizontally and exceeds threshold, exit
              if (Math.abs(info.offset.y) > verticalExitThreshold && Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
                onClose();
              } else if (info.offset.x < -swipeThreshold) {
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
            <div
              className="relative overflow-visible flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
            >
              <img
                src={imageSrc}
                alt={altText || "Full size image"}
                className="max-w-full max-h-[62vh] sm:max-h-[70vh] md:max-h-[75vh] object-contain rounded-xl shadow-2xl selection:bg-none pointer-events-none border border-white/5 bg-zinc-950/40 transition-none"
                referrerPolicy="no-referrer"
                style={{
                  filter: filter ? filter : undefined,
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: "center center",
                  transition: touchState.isPinching || touchState.isPanning ? "none" : "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
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
          <div className="absolute bottom-4 left-4 text-white/25 text-[8.5px] font-bold uppercase tracking-[0.2em] pointer-events-none hidden md:block select-none">
            Click arrows or use left/right keys to browse • Swipe up/down to close • Double-click to zoom
          </div>
          <div className="absolute bottom-4 left-4 text-white/25 text-[8.5px] font-bold uppercase tracking-[0.2em] pointer-events-none block md:hidden select-none">
            Swipe left/right to browse • Swipe up/down to close • Pinch or Double-tap to zoom
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
