"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export function SquareButton({
  action,
  Icon,
  rotate,
  color,
  hoverColor,
}: {
  action: () => void;
  Icon: LucideIcon;
  rotate: boolean;
  color: string;
  hoverColor: string;
}) {
  return (
    <motion.button
      onClick={action}
      className={`p-4 rounded-2xl hover:cursor-pointer`}
      style={{
        backgroundColor: color,
      }}
      whileHover={{ scale: 1.05, backgroundColor: hoverColor }}
      whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Controla la velocidad y suavidad del efecto
    >
      <Icon className={`size-5 text-white ${rotate && "rotate-90"}`} />
    </motion.button>
  );
}
