"use client";

import { ReportType } from "@/temp/serverActionSimulado";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";

export function NcrRowBody({ report }: { report: ReportType }) {
  const router = useRouter();

  return (
    <>
      {report.kind === "ncr" ? (
        <>
          <td className="px-2 py-6 whitespace-nowrap">
            <motion.div
              onClick={() =>
                router.push(`/reports/ncr/update/${report.data.numNcr}`)
              }
              className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-blue-100"
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <SquarePen className="size-6 text-yellow-600" />
            </motion.div>
          </td>
          <td className="pr-2 py-6 whitespace-nowrap">
            <motion.div
              onClick={() => /* openEditDeleteModal(
                              dato.usuario.id,
                              dato,
                              "ELIMINAR",
                            ) */ {}}
              className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-red-100"
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <Trash2 className="size-6 text-red-600" />
            </motion.div>
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.numNcr}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.fecha}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.semana}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.numParte}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.proveedor}
          </td>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
