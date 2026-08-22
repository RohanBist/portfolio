"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/lib/data";
import ContactModal from "@/components/ui/ContactModal";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(24px, 5vw, 64px)",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "rgba(12, 12, 12, 0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        {/* Monogram */}
        <a
          href="/"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 600,
            fontSize: 22,
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          {personal.monogram}
        </a>

        {/* Center nav links — desktop */}
        <nav
          style={{
            display: "flex",
            gap: 36,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: 11,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textDecoration: "none",
                opacity: 0.75,
                transition: "opacity 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.opacity = "1";
                (e.target as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.opacity = "0.75";
                (e.target as HTMLElement).style.color = "var(--text-primary)";
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right: Contact button + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Contact button — desktop */}
          <button
            onClick={() => setContactOpen(true)}
            className="hidden-mobile contact-nav-btn"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: 11,
              color: "#0C0C0C",
              background: "#E8C547",
              border: "none",
              borderRadius: 999,
              padding: "8px 20px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}
          >
            Contact
          </button>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="show-mobile"
            style={{
              background: "none",
              border: "none",
              padding: 8,
              display: "none",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  background: "var(--text-primary)",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform:
                    menuOpen && i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : menuOpen && i === 2
                      ? "translateY(-6.5px) rotate(-45deg)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "rgba(12, 12, 12, 0.97)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(32px, 8vw, 56px)",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Contact in mobile menu */}
            <motion.button
              onClick={() => {
                setMenuOpen(false);
                setContactOpen(true);
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: navLinks.length * 0.08,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(32px, 8vw, 56px)",
                color: "var(--accent)",
                background: "none",
                border: "none",
                letterSpacing: "0.02em",
              }}
            >
              Contact
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        .contact-nav-btn:hover {
          background: #d4b040 !important;
          transform: translateY(-1px);
        }
        .close-btn:hover {
          color: var(--text-primary) !important;
        }
        .contact-input:focus {
          border-color: rgba(232,197,71,0.4) !important;
        }
      `}</style>
    </>
  );
}