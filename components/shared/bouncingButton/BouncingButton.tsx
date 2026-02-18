"use client";

import { motion } from "framer-motion";

export function BouncingButton({
  children,
  action,
  backgroundColor,
  backgroundColorHover,
  textColor,
  textColorHover,
  border,
  borderHover,
  twClassName,
}: {
  children: React.ReactNode;
  action: () => void;
  backgroundColor: string;
  backgroundColorHover: string;
  textColor: string;
  textColorHover: string;
  border: string;
  borderHover: string;
  twClassName: string;
}) {
  return (
    <motion.button
      className={`flex items-center justify-center gap-2 cursor-pointer ${twClassName}`}
      whileHover={{
        scale: 1.05,
        backgroundColor: backgroundColorHover,
        color: textColorHover,
        border: borderHover,
      }}
      whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        backgroundColor: { duration: 0.3 },
        color: { duration: 0.3 },
      }}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        border: border,
      }}
      onClick={action}
    >
      {children}
    </motion.button>
  );
}
