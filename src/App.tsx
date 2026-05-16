/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import GalleryPage from "./pages/GalleryPage";

export default function App() {
  const { pathname, hash } = useLocation();

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
