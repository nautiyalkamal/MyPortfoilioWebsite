import { useEffect, useRef, useState } from "react";

export default function LocalWebGLBackground() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return window.innerWidth < 1025 || isMobileUA;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(window.innerWidth < 1025 || isMobileUA);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    let t: any;
    // When this localized component mounts on desktop, call init to let Unicorn Studio discover and initialize it
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

  // On mobile view, return a simple static, high-performance background element with absolutely NO WebGL canvas overhead
  if (isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden select-none pointer-events-none rounded-[inherit]">
        <img 
          src="https://i.ibb.co/MyMT4yHV/image.jpg"
          alt="Architectural Backdrop"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
          style={{
            filter: "grayscale(1) sepia(0.25) contrast(1.1) brightness(0.96)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FAFAFA]/65 via-[#F4F4F5]/75 to-[#FAF6F0]/65 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/45" />
      </div>
    );
  }

  // On desktop view, render the interactive WebGL Canvas container
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
        data-us-disable-mobile="true"
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
