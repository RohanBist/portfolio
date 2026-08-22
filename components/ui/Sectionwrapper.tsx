"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SectionWrapper({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ overflow: "visible" }}
    >
      {children}
    </motion.div>
  );
}