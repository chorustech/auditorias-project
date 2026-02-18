"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export function SquareButton({
  action,
  Icon,
  rotate,
  color,
}: {
  action: () => void;
  Icon: LucideIcon;
  rotate: boolean;
  color: string;
}) {
  return (
    <motion.button
      onClick={action}
      className={`p-4 rounded-2xl hover:cursor-pointer ${color}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Controla la velocidad y suavidad del efecto
    >
      <Icon className={`size-4 text-white ${rotate && "rotate-90"}`} />
    </motion.button>
  );
}
