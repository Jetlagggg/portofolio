"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";

const services = [
  {
    title: "Pengembangan Web Fullstack",
    description:
      "Membangun aplikasi web end-to-end dengan teknologi modern seperti Next.js, React, Laravel, dan database MySQL.",
    tags: ["Next.js", "Laravel", "MySQL"],
  },
  {
    title: "Integrasi IoT",
    description:
      "Mengembangkan sistem IoT yang terhubung dengan web dashboard untuk monitoring dan kontrol perangkat secara real-time.",
    tags: ["Arduino", "ESP32", "Sensor"],
  },
  {
    title: "Slicing Figma ke Kode",
    description:
      "Mengubah desain Figma menjadi kode yang pixel-perfect, responsif, dan semantik menggunakan HTML5, Tailwind CSS, dan Next.js.",
    tags: ["Figma", "Tailwind CSS", "Responsive"],
  },
  {
    title: "Sistem Informasi & Portal",
    description:
      "Membangun sistem informasi, portal web, dan aplikasi manajemen yang disesuaikan dengan kebutuhan organisasi.",
    tags: ["Custom CMS", "Dashboard", "REST API"],
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Prosedur Layanan"
          description="Daftar prosedur yang bisa saya kerjakan untuk proyek Anda"
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
                <span className="label">P-{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold text-foreground tracking-tight mt-1.5">
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
