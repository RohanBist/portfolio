"use client";

import { useState } from "react";
import Image from "next/image";
import { Github } from "lucide-react";
import SectionWrapper from "@/components/ui/Sectionwrapper";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: hovered
            ? "0 0 0 1.5px #E8C547, 0 0 20px rgba(232,197,71,0.10)"
            : "0 0 0 1.5px transparent",
          transition: "box-shadow 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            style={{
              objectFit: "contain",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.4s ease-out",
            }}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>

        {/* Card body */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderLeft: "0.5px solid rgba(255,255,255,0.07)",
            borderRight: "0.5px solid rgba(255,255,255,0.07)",
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
            padding: "16px 18px",
          }}
        >
          {/* Name */}
          <p
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 500,
              fontSize: 18,
              color: "var(--text-primary)",
              marginBottom: 6,
            }}
          >
            {project.name}
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: "var(--text-body)",
              lineHeight: 1.5,
              marginBottom: 14,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.description}
          </p>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Tech pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 11,
                    color: "var(--text-body)",
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    borderRadius: 999,
                    padding: "3px 10px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* GitHub icon */}
            <Github size={16} color="#8a8a8a" />
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Work() {
  return (
    <SectionWrapper id="work">
      <section
        style={{
          padding: "80px clamp(24px, 5vw, 64px)",
          background: "var(--bg)",
        }}
      >
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
          [ Work ]
        </p>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            color: "var(--text-primary)",
            marginBottom: 32,
          }}
        >
          Selected Projects
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: 20,
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
