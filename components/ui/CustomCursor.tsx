"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

const x = useSpring(rawX, {
  stiffness: 1000,
  damping: 45,
  mass: 0.25,
});

const y = useSpring(rawY, {
  stiffness: 1000,
  damping: 45,
  mass: 0.25,
});

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovered(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("a") &&
        !target.closest("button") &&
        !target.closest("[data-cursor-hover]")
      ) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [rawX, rawY, visible]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: x,
        top: y,
        zIndex: 99999,
        pointerEvents: "none",
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={
          hovered
            ? {
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: "1.5px solid var(--accent)",
                opacity: visible ? 1 : 0,
              }
            : {
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "var(--text-primary)",
                border: "none",
                opacity: visible ? 1 : 0,
              }
        }
        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </motion.div>
  );
}
