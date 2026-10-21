"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";

const interests = ["Web Dev", "IoT", "Analisis Data", "UI/UX", "Pemecahan Masalah"];

export function About() {
  return (
    <section id="about" className="section-padding noise overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader title="Tentang Saya" />

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="card p-7 sm:p-10 md:sticky md:top-24"
          >
            <p className="label mb-4">Catatan Lapangan</p>
            <p className="text-xl sm:text-2xl font-semibold leading-snug text-foreground mb-6 text-balance">
              Teknologi terbaik adalah yang mampu menyelesaikan masalah nyata.
            </p>
            <p className="text-foreground-secondary leading-relaxed mb-4">
              Saya menggabungkan pengembangan web dan IoT untuk membangun solusi
              yang berfungsi baik dan nyaman digunakan.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              Fokus saya adalah aplikasi web yang responsif, cepat, dan terhubung
              dengan perangkat IoT.
            </p>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="label mb-3">Minat</p>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((item) => (
                  <span key={item} className="badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="card p-7 sm:p-8"
          >
            <dl className="space-y-6">
              <div>
                <dt className="label mb-1.5">Pendidikan</dt>
                <dd className="font-bold text-foreground text-lg">S1 Teknik Informatika</dd>
                <dd className="text-sm text-foreground-secondary">STMIK Widya Cipta Dharma</dd>
              </div>
              <div className="border-t border-border pt-6">
                <dt className="label mb-1.5">Lokasi</dt>
                <dd className="font-bold text-foreground text-lg">Samarinda</dd>
                <dd className="text-sm text-foreground-secondary">Kalimantan Timur, Indonesia</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
