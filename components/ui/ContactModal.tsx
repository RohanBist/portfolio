"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    if (!name || !email || !message) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 998,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Modal */}
<motion.div
  key="modal"
  initial={{ opacity: 0, y: 20, scale: 0.97 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 20, scale: 0.97 }}
  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    translateX: "-50%",
    translateY: "-50%",
    zIndex: 999,
    width: "min(520px, 90vw)",
    background: "#141414",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "36px clamp(20px, 5vw, 40px)",
    maxHeight: "90vh",
    overflowY: "auto",
  }}
>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 28,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 6,
                  }}
                >
                  [ Contact ]
                </p>
                <h2
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontWeight: 600,
                    fontSize: 24,
                    color: "var(--text-primary)",
                  }}
                >
                  Let's work together
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-body)",
                  padding: 4,
                  transition: "color 0.2s ease",
                }}
                className="close-btn"
              >
                <X size={20} />
              </button>
            </div>

            {status === "sent" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "32px 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: 22,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  Message sent ✦
                </p>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 14,
                    color: "var(--text-body)",
                    fontWeight: 300,
                  }}
                >
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={inputStyle}
                    className="contact-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={inputStyle}
                    className="contact-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What are you working on?"
                    rows={4}
                    style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                    className="contact-input"
                  />
                </div>

                {status === "error" && (
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 13,
                      color: "#e05555",
                      fontWeight: 300,
                    }}
                  >
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={{
                    marginTop: 4,
                    padding: "12px 28px",
                    background: status === "sending" ? "rgba(232,197,71,0.5)" : "#E8C547",
                    color: "#0C0C0C",
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    border: "none",
                    borderRadius: 999,
                    transition: "background 0.2s ease, transform 0.2s ease",
                    alignSelf: "flex-start",
                  }}
                  className="cv-link"
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Sora', sans-serif",
  fontSize: 11,
  fontWeight: 400,
  color: "var(--text-body)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 6,
  padding: "12px 16px",
  fontFamily: "'Sora', sans-serif",
  fontSize: 14,
  fontWeight: 300,
  color: "var(--text-primary)",
  outline: "none",
  boxSizing: "border-box",
};