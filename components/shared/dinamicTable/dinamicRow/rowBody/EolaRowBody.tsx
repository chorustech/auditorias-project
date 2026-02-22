"use client";

import { ReportType } from "@/temp/serverActionSimulado";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";

export function EolaRowBody({ report }: { report: ReportType }) {
  const router = useRouter();

  return (
    <>
      {report.kind === "eola" ? (
        <>
          <td className="px-2 py-6 whitespace-nowrap">
            <motion.div
              onClick={() =>
                router.push(`/reports/eola/update/${report.data.numOrden}`)
              }
              className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-blue-100"
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <SquarePen className="size-5 text-yellow-600" />
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
              <Trash2 className="size-5 text-red-600" />
            </motion.div>
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.numOrden}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.auditor}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.fecha}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.semana}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.uniNegocio}
          </td>
          <td className="px-3 py-6 text-left whitespace-nowrap">
            {report.data.linea}
          </td>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
