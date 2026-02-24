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
  disabled,
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
  disabled: boolean;
}) {
  return (
    <motion.button
      className={`flex items-center justify-center gap-2 ${twClassName}`}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.05,
              backgroundColor: backgroundColorHover,
              color: textColorHover,
              border: borderHover,
            }
      }
      whileTap={disabled ? {} : { scale: 0.9 }}
      transition={
        disabled
          ? {}
          : {
              type: "spring",
              stiffness: 300,
              damping: 20,
              backgroundColor: { duration: 0.3 },
              color: { duration: 0.3 },
            }
      }
      style={
        disabled
          ? {
              backgroundColor: "#e5e5e5",
              color: "#a3a3a3",
              border: "2px solid #ffffff",
            }
          : {
              backgroundColor: backgroundColor,
              color: textColor,
              border: border,
              cursor: "pointer"
            }
      }
      onClick={disabled ? () => {} : action}
    >
      {children}
    </motion.button>
  );
}
