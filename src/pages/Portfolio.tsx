import Projects from "../components/Projects";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Portfolio() {
  return (
    <div className="pt-24 min-h-screen bg-bg-warm/30">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/60 hover:text-ink mb-12"
          >
            <MoveLeft size={16} />
            Back to Home
          </motion.button>
        </Link>
      </div>
      <Projects />
    </div>
  );
}
