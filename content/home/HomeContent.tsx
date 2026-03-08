"use client";

import { motion } from "framer-motion";

export function HomeContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="p-4 h-full w-full"
    >
      <p>Esta es la página de inicio</p>
    </motion.div>
  );
}
