"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, HelpCircle } from "lucide-react";
import { SectionHeader } from "./section-header";

const faqs = [
  {
    question: "Apakah Anda tersedia untuk kerja remote?",
    answer:
      "Ya, saya terbuka untuk peluang kerja remote maupun on-site di area Samarinda dan sekitarnya. Saya terbiasa bekerja secara mandiri dan berkolaborasi melalui tools digital.",
  },
  {
    question: "Stack teknologi apa yang paling Anda kuasai?",
    answer:
      "Saya paling nyaman dengan Next.js dan React untuk frontend, serta Laravel untuk backend. Untuk IoT, saya berpengalaman dengan Arduino dan ESP32.",
  },
  {
    question: "Berapa lama estimasi pengerjaan sebuah proyek web?",
    answer:
      "Tergantung kompleksitas, website sederhana bisa selesai dalam 1-2 minggu, sedangkan aplikasi web fullstack biasanya 1-2 bulan. Saya selalu memberikan estimasi detail sebelum mulai.",
  },
  {
    question: "Apakah bisa mengerjakan proyek IoT juga?",
    answer:
      "Tentu! Saya bisa mengerjakan proyek yang menggabungkan perangkat IoT dengan web dashboard. Dari sensor reading hingga kontrol perangkat real-time melalui web.",
  },
  {
    question: "Bagaimana cara menghubungi Anda?",
    answer:
      "Anda bisa menghubungi saya melalui kanal kontak yang tersedia di bagian Koneksi (footer halaman ini). Respon biasanya dalam 1x24 jam di hari kerja.",
  },
  // TODO: sesuaikan FAQ
];

function AccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`card overflow-hidden ${isOpen ? "!border-primary" : ""}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
        id={`faq-${index}`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-4">
          <span
            className={`font-bold text-base sm:text-lg tracking-tight transition-colors duration-300 ${
              isOpen ? "text-foreground" : "text-foreground"
            }`}
          >
            {faq.question}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300 ${
            isOpen
              ? "bg-foreground border-foreground text-background"
              : "bg-muted border-border text-foreground-secondary group-hover:border-primary"
          }`}
        >
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          title="Lembar Pertanyaan"
          description="Dokumentasi standar: jawaban untuk pertanyaan yang sering diajukan"
          className="text-center"
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-foreground-secondary mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            Masih ada pertanyaan lain?
          </p>
          <a href="#footer" className="btn-secondary">
            Hubungi Saya
          </a>
        </motion.div>
      </div>
    </section>
  );
}
