"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";

const services = [
  {
    title: "Pengembangan Web",
    description:
      "Membangun aplikasi web dari antarmuka hingga database dengan Next.js, React, Laravel, dan MySQL.",
    tags: ["Next.js", "Laravel", "MySQL"],
  },
  {
    title: "Integrasi IoT",
    description:
      "Mengembangkan sistem IoT yang terhubung dengan dasbor web untuk memantau dan mengendalikan perangkat secara real-time.",
    tags: ["Arduino", "ESP32", "Sensor"],
  },
  {
    title: "Implementasi Desain Figma",
    description:
      "Mengubah desain Figma menjadi antarmuka yang responsif dan mudah diakses dengan HTML5, Tailwind CSS, dan Next.js.",
    tags: ["Figma", "Tailwind CSS", "Responsif"],
  },
  {
    title: "Sistem Informasi & Portal",
    description:
      "Membangun sistem informasi, portal web, dan aplikasi manajemen yang disesuaikan dengan kebutuhan organisasi.",
    tags: ["CMS Kustom", "Dasbor", "REST API"],
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-background-secondary noise overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Layanan"
          description="Dari aplikasi web hingga integrasi perangkat IoT."
        />

        <div className="border-t border-border">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="grid sm:grid-cols-12 gap-x-8 gap-y-3 border-b border-border py-8 sm:py-10"
            >
              <div className="sm:col-span-4">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  {service.title}
                </h3>
              </div>
              <p className="sm:col-span-5 text-sm text-foreground-secondary leading-relaxed">
                {service.description}
              </p>
              <div className="sm:col-span-3 flex flex-wrap gap-1.5 sm:justify-end content-start">
                {service.tags.map((tag) => (
                  <span key={tag} className="badge !text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
