import { motion } from "motion/react";
import { Send, Linkedin, Instagram, Mail, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 px-6 bg-bg-warm relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 right-0 w-1/3 h-full gradient-bg -z-0 opacity-20" />
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
          <div className="space-y-6 md:space-y-10">
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none">
              LET'S BUILD<br />SOMETHING<br />INTELLIGENT.
            </h2>
            <div className="space-y-4 md:space-y-6">
              <p className="text-base md:text-lg font-medium text-ink/60 max-w-md">
                Always open for BIM coordination, structural design, and innovative architectural collaborations.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-5 pt-2 md:pt-4">
                <a href="https://www.linkedin.com/in/kamalnautiyal10/" target="_blank" rel="noopener noreferrer" className="h-9 w-9 md:h-11 md:w-11 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all">
                  <Linkedin size={16} />
                </a>
                <a href="mailto:nautiyalkamal10@gmail.com" className="h-9 w-9 md:h-11 md:w-11 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all">
                  <Mail size={16} />
                </a>
                <a href="https://www.instagram.com/build_the_matrix?utm_source=qr&igsh=MWlxcTFyOGl4M2dyNw==" target="_blank" rel="noopener noreferrer" className="h-9 w-9 md:h-11 md:w-11 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all">
                  <Instagram size={16} />
                </a>
                <a href="tel:+917505683585" className="h-9 w-9 md:h-11 md:w-11 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all">
                  <Phone size={16} />
                </a>
                <a href="https://wa.me/+919897391597" target="_blank" rel="noopener noreferrer" className="h-9 w-9 md:h-11 md:w-11 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-white transition-all">
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-12 lg:p-14 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl">
            <form className="space-y-5 md:space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-ink/40 ml-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 md:px-5 py-2.5 md:py-3.5 bg-ink/5 border-none rounded-lg md:rounded-xl outline-none focus:ring-1 focus:ring-ink transition-all text-xs sm:text-sm font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-ink/40 ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 md:px-5 py-2.5 md:py-3.5 bg-ink/5 border-none rounded-lg md:rounded-xl outline-none focus:ring-1 focus:ring-ink transition-all text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold tracking-widest text-ink/40 ml-1">Project Brief</label>
                <textarea
                  rows={3}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 md:px-5 py-2.5 md:py-3.5 bg-ink/5 border-none rounded-lg md:rounded-xl outline-none focus:ring-1 focus:ring-ink transition-all text-xs sm:text-sm font-medium resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-ink text-white py-4 md:py-5 rounded-lg md:rounded-xl flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest"
              >
                <span>Send Message</span>
                <Send size={12} />
              </motion.button>
            </form>
          </div>
        </div>

        <div className="mt-16 md:mt-24 pt-10 md:pt-14 border-t border-ink/10 flex flex-col md:flex-row gap-5 md:gap-7 justify-between items-center opacity-60 text-center md:text-left">
            <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest">© 2024 Kamal Nautiyal Portfolio — BIM Design Engineer</p>
            <div className="flex gap-5 md:gap-7">
                <a href="#" className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest hover:text-ink transition-colors">Privacy Policy</a>
                <a href="#" className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest hover:text-ink transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </section>
  );
}
