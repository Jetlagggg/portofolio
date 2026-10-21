"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { SectionHeader } from "./section-header";

const categoryStrip: Record<string, string> = {
  Frontend: "border-t-primary",
  Backend: "border-t-foreground",
  "IoT / Hardware": "border-t-accent",
  Tools: "border-t-[#D4DF9E]",
};

export function Skills() {
  const groups = skills.map((group, i) => ({
    ...group,
    start:
      skills.slice(0, i).reduce((sum, prev) => sum + prev.items.length, 0) + 1,
  }));

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Tabel Periodik Keahlian"
          description="Keahlian yang saya gunakan untuk membangun aplikasi web, sistem, dan perangkat IoT."
        />

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-3 mb-4">
                <span className="label text-foreground">{group.category}</span>
                <span className="flex-1 h-px bg-border" />
                <span className="label">{group.items.length} elemen</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {group.items.map((item, idx) => {
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      title={item.name}
                      className={`bg-card border border-card-border border-t-2 ${
                        categoryStrip[group.category] ?? "border-t-primary"
                      } rounded-lg p-3 pt-2 aspect-square flex flex-col justify-between hover:bg-card-hover hover:shadow-sm transition-colors duration-300`}
                    >
                      <span className="label !text-[0.62rem] !tracking-[0.08em]">
                        {String(group.start + idx).padStart(2, "0")}
                      </span>
                      <span className="text-2xl sm:text-[1.7rem] font-bold text-foreground text-center leading-none">
                        {item.symbol}
                      </span>
                      <span className="text-[0.7rem] text-foreground-secondary text-center leading-tight line-clamp-2">
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
