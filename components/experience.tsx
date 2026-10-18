"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/data/experience";
import { Briefcase } from "lucide-react";
import { SectionHeader } from "./section-header";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 55%"],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.01,
  });

  return (
    <section id="experience" className="section-padding bg-background-secondary noise overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          title="Logbook Penelitian"
          description="Catatan perjalanan akademik dan profesional, diurutkan dari yang terbaru"
        />

        <div className="max-w-3xl mx-auto">
          <div ref={containerRef} className="relative">
            {/* Static timeline track */}
            <div className="absolute left-[1.4rem] sm:left-[1.65rem] top-0 bottom-0 w-px bg-border" />

            {/* Animated progress line */}
            <motion.div
              style={{ scaleY: lineHeight }}
              className="absolute left-[1.4rem] sm:left-[1.65rem] top-0 bottom-0 w-px origin-top bg-primary"
            />

            {experience.length > 0 ? (
              experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-5 sm:gap-7 mb-6 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex w-11 sm:w-[3.3rem] flex-shrink-0 justify-start pt-7">
                    <span className="relative z-10 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_0_4px_var(--background-secondary)]" />
                  </div>

                  {/* Content Card */}
                  <div className="card p-6 sm:p-7 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-foreground tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="label">
                        Log · {exp.period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-primary mb-2.5">{exp.place}</p>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card p-10 text-center"
              >
                <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-muted-foreground text-sm">Data pengalaman segera diisi</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
