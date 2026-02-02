"use client";

import { motion } from "framer-motion";
import { Construction, PencilRuler } from "lucide-react";
import { SubLink } from "@/components/reports/types/Report";

export function ReportCard({ info }: { info: SubLink }) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-between h-full p-6 text-center rounded-2xl ${
        info.state === ""
          ? "bg-linear-to-br from-[#00A0D0] via-[#64C8E6] to-[#00A0D0] bg-animated-gradient"
          : "bg-neutral-300 relative"
      }`}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={
        info.state === ""
          ? { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }
          : {}
      }
      whileTap={info.state === "" ? { scale: 0.9 } : {}}
    >
      <info.Icon className="text-white size-16" />
      <h3 className="mt-3 text-white font-semibold">{info.title}</h3>
      {info.state !== "" && (
        <div
          className="bg-neutral-300/50 absolute w-full h-full top-0 rounded-2xl flex items-center"
          style={{
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            className={`w-full h-fit flex items-center justify-center flex-col gap-2 shadow-lg py-2 ${info.state === "construction" ? "bg-yellow-200" : "bg-orange-200"}`}
          >
            {info.state === "construction" ? (
              <PencilRuler className="size-6 text-yellow-600" />
            ) : (
              <Construction className="size-6 text-orange-600" />
            )}
            <p
              className={`text-sm ${info.state === "construction" ? "text-yellow-600" : "text-orange-600"}`}
            >
              {info.state === "construction"
                ? "EN CONSTRUCCIÓN"
                : "EN MANTENIMIENTO"}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
