"use client";

/* COMPONENTS */
import { DinamicInsertUpdateUIHeader } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUIHeader";
import { DinamicInsertUpdateBody } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUIBody";

/* LIBS */
import { motion } from "framer-motion";

export function DinamicInsertUpdateUI({
  backAction,
  headerRightContent,
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
}: {
  backAction: () => void;
  headerRightContent: React.ReactNode;
  leftTitle: string;
  rightTitle: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  return (
    <motion.div
      className="w-full h-full p-6 max-h-full flex flex-col gap-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* HEADER */}
      <DinamicInsertUpdateUIHeader
        backAction={backAction}
        rightContent={headerRightContent}
      />

      {/* BODY */}
      <DinamicInsertUpdateBody
        leftTitle={leftTitle}
        rightTitle={rightTitle}
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </motion.div>
  );
}
