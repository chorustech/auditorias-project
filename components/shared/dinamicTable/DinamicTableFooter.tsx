"use client";

import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { BouncingButton } from "../bouncingButton/BouncingButton";
import { motion } from "framer-motion";

export function DinamicTableFooter({
  loading,
  count,
  type,
  goNext,
  goBack,
  goBackAction,
  goNextAction,
  pageFirstHalf,
  pageSecondHalf,
}: {
  loading: boolean;
  count: number;
  type: string;
  goNext: boolean;
  goBack: boolean;
  goBackAction: () => void;
  goNextAction: () => void;
  pageFirstHalf: React.ReactNode;
  pageSecondHalf: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col justify-center items-center p-6 lg:justify-between md:justify-between lg:flex-row md:flex-row"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex gap-2 items-center">
        <p>Total:</p>
        {loading ? (
          <Loader className="size-4 animate-spin text-[#00A0D0]" />
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <span className="text-[#00A0D0] font-semibold mr-2">{count}</span>
            <span>{type}</span>
            <span>{count >= 1 && "s"}</span>
          </motion.p>
        )}
      </div>
      <div className="flex gap-4">
        <BouncingButton
          action={goBackAction}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit px-4 py-2 rounded-xl"
          disabled={loading ? true : goBack ? false : true}
        >
          <ChevronLeft className="size-5" />
          <p>Anterior</p>
        </BouncingButton>
        <BouncingButton
          action={goNextAction}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit px-4 py-2 rounded-xl"
          disabled={loading ? true : goNext ? false : true}
        >
          <p>Siguiente</p>
          <ChevronRight className="size-5" />
        </BouncingButton>
      </div>
      <div className="flex items-center gap-2">
        <p>Página:</p>
        {loading ? (
          <Loader className="size-4 animate-spin text-[#00A0D0]" />
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {pageFirstHalf}
          </motion.p>
        )}
        <p>de</p>
        {loading ? (
          <Loader className="size-4 animate-spin text-[#00A0D0]" />
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {pageSecondHalf}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
