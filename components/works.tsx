"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import Image from "next/image";
import { SectionHeader } from "./section-header";

const mediaClass =
  "md:col-span-2 relative min-h-[220px] md:min-h-[300px] overflow-hidden bg-muted block";

export function Works() {
  return (
    <section id="works" className="section-padding bg-background-secondary noise overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          title="Eksperimen Terapan"
          description="Katalog proyek yang telah diuji dan diterapkan"
        />

        <div className="grid gap-6">
          {projects.map((project, i) => {
            const target = project.link ?? project.repo;

            const media = (
              <>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/5 to-transparent" />
                {target && (
                  <div className="absolute bottom-4 left-5 right-5 flex items-center gap-2 text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em]">
                      Buka proyek
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                )}
              </>
            );

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="card overflow-hidden group"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Project Image */}
                  {target ? (
                    <a
                      href={target}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={mediaClass}
                      aria-label={`Buka proyek ${project.title}`}
                    >
                      {media}
                    </a>
                  ) : (
                    <div className={mediaClass}>{media}</div>
                  )}

                  {/* Content */}
                  <div className="md:col-span-3 p-6 sm:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="label">
                        Katalog WS-{String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`label !text-[0.58rem] px-2 py-0.5 rounded-full ${
                          target
                            ? "bg-badge-bg text-badge-text"
                            : "bg-accent/15 text-accent"
                        }`}
                      >
                        {target ? "Terbit" : "Dalam Kajian"}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3 leading-tight transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed mb-5">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <span key={tech} className="badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !py-2 !px-5 !text-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary !py-2 !px-5 !text-xs"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Kode Sumber
                        </a>
                      )}
                      {!project.link && !project.repo && (
                        <span className="text-xs text-muted-foreground italic">
                          Link segera tersedia
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
