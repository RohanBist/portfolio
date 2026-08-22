"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/Sectionwrapper";
import { about } from "@/lib/data";

export default function About() {
  return (
    <SectionWrapper id="about">
      <section
        className="about-section"
        style={{
          background: "var(--bg)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="about-container">

          {/* LEFT */}
          <div className="about-content">

            <p className="about-label">
              [ About ]
            </p>

            <h2 className="about-heading">
              {about.heading}
            </h2>

            <div className="about-bio">
              {about.bio.map((para, i) => (
                <p key={i}>
                  {para}
                </p>
              ))}
            </div>

            <motion.a
              href="/Rohan Bist CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="cv-link"
            >
              Download CV ↓
            </motion.a>
          </div>

          {/* RIGHT PHOTO TARGET */}
          <div className="about-photo-column">
            <div
              id="about-photo-slot"
              className="about-photo-slot"
            />
          </div>

        </div>
      </section>
    </SectionWrapper>
  );
}