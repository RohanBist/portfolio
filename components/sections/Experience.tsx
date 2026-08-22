"use client";

import SectionWrapper from "@/components/ui/Sectionwrapper";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <section
        style={{
          padding: "80px clamp(24px, 5vw, 64px)",
          background: "var(--bg)",
        }}
      >
        {/* Header */}
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 12,
          }}
        >
          [ Experience ]
        </p>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            color: "var(--text-primary)",
            marginBottom: 40,
          }}
        >
          Where I've Worked
        </h2>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {experience.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8,
                padding: "32px 36px",
                transition: "border-color 0.3s ease",
              }}
              className="experience-card"
            >
              {/* Top row — company + date */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {/* Left: company + type badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <h3
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(20px, 2.5vw, 26px)",
                      color: "var(--text-primary)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.company}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 11,
                      fontWeight: 400,
                      color: "var(--accent)",
                      background: "rgba(232,197,71,0.08)",
                      border: "1px solid rgba(232,197,71,0.2)",
                      borderRadius: 999,
                      padding: "3px 10px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.type}
                  </span>
                </div>

                {/* Right: date */}
                <span
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 300,
                    fontSize: 13,
                    color: "var(--text-body)",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.start} — {item.end}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.05)",
                  marginBottom: 20,
                }}
              />

              {/* Role */}
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  color: "var(--accent)",
                  letterSpacing: "0.04em",
                  marginBottom: 16,
                }}
              >
                {item.role}
              </p>

              {/* Bullets */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {item.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 300,
                      fontSize: 15,
                      color: "var(--text-body)",
                      lineHeight: 1.7,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--accent)",
                        flexShrink: 0,
                        marginTop: 4,
                        fontSize: 8,
                      }}
                    >
                      ◆
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}