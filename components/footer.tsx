"use client";

import { motion, useReducedMotion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { useLocalTime } from "@/lib/use-local-time";
import { MessageCircle, Clock, Heart, ArrowUp, Mail } from "lucide-react";
import { FaLinkedin as Linkedin, FaGithub as Github } from "react-icons/fa";
import { contact, waHref, mailHref } from "@/data/contact";

const navLinks = [
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Proyek", href: "#works" },
  { label: "Skill", href: "#skills" },
  { label: "Pengalaman", href: "#experience" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  const time = useLocalTime();
  const reduceMotion = useReducedMotion();

  const wa = waHref();
  const mail = mailHref();

  const socials = [
    { icon: Github, label: "GitHub", href: contact.github },
    ...(contact.linkedin ? [{ icon: Linkedin, label: "LinkedIn", href: contact.linkedin }] : []),
    ...(wa ? [{ icon: MessageCircle, label: "WhatsApp", href: wa }] : []),
    ...(mail ? [{ icon: Mail, label: "Email", href: mail }] : []),
  ];

  return (
    <footer id="footer" className="relative bg-marquee-bg text-marquee-text overflow-hidden">
      {/* Marquee strip */}
      <div className="py-5 border-b border-white/10">
        {reduceMotion ? (
          <p className="text-center text-2xl sm:text-4xl font-black tracking-tight uppercase">
            Mari Berekspesimen
          </p>
        ) : (
          <Marquee gradient={false} speed={30} className="overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="mx-6 flex items-center gap-6">
                <span
                  className={`text-2xl sm:text-4xl font-black tracking-tight uppercase ${
                    i % 2 === 0 ? "text-marquee-text" : "strip-outline"
                  }`}
                >
                  Mari Berekspesimen
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </span>
            ))}
          </Marquee>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="py-16 sm:py-20 text-center border-b border-white/10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.08]">
            Punya ide?
            <br />
            Kita racik bareng.
          </h2>
          <p className="text-marquee-text/70 mb-9 max-w-lg mx-auto leading-relaxed">
            Punya proyek menarik atau ingin berdiskusi? Jangan ragu untuk menghubungi saya.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary" id="footer-wa">
                <MessageCircle className="w-4 h-4" />
                Hubungi via WhatsApp
              </a>
            )}
            {mail && (
              <a
                href={mail}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-full border border-white/20 text-marquee-text hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5"
                id="footer-email"
              >
                <Mail className="w-4 h-4" />
                Kirim Email
              </a>
            )}
            {!wa && !mail && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                id="footer-wa"
              >
                <Github className="w-4 h-4" />
                Hubungi via GitHub
              </a>
            )}
          </div>
        </motion.div>

        {/* Main Footer */}
        <div className="py-12 grid sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <a href="#hero" className="text-2xl font-extrabold tracking-tight">
              <span>YP</span>
              <span className="text-accent">.</span>
            </a>
            <p className="text-sm text-marquee-text/60 mt-4 leading-relaxed">
              Mahasiswa Teknik Informatika & Fullstack Web Developer berbasis di Samarinda,
              Kalimantan Timur.
            </p>
            {/* Live Clock */}
            <div className="flex items-center gap-2 text-sm text-marquee-text/60 mt-6">
              <Clock className="w-4 h-4 text-primary" />
              <span>Samarinda, WITA —</span>
              <span className="font-mono font-medium text-marquee-text">
                {time || "--:--:--"}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-marquee-text mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-marquee-text/70 hover:text-marquee-text transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold text-marquee-text mb-4">Koneksi</h4>
            <div className="flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  aria-label={social.label}
                  id={`footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4 text-marquee-text/80" />
                </a>
              ))}
            </div>
            <p className="text-sm text-marquee-text/50 mt-6 leading-relaxed">
              Respon biasanya dalam{" "}
              <span className="text-marquee-text font-medium">1×24 jam</span> di hari kerja.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-marquee-text/50 flex items-center gap-1.5">
            © {new Date().getFullYear()} Yoshua Pandawinatha. Dibuat dengan{" "}
            <Heart className="w-3 h-3 text-accent inline" /> di Samarinda.
          </p>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
              })
            }
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
            aria-label="Scroll ke atas"
            id="scroll-to-top"
          >
            <ArrowUp className="w-4 h-4 text-marquee-text/80" />
          </button>
        </div>
      </div>
    </footer>
  );
}
