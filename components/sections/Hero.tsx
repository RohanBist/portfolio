"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { personal } from "@/lib/data";

const ease = [0.25, 0.1, 0.25, 1] as const;

const socialEntries = Object.entries(personal.socials) as [
  keyof typeof personal.socials,
  string
][];

const socialLabels: Record<keyof typeof personal.socials, string> = {
  github: "GitHub",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);

  

  const [targetTransform, setTargetTransform] = useState({
    x: 0,
    y: 0,
    scale: 0.55,
  });


  useEffect(() => {
  let frame = 0;

  const calculateTarget = () => {
    cancelAnimationFrame(frame);

    frame = requestAnimationFrame(() => {
      const heroEl = heroPhotoRef.current;
      const aboutEl =
        document.getElementById("about-photo-slot");

      if (!heroEl || !aboutEl) return;

      const heroRect =
        heroEl.getBoundingClientRect();

      const aboutRect =
        aboutEl.getBoundingClientRect();

      if (
        heroRect.width <= 0 ||
        heroRect.height <= 0 ||
        aboutRect.width <= 0 ||
        aboutRect.height <= 0
      ) {
        return;
      }

      /*
       * Both getBoundingClientRect() values use the
       * same viewport coordinate system.
       *
       * Therefore we calculate the difference directly.
       */

      const heroCenterX =
        heroRect.left + heroRect.width / 2;

      const heroCenterY =
        heroRect.top + heroRect.height / 2;

      const aboutCenterX =
        aboutRect.left + aboutRect.width / 2;

      const aboutCenterY =
        aboutRect.top + aboutRect.height / 2;

      const x =
        aboutCenterX - heroCenterX;

      const y =
        aboutCenterY - heroCenterY;

      const scale =
        aboutRect.width / heroRect.width;

      if (
        !Number.isFinite(x) ||
        !Number.isFinite(y) ||
        !Number.isFinite(scale) ||
        scale <= 0
      ) {
        return;
      }

      setTargetTransform({
        x,
        y,
        scale,
      });
    });
  };

  /*
   * Initial calculation.
   */
  calculateTarget();

  /*
   * Recalculate after layout settles.
   */
  const timer1 = setTimeout(
    calculateTarget,
    100
  );

  const timer2 = setTimeout(
    calculateTarget,
    500
  );

  const timer3 = setTimeout(
    calculateTarget,
    1000
  );

  /*
   * Recalculate when browser size changes.
   */
  window.addEventListener(
    "resize",
    calculateTarget
  );

  window.addEventListener(
    "orientationchange",
    calculateTarget
  );

  window.addEventListener(
    "load",
    calculateTarget
  );

  /*
   * Watch the actual About box.
   */
  const aboutEl =
    document.getElementById("about-photo-slot");

  const resizeObserver =
    new ResizeObserver(calculateTarget);

  if (aboutEl) {
    resizeObserver.observe(aboutEl);
  }

  if (heroPhotoRef.current) {
    resizeObserver.observe(
      heroPhotoRef.current
    );
  }

  return () => {
    cancelAnimationFrame(frame);

    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);

    window.removeEventListener(
      "resize",
      calculateTarget
    );

    window.removeEventListener(
      "orientationchange",
      calculateTarget
    );

    window.removeEventListener(
      "load",
      calculateTarget
    );

    resizeObserver.disconnect();
  };
}, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /*
   * Desktop:
   * Hero → About photo transition.
   *
   * Small screens:
   * No cross-page flight.
   */
 const photoX = useTransform(
  scrollYProgress,
  [0, 0.85],
  [0, targetTransform.x]
);

const photoY = useTransform(
  scrollYProgress,
  [0, 0.85],
  [0, targetTransform.y]
);

const photoScale = useTransform(
  scrollYProgress,
  [0, 0.85],
  [1, targetTransform.scale]
);

const photoRadius = useTransform(
  scrollYProgress,
  [0.2, 0.85],
  [0, 24]
);

  return (
   <section
  ref={heroRef}
  className="hero-section"
  style={{
    position: "relative",
    width: "100%",
    height: "100svh",
    minHeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg)",
    paddingTop: 72,
  }}
>
      {/* Background typography */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2em",
            whiteSpace: "nowrap",
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: "-40vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease,
            }}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(20px, 11vw, 260px)",
              color: "var(--text-primary)",
              opacity: 0.88,
              letterSpacing: "0.10em",
              lineHeight: 1,
            }}
          >
            SOFTWARE
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: "40vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease,
            }}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(20px, 11vw, 260px)",
              color: "var(--text-primary)",
              opacity: 0.88,
              letterSpacing: "0.10em",
              lineHeight: 1,
            }}
          >
            DEV
          </motion.span>
        </div>
      </div>

      {/* Gold glow */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* 
        IMPORTANT:
        This is now a REAL measurable anchor.
        The aspect ratio gives it a real width,
        so heroRect.width cannot collapse to 0.
      */}
      <div
        ref={heroPhotoRef}
        className="hero-photo-anchor"
        style={{
          position: "relative",
          zIndex: 3,
pointerEvents: "none",
          height: "clamp(380px, 65vh, 780px)",
          aspectRatio: "3 / 4",
          width: "auto",
          flex: "0 0 auto",
        }}
      >
        <motion.div
          className="hero-photo"
          initial={{
            opacity: 0,
            y: "30vh",
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.5,
            ease,
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            x: photoX,
            y: photoY,
            scale: photoScale,
            transformOrigin: "center center",
          }}
        >
          <motion.div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              aspectRatio: "3 / 4",
              borderRadius: photoRadius,
              
              WebkitMaskImage:
                "linear-gradient(to bottom, black 70%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 70%, transparent 100%)",
            }}
          >
            <Image
              src="/images/photo.png"
              alt={personal.name}
              fill
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center top",
              }}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 55vw, 40vw"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
      className="hero-bottom-bar"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
pointerEvents: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding:
            "0 clamp(24px, 5vw, 64px) clamp(65px, 9vw, 105px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.7,
            ease,
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 500,
              fontSize: 24,
              color: "var(--text-primary)",
              letterSpacing: "0.05em",
            }}
          >
            {personal.name}
          </span>

          {personal.available && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: 12,
                color: "var(--text-body)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <PulsingDot />
              Available for work
            </span>
          )}
        </motion.div>

        <div
  className="hero-socials"
  style={{
    display: "flex",
    gap: "clamp(12px, 4vw, 24px)",
    alignItems: "center",
  }}
>
  {socialEntries.map(([key, href], i) => (
    <motion.a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.75 + i * 0.08,
        ease,
      }}
      style={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 300,
        fontSize: 13,
        color: "var(--text-primary)",
        textDecoration: "none",
        position: "relative",
        paddingBottom: 2,
      }}
      className="social-link"
    >
      {socialLabels[key]}
    </motion.a>
  ))}
</div>
      </div>
    </section>
  );
}

function PulsingDot() {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        width: 8,
        height: 8,
      }}
    >
      <motion.span
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />

      <span
        style={{
          position: "relative",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--accent)",
          display: "block",
        }}
      />
    </span>
  );
}