"use client";

import { DinamicTableSkeleton } from "./DinamicTableSkeleton";
import { motion } from "framer-motion";

export function DinamicTableBody({
  theadColumns,
  tbodyRows,
  loading,
  count,
  type,
}: {
  theadColumns: React.ReactNode;
  tbodyRows: React.ReactNode;
  loading: boolean;
  count: number;
  type: string;
}) {
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
          ) : count === 0 ? (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              No se encontraron {type}s
            </motion.p>
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
                    {theadColumns}
                  </tr>
                </thead>
                <tbody className="bg-white">{tbodyRows}</tbody>
              </table>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
