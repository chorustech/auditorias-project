"use client";

import { useEffect, useState } from "react";
import { getReports, ReportData } from "@/temp/serverActionSimulado";
import { DinamicTableSkeleton } from "./DinamicTableSkeleton";
import { motion } from "framer-motion";
import { generalReportDinamicTableColumns as data } from "@/content/reports/data/columns/generalReportDinamicTableColumns";
import { DinamicRow } from "./dinamicRow/DinamicRow";
import { DinamicTableFooter } from "./DinamicTableFooter";
import { usePathname } from "next/navigation";
import { isPointerArea } from "@/utils/pointerArea";

export function DinamicTableBody() {
  const [reports, setReports] = useState<ReportData>({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;

  useEffect(() => {
    const fetchReports = async () => {
      if (!path) return;
      if (!isPointerArea(path)) return;

      const data = await getReports({
        pointer: path,
      });

      setReports(data);
      setLoading(false);
    };

    fetchReports();
  }, [path]);

  return (
    <>
      {/* BODY */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex-1 px-6 pb-6 overflow-y-auto"
      >
        <div className="relative w-full h-full overflow-x-auto overflow-y-auto">
          {loading ? (
            <DinamicTableSkeleton />
          ) : reports.count === 0 ? (
            <p>No se encontró información</p>
          ) : (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <table className="w-full table-auto">
                <thead className="sticky top-0 rounded-lg z-20">
                  <tr className="rounded-lg bg-neutral-100 relative">
                    {data[path ?? ""].map((column, index) => (
                      <th
                        key={index}
                        className={`font-medium py-4 text-left text-blue-950 ${
                          column === ""
                            ? "px-0 bg-neutral-100 sticky right-0 whitespace-nowrap"
                            : "px-3"
                        }`}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {reports.data.map((report, index) => (
                    <DinamicRow key={index} index={index} report={report} />
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* FOOTER */}
      <DinamicTableFooter loading={loading} count={reports.count} />
    </>
  );
}
