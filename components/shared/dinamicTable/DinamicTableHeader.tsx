"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* ICONS */
import { SlidersHorizontal, Plus } from "lucide-react";

/* LIBS */
import { motion } from "framer-motion";

export function DinamicTableHeader({
  backAction,
  filterAction,
  addAction,
  excelButtonContent,
  backContent,
}: {
  backAction: () => void;
  filterAction: () => void;
  addAction: () => void;
  excelButtonContent: React.ReactNode;
  backContent: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col items-center p-6 justify-between gap-4 lg:flex-row md:flex-row"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-center w-full gap-4 lg:justify-normal md:justify-normal">
        {/* BOTÓN IR HACIA ATRÁS */}
        <BouncingButton
          action={backAction}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit p-4 rounded-2xl"
          disabled={false}
        >
          {backContent}
        </BouncingButton>

        {/* BOTÓN FILTRAR */}
        <BouncingButton
          action={filterAction}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit p-4 rounded-2xl"
          disabled={false}
        >
          <SlidersHorizontal className="size-5" />
        </BouncingButton>
      </div>

      <div className="flex justify-between w-full gap-4 lg:justify-end md:justify-end">
        {/* BOTÓN AGREGAR */}
        <BouncingButton
          action={addAction}
          backgroundColorHover="#ffffff"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit p-4 rounded-2xl"
          disabled={false}
        >
          <Plus className="size-5" />
        </BouncingButton>

        {/* BOTÓN EXPORTAR EXCEL */}
        {excelButtonContent}
      </div>
    </motion.div>
  );
}
