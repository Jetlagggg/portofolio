"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowDown, FileText, FlaskConical } from "lucide-react";
import Image from "next/image";
import { contact } from "@/data/contact";

const ease = [0.22, 1, 0.36, 1] as const;

const bubbles = [
  { size: 7, left: "28%", bottom: "14%", delay: 0, duration: 4 },
  { size: 5, left: "48%", bottom: "10%", delay: 1.2, duration: 3.6 },
  { size: 9, left: "62%", bottom: "16%", delay: 2.1, duration: 4.8 },
  { size: 4, left: "38%", bottom: "20%", delay: 2.8, duration: 3.2 },
  { size: 6, left: "72%", bottom: "12%", delay: 0.6, duration: 4.4 },
];

function RevealLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.9, ease }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden noise"
    >
      {/* Lab notebook grid */}
      <div className="absolute inset-0 lab-grid pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16">
        {/* Lab status */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
          className="flex justify-center mb-10"
        >
          <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold tracking-wide">Lab aktif — terbuka untuk eksperimen</span>
            <span className="w-px h-3 bg-border" />
            <MapPin className="w-3 h-3 text-primary" />
            <span className="text-xs text-foreground-secondary">Samarinda, ID</span>
          </div>
        </motion.div>

        {/* Flask specimen (signature moment) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease }}
          className="relative mx-auto mb-10 w-44 h-44 sm:w-48 sm:h-48"
        >
          {/* Flask outline */}
          <svg
            viewBox="0 0 120 120"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <path
              d="M50,8 L50,47.6 A32,32 0 1,0 70,47.6 L70,8"
              fill="none"
              stroke="var(--foreground-secondary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M43,8 L77,8"
              fill="none"
              stroke="var(--foreground-secondary)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M46,14 L74,14"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Specimen (avatar) inside the belly */}
          <div className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 w-[46%] h-[46%] rounded-full overflow-hidden border border-border">
            <Image
              src="https://avatars.githubusercontent.com/u/215252053?v=4"
              alt="Yoshua Pandawinatha"
              width={144}
              height={144}
              priority
              className="w-full h-full object-cover"
            />
            {/* Bubbles in the solution */}
            {bubbles.map((b, i) => (
              <span
                key={i}
                className="bubble"
                style={{
                  width: b.size,
                  height: b.size,
                  left: b.left,
                  bottom: b.bottom,
                  animationDelay: `${b.delay}s`,
                  animationDuration: `${b.duration}s`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Headline */}
        <h1 className="text-center text-[clamp(2.75rem,9vw,6rem)] font-bold tracking-[-0.035em] leading-[1] mb-6 text-foreground">
          <RevealLine delay={0.35}>YOSHUA</RevealLine>
          <RevealLine delay={0.48}>PANDAWINATHA</RevealLine>
        </h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="hidden sm:block h-px w-12 bg-border" />
          <span className="label text-foreground-secondary text-center">
            Fullstack Developer
            <span className="text-accent mx-2">·</span>
            IoT Enthusiast
          </span>
          <span className="hidden sm:block h-px w-12 bg-border" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease }}
          className="text-foreground-secondary max-w-xl mx-auto mb-8 leading-relaxed text-center"
        >
          Mahasiswa Teknik Informatika yang passionate dalam membangun solusi digital
          melalui web development dan Internet of Things.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease }}
          className="flex flex-wrap justify-center gap-3"
        >
          <a href="#works" className="btn-primary" id="cta-projects">
            <FlaskConical className="w-4 h-4" />
            Lihat Eksperimen
          </a>
          {contact.cv && (
            <a href={contact.cv} className="btn-secondary" id="cta-resume">
              <FileText className="w-4 h-4" />
              Resume / CV
            </a>
          )}
        </motion.div>

        {/* Scroll hint */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="hidden sm:flex flex-col items-center gap-2 mx-auto mt-16 w-fit text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll ke bawah"
        >
          <span className="label">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
