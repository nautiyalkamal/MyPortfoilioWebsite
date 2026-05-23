/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import GalleryPage from "./pages/GalleryPage";

export default function App() {
  const { pathname, hash } = useLocation();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the Unicorn Studio script dynamically if not present
    if (!(window as any).UnicornStudio) {
      (window as any).UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.36/dist/unicornStudio.umd.js";
      script.type = "text/javascript";
      script.onload = () => {
        if (!(window as any).UnicornStudio.isInitialized) {
          try {
            (window as any).UnicornStudio.init();
            (window as any).UnicornStudio.isInitialized = true;
          } catch (err) {
            console.error("Unicorn Studio init error:", err);
          }
        }
      };
      document.head.appendChild(script);
    } else {
      try {
        if (typeof (window as any).UnicornStudio.init === "function") {
          (window as any).UnicornStudio.init();
        }
      } catch (err) {
        console.error("Unicorn Studio re-init error:", err);
      }
    }

    // Force internal WebGL canvas resize recalculation on change
    const resizeHandler = () => {
      if ((window as any).UnicornStudio && typeof (window as any).UnicornStudio.init === "function") {
        try {
          (window as any).UnicornStudio.init();
        } catch (e) {}
      }
      window.dispatchEvent(new Event("resize"));
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("orientationchange", resizeHandler);

    // Initial delay triggers to ensure canvas is perfectly sized after layout settles
    const t1 = setTimeout(resizeHandler, 200);
    const t2 = setTimeout(resizeHandler, 800);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", resizeHandler);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let targetScroll = 0;
    let currentScroll = 0;

    const calculateBounds = () => {
      return document.documentElement.scrollHeight - window.innerHeight;
    };

    let totalHeight = calculateBounds();

    const handleMouseMove = (e: MouseEvent) => {
      // Create responsive target coordinates in viewport space [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      // Target shift bounds (max 38px parallax translation for majestic feel)
      targetX = nx * 38;
      targetY = ny * 38;
    };

    const handleScroll = () => {
      totalHeight = calculateBounds();
      if (totalHeight <= 0) return;
      const progress = window.scrollY / totalHeight;
      // organic downward canvas offset on pages scroll
      targetScroll = progress * -55;
    };

    // Immersive tilt responsiveness on iOS & Android devices using gyroscope
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      const nx = Math.max(-1, Math.min(1, e.gamma / 22));
      const ny = Math.max(-1, Math.min(1, (e.beta - 42) / 22));
      targetX = nx * 28;
      targetY = ny * 28;
    };

    // Dynamic swipe coordinates for touch interactions on pure mobile viewports
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const nx = (touch.clientX / window.innerWidth) * 2 - 1;
        const ny = (touch.clientY / window.innerHeight) * 2 - 1;
        targetX = nx * 22;
        targetY = ny * 22;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });
    }

    let rafId: number;
    const updateLoop = () => {
      if (bgRef.current) {
        // Luxuriously smooth lag coefficient (0.078) for high-end feel
        currentX += (targetX - currentX) * 0.078;
        currentY += (targetY - currentY) * 0.078;
        currentScroll += (targetScroll - currentScroll) * 0.078;

        // Apply Translate3D for maximum performance GPU page layers
        bgRef.current.style.transform = `translate3d(${currentX}px, ${currentY + currentScroll}px, 0)`;
      }
      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  useEffect(() => {
    // Basic smooth scroll implementation for Safari and older versions
    document.documentElement.style.scrollBehavior = "smooth";
    
    if (hash) {
      // Small timeout to ensure the element is in the DOM
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <main className="relative min-h-screen selection:bg-soft-peach selection:text-ink overflow-x-hidden">
      {/* Unicorn Studio Animated WebGL Background - Custom-blended into a beautiful White & Beige Theme */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden select-none bg-[#FCFAF6]">
        {/* Soft, warm ambient gradients to set the solid white and beige foundation */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FCFAF6] via-[#FCFAF6]/95 to-[#FAF6F0] opacity-95" />
        
        {/* WebGL Canvas container with custom filters to shift animation to cream/beige/white tones */}
        <div 
          ref={bgRef}
          data-us-project="Jv9KbHuCYWf4sr35MmdO" 
          data-us-speed="0"
          data-us-play-on-hover="true"
          data-us-disable-mobile="false"
          className="absolute inset-0 w-full h-full opacity-55 sm:opacity-65 transition-opacity duration-1000 mix-blend-multiply"
          style={{
            filter: 'contrast(0.9) brightness(1.15) sepia(0.85) saturate(0.5) hue-rotate(345deg)',
          }}
        />

        {/* Ambient highlighting to create a smooth, premium, layered light-mask surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-[#F2EAE1]/20" />
      </div>

      {/* Visual background noise for that paper texture look */}
      <div className="noise-overlay" />
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/gallery/:category" element={<GalleryPage />} />
      </Routes>
      
      {/* Extra spacing Footer */}
      <footer className="py-12 bg-bg-warm flex justify-center items-center px-6">
         <div className="flex items-center gap-3">
            <span className="w-1 h-1 bg-ink rounded-full opacity-40" />
            <p className="text-[10px] md:text-[11px] uppercase font-bold tracking-[0.25em] opacity-40 text-center">Architecting the future one bit at a time</p>
            <span className="w-1 h-1 bg-ink rounded-full opacity-40" />
         </div>
      </footer>
    </main>
  );
}
