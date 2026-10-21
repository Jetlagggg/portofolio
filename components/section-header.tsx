"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  title,
  description,
  className = "",
}: {
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  const centered = className.includes("text-center");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 ${className}`}
    >
      <h2 className="display-title text-foreground">{title}</h2>
      {description && (
        <p
          className={`mt-4 max-w-xl text-base sm:text-lg text-foreground-secondary leading-relaxed ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
      <div className={`tick-rule mt-8 ${centered ? "mx-auto w-24" : "w-16"}`} />
    </motion.div>
  );
}
