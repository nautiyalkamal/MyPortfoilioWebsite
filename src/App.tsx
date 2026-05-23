/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import GalleryPage from "./pages/GalleryPage";

export default function App() {
  const { pathname, hash } = useLocation();
  const bgRef = useRef<HTMLDivElement>(null);
  const [canvasRendered, setCanvasRendered] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
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
  }, [pathname, isMobile]);

  // Orchestrator to detect when Unicorn Studio canvas compiles and paint is active
  useEffect(() => {
    if (isMobile) {
      setCanvasRendered(true);
      setContentVisible(true);
      return;
    }
    let attempts = 0;
    const interval = setInterval(() => {
      const canvas = document.querySelector('div[data-us-project] canvas');
      attempts++;
      if (canvas || attempts > 25) {
        clearInterval(interval);
        setCanvasRendered(true);
        const revealTimer = setTimeout(() => {
          setContentVisible(true);
        }, 550);
        return () => clearTimeout(revealTimer);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let targetScroll = 0;
    let currentScroll = 0;

    // Direct temporal and interaction speed state tracking variables
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    let targetInteractionSpeed = 0;
    let currentInteractionSpeed = 0;

    const calculateBounds = () => {
      return document.documentElement.scrollHeight - window.innerHeight;
    };

    let totalHeight = calculateBounds();
    let lastHeightUpdate = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      // Create responsive target coordinates in viewport space [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      // Target shift bounds (max 38px parallax translation for majestic feel)
      targetX = nx * 38;
      targetY = ny * 38;

      // Mouse displacement relative speed boost to feed actual animation timeline
      if (lastMouseX !== 0 && lastMouseY !== 0) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        targetInteractionSpeed += dist * 0.005; // delicate responsive scaling for nice momentum
      }
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleScroll = () => {
      if (totalHeight <= 0) return;
      const progress = window.scrollY / totalHeight;
      // organic downward canvas offset on pages scroll
      targetScroll = progress * -55;

      // Scroll speed translation to drive WebGL shader progression
      const ds = Math.abs(window.scrollY - lastScrollY);
      targetInteractionSpeed += ds * 0.025; // boost speed based on scroll speed
      lastScrollY = window.scrollY;
    };

    const handleResize = () => {
      totalHeight = calculateBounds();
    };

    // Immersive tilt responsiveness on iOS & Android devices using gyroscope
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      const nx = Math.max(-1, Math.min(1, e.gamma / 22));
      const ny = Math.max(-1, Math.min(1, (e.beta - 42) / 22));
      targetX = nx * 28;
      targetY = ny * 28;

      // Gentle continuous gyroscope trigger
      targetInteractionSpeed += 0.08;
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;

        // Instant touch trigger surge
        targetInteractionSpeed += 0.15;
      }
    };

    // Dynamic swipe coordinates and dragging displacement for touch interactions on mobile viewports
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        
        // Calculate dragging displacement bounds for direct touch feedback
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        // Normalized current touch position [-1, 1] relative to window size
        const nx = (touch.clientX / window.innerWidth) * 2 - 1;
        const ny = (touch.clientY / window.innerHeight) * 2 - 1;

        // Combine basic coordinate mapping with tactile dragging displacement
        // (nx/ny scales position, deltaX/deltaY provides immediate responsive tactile feedback during swipe actions)
        targetX = nx * 30 + Math.min(Math.max(deltaX * 0.3, -40), 40);
        targetY = ny * 30 + Math.min(Math.max(deltaY * 0.3, -40), 40);

        // Track swipe drag velocity
        if (lastMouseX !== 0 && lastMouseY !== 0) {
          const dx = touch.clientX - lastMouseX;
          const dy = touch.clientY - lastMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          targetInteractionSpeed += dist * 0.008;
        }
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY;

        // Seamlessly update standard scroll updates on momentum slides
        handleScroll();
      }
    };

    const handleTouchEnd = () => {
      // Gently return screen tracking coordinates back to their native center state
      targetX = 0;
      targetY = 0;
    };

    // Direct click surge
    const handleMouseClick = () => {
      targetInteractionSpeed += 0.8; // beautiful surge on click to wake shader with a splash of movement
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("click", handleMouseClick, { passive: true });
    
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });
    }

    let rafId: number;
    let lastAppliedTransform = "";
    let instancesListCache: any[] = [];
    let lastInstanceUpdate = 0;

    const updateLoop = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1); // prevent extreme jumps
      lastTime = now;

      // Update total scroll heights periodically (every 1000ms) to ensure absolute alignment without thrashed synchronous layout query calls
      if (now - lastHeightUpdate > 1000) {
        lastHeightUpdate = now;
        totalHeight = calculateBounds();
      }

      // Natural, modern decay calculation for interaction tracking
      targetInteractionSpeed *= Math.exp(-3.2 * dt); // exponential decay towards 0
      
      // Keep within comfortable bounds
      if (targetInteractionSpeed > 1.6) targetInteractionSpeed = 1.6;
      if (targetInteractionSpeed < 0.001) targetInteractionSpeed = 0;

      // Interpolate the active speed towards the target
      currentInteractionSpeed += (targetInteractionSpeed - currentInteractionSpeed) * 0.08;
      if (currentInteractionSpeed < 0.001) currentInteractionSpeed = 0;

      if (bgRef.current) {
        let newTransform = "";
        if (window.innerWidth < 1024) {
          newTransform = `translate3d(0px, 0px, 0)`;
        } else {
          // Luxuriously smooth lag coefficient (0.078) for high-end feel
          currentX += (targetX - currentX) * 0.078;
          currentY += (targetY - currentY) * 0.078;
          currentScroll += (targetScroll - currentScroll) * 0.078;

          // Round values to 2 decimal places to prevent layout subpixel thrashing and avoid unnecessary style writes
          const rx = Math.round(currentX * 100) / 100;
          const ry = Math.round((currentY + currentScroll) * 100) / 100;
          newTransform = `translate3d(${rx}px, ${ry}px, 0)`;
        }

        if (lastAppliedTransform !== newTransform) {
          bgRef.current.style.transform = newTransform;
          lastAppliedTransform = newTransform;
        }
      }

      // Synchronize compiled shader active parameters with current interactive velocity in real-time
      if (window.innerWidth >= 1024) {
        // Query the active instances periodically instead of per-frame to save cpu query cost
        if (now - lastInstanceUpdate > 400) {
          lastInstanceUpdate = now;
          if ((window as any).UnicornStudio) {
            const uni = (window as any).UnicornStudio;
            const insts = uni.instances || uni.getActiveInstances?.() || [];
            instancesListCache = Array.isArray(insts) 
              ? insts 
              : (insts instanceof Map ? Array.from(insts.values()) : Object.values(insts));
          } else {
            instancesListCache = [];
          }
        }

        instancesListCache.forEach((instance: any) => {
          if (instance) {
            // Adjust the instance setting or property dynamically
            if (typeof instance.setSpeed === "function") {
              try { instance.setSpeed(currentInteractionSpeed); } catch (e) {}
            } else {
              instance.speed = currentInteractionSpeed;
            }

            if (instance.settings) {
              instance.settings.speed = currentInteractionSpeed;
            }

            // Fallback manual advancing of uTime/time uniforms if speed is decoupled from runtime tickers
            if (currentInteractionSpeed > 0 && instance.uniforms) {
              const keys = ["uTime", "time", "u_time", "u_Time", "t", "u_t"];
              keys.forEach((k: string) => {
                if (instance.uniforms[k] !== undefined) {
                  if (instance.uniforms[k] && typeof instance.uniforms[k].value === "number") {
                    instance.uniforms[k].value += dt * currentInteractionSpeed;
                  } else if (typeof instance.uniforms[k] === "number") {
                    instance.uniforms[k] += dt * currentInteractionSpeed;
                  }
                }
              });
            }

            // Power-savings support: play while moving, pause immediately when frozen
            if (currentInteractionSpeed > 0.002) {
              if (typeof instance.play === "function") {
                try { instance.play(); } catch (e) {}
              }
            } else {
              if (typeof instance.pause === "function") {
                try { instance.pause(); } catch (e) {}
              }
            }
          }
        });
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("click", handleMouseClick);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
      cancelAnimationFrame(rafId);
    };
  }, [pathname, isMobile]);

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
        {!isMobile && (
          <div 
            ref={bgRef}
            data-us-project="Jv9KbHuCYWf4sr35MmdO" 
            data-us-speed="0"
            data-us-play-on-hover="true"
            data-us-disable-mobile="true"
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2200ms] ease-out mix-blend-multiply ${
              canvasRendered ? "opacity-55 sm:opacity-65" : "opacity-0"
            }`}
            style={{
              filter: 'contrast(0.9) brightness(1.15) opacity(0.8) sepia(0.85) saturate(0.5) hue-rotate(345deg)',
            }}
          />
        )}

        {/* Ambient highlighting to create a smooth, premium, layered light-mask surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-[#F2EAE1]/20" />
      </div>

      {/* Visual background noise for that paper texture look */}
      <div className="noise-overlay" />

      {/* Elegant, smooth staggered layout content */}
      <div
        className={`transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          contentVisible 
            ? "opacity-100 translate-y-0 filter blur-0" 
            : "opacity-0 translate-y-4 filter blur-[1px] pointer-events-none"
        }`}
      >
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
      </div>
    </main>
  );
}
