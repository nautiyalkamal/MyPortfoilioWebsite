import { useEffect, useRef, useState } from "react";

export default function LocalWebGLBackground() {
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

  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) return;

    let t: any;
    // When this localized component mounts on mobile, call init to let Unicorn Studio discover and initialize it
    if ((window as any).UnicornStudio && typeof (window as any).UnicornStudio.init === "function") {
      try {
        (window as any).UnicornStudio.init();
      } catch (err) {
        console.error("Unicorn Studio local init error:", err);
      }
    }

    t = setTimeout(() => {
      if ((window as any).UnicornStudio && typeof (window as any).UnicornStudio.init === "function") {
        try {
          (window as any).UnicornStudio.init();
        } catch (err) {}
      }
    }, 400);

    return () => {
      clearTimeout(t);
    };
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden select-none pointer-events-none rounded-[inherit]">
      {/* Soft overlay gradient to blend nicely with any section theme */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FAFAFA]/30 via-transparent to-[#E4E4E7]/30 opacity-70" />
      
      {/* WebGL Canvas container with custom filters */}
      <div 
        ref={localRef}
        data-us-project="Jv9KbHuCYWf4sr35MmdO" 
        data-us-speed="0"
        data-us-play-on-hover="true"
        data-us-disable-mobile="false"
        className="absolute inset-0 w-full h-full mix-blend-multiply opacity-50 sm:opacity-60"
        style={{
          filter: 'grayscale(1) contrast(0.9) brightness(1.15) opacity(0.75)',
        }}
      />
      
      {/* Top and bottom subtle highlights */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/50" />
    </div>
  );
}
