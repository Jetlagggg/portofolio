"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { SectionHeader } from "./section-header";

function statusFor(project: (typeof projects)[number]) {
  if (project.link) return "Demo Langsung";
  if (project.repo) return "Repo Publik";
  return "Prototipe";
}

function ProjectPlaceholder({
  index,
  total,
  title,
  featured,
}: {
  index: number;
  total: number;
  title: string;
  featured: boolean;
}) {
  const accent = index % 2 === 0 ? "var(--accent)" : "var(--accent-warm)";

  return (
    <div
      role="img"
      aria-label={`Pratinjau visual ${title} segera hadir`}
      className="relative h-full w-full overflow-hidden bg-marquee-bg text-marquee-text"
    >
      <div className="absolute inset-0 lab-grid opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-[18%] top-1/2 aspect-square w-[62%] -translate-y-1/2 rounded-full border border-marquee-text/10"
        aria-hidden="true"
      />
      <div
        className="absolute -right-[6%] top-1/2 aspect-square w-[34%] -translate-y-1/2 rounded-full border border-marquee-text/15"
        aria-hidden="true"
      />
      <span
        className="absolute right-[9%] top-[28%] h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-marquee-text/75">
          <span>Pratinjau visual</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <p
          className={`font-black uppercase leading-[0.86] tracking-[-0.04em] ${
            featured
              ? "text-[clamp(3rem,7vw,5.5rem)]"
              : "text-[clamp(2.25rem,4vw,3.5rem)]"
          }`}
        >
          Coming
          <br />
          <span style={{ color: accent }}>soon.</span>
        </p>

        <p className="max-w-[28ch] text-xs leading-relaxed text-marquee-text/75 sm:text-sm">
          Tangkapan layar sedang disiapkan.
        </p>
      </div>
    </div>
  );
}

export function Works() {
  return (
    <section id="works" className="section-padding bg-background-secondary noise overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          title="Eksperimen Terapan"
          description="Proyek nyata dengan kode sumber publik yang bisa ditelusuri."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => {
            const target = project.link ?? project.repo;
            const featured = i === 0;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`card overflow-hidden flex flex-col ${
                  featured ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    featured
                      ? "aspect-[16/10] sm:aspect-[21/9]"
                      : "aspect-[16/10]"
                  }`}
                >
                  <ProjectPlaceholder
                    index={i}
                    total={projects.length}
                    title={project.title}
                    featured={featured}
                  />
                </div>

                <div
                  className={`p-6 sm:p-7 flex flex-1 flex-col ${
                    featured ? "md:grid md:grid-cols-[1.5fr_1fr] md:gap-10" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`label !text-[0.62rem] px-2 py-0.5 rounded-full ${
                          target
                            ? "bg-badge-bg text-badge-text"
                            : "bg-accent/15 text-accent"
                        }`}
                      >
                        {statusFor(project)}
                      </span>
                    </div>
                    <h3
                      className={`font-bold tracking-tight text-foreground mb-3 leading-tight ${
                        featured
                          ? "text-2xl sm:text-3xl md:text-4xl"
                          : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-foreground-secondary leading-relaxed ${
                        featured
                          ? "text-base sm:text-lg max-w-2xl"
                          : "text-sm sm:text-base"
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className={`flex flex-1 flex-col ${featured ? "" : "mt-5"}`}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <span key={tech} className="badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !py-2 !px-5 !text-xs min-h-11"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Buka Demo
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary !py-2 !px-5 !text-xs min-h-11"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Kode Sumber
                        </a>
                      )}
                      {!project.link && !project.repo && (
                        <span className="text-xs text-muted-foreground italic">
                          Tautan belum tersedia
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
