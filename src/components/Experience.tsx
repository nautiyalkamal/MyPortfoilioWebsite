import { motion } from "motion/react";
import { experience, skills } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="py-12 md:py-20 px-6 bg-bg-warm scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          
          {/* Experience Timeline */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 md:mb-12">
              EXPERIENCE & SKILLS
            </h2>
            <div className="space-y-0">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.role + index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="py-8 md:py-10 border-b border-ink/10 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 group"
                >
                  <p className="text-[10px] md:text-[9px] uppercase font-bold tracking-[0.2em] text-ink/40 md:pt-1.5">
                    {exp.period}
                  </p>
                  <div className="md:col-span-2 space-y-1">
                    <h3 className="text-xl md:text-xl font-bold group-hover:text-ink/80 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-[10px] md:text-[9px] uppercase font-bold text-ink/60 tracking-wider">
                      {exp.company}
                    </p>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-xs md:text-xs font-medium leading-relaxed text-ink/60">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* I Can Help You With / Skills */}
          <div id="skills" className="space-y-12 md:space-y-20 scroll-mt-24">
            <div className="space-y-6 md:space-y-10">
               <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                I CAN HELP YOU WITH
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                        className="space-y-2 md:space-y-3"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-serif italic text-ink/40">0{index + 1}</span>
                            <h4 className="text-base md:text-lg font-bold">{skill.name}</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1 md:pt-1.5">
                            {skill.software.map(s => (
                                <span key={s} className="px-2.5 py-0.5 bg-ink/5 rounded-full text-[7px] md:text-[8px] uppercase font-bold tracking-widest text-ink/60">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
               </div>
            </div>

            {/* Turning Vision into Reality CTA or Info */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-ink text-white p-6 md:p-10 rounded-[1.5rem] space-y-4 md:space-y-6"
            >
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-none">
                    TURNING YOUR VISION<br />INTO REALITY
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-6 pt-2 md:pt-4">
                    <div className="space-y-0.5 md:space-y-1">
                        <p className="text-2xl md:text-3xl font-bold">49+</p>
                        <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest opacity-40">completed projects</p>
                    </div>
                    <div className="space-y-0.5 md:space-y-1">
                        <p className="text-2xl md:text-3xl font-bold">18+</p>
                        <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest opacity-40">cities</p>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
