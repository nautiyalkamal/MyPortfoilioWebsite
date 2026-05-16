import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { navLinks } from "../data";
import { Download, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-5 md:py-6 flex justify-between items-center mix-blend-difference"
      >
        <div className="flex items-center gap-2 md:gap-8">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2.5 -ml-4 hover:bg-white/10 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-white font-display text-lg md:text-xl font-bold tracking-tighter whitespace-nowrap">
            Kamal Nautiyal.
          </Link>
          <div className="hidden lg:flex gap-6 md:gap-8">
            {navLinks.map((link) => (
              link.href.startsWith("/#") || link.href === "/portfolio" || link.href === "/" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-white/60 hover:text-white text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors font-bold"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/60 hover:text-white text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors font-bold"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-4">
          <Link
            to="/portfolio"
            className="border border-white/20 text-white px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 text-[9px] md:text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors hover:bg-white/10"
          >
            <span className="hidden sm:inline">View Portfolio</span>
            <span className="sm:hidden">Projects</span>
          </Link>

          <Link
            to="/#resume"
            className="bg-white text-ink px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 text-[9px] md:text-xs font-bold uppercase tracking-widest cursor-pointer shadow-xl"
          >
            <span className="hidden sm:inline">View Resume</span>
            <span className="sm:hidden">CV</span>
            <Download size={12} className="md:w-3.5 md:h-3.5" />
          </Link>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-ink text-white lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-bold tracking-tighter">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={link.name}
                >
                   {link.href.startsWith("/#") || link.href === "/portfolio" || link.href === "/" ? (
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-bold uppercase tracking-tighter"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-bold uppercase tracking-tighter"
                    >
                      {link.name}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-6">Socials</p>
              <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/kamalnautiyal10/" target="_blank" rel="noopener noreferrer" className="text-xs uppercase font-bold tracking-widest hover:text-white/60">LinkedIn</a>
                <a href="https://www.instagram.com/build_the_matrix?utm_source=qr&igsh=MWlxcTFyOGl4M2dyNw==" target="_blank" rel="noopener noreferrer" className="text-xs uppercase font-bold tracking-widest hover:text-white/60">Instagram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
