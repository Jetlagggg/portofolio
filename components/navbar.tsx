"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, MessageCircle } from "lucide-react";
import { waHref, mailHref } from "@/data/contact";

const contactHref = waHref() ?? mailHref();

const navLinks = [
  { label: "Proyek", href: "#works" },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Skill", href: "#skills" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !mobileMenuRef.current?.contains(target) &&
        !mobileButtonRef.current?.contains(target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[var(--shadow-md)]" : "bg-transparent"
      }`}
      id="navbar"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl font-extrabold tracking-tight group"
          id="nav-logo"
        >
          <span className="text-foreground">YP</span>
          <span className="text-accent group-hover:rotate-12 inline-block transition-transform duration-300">
            .
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-foreground bg-muted"
                    : "text-foreground-secondary hover:text-foreground hover:bg-muted/60"
                }`}
                id={`nav-${link.href.slice(1)}`}
                aria-current={isActive ? "location" : undefined}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <a
              href={contactHref ?? "#footer"}
              className="btn-primary !py-2 !px-5 !text-xs"
              id="nav-contact"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Kontak
            </a>
          </div>
          <button
            ref={mobileButtonRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-11 h-11 rounded-lg flex items-center justify-center bg-muted border border-border transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-foreground" />
            ) : (
              <Menu className="w-4 h-4 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX: progressScaleX }}
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-primary"
      />

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 invisible opacity-0"
        }`}
      >
        <div className="glass border-t border-border px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-sm font-medium text-foreground-secondary hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              aria-current={
                activeSection === link.href.slice(1) ? "location" : undefined
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href={contactHref ?? "#footer"}
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center btn-primary !rounded-xl mt-2"
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            {contactHref
              ? `Kontak ${waHref() ? "via WhatsApp" : "via Email"}`
              : "Kontak"}
          </a>
        </div>
      </div>
    </header>
  );
}
