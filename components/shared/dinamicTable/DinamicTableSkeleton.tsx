import { motion } from "framer-motion";

export function DinamicTableSkeleton() {
  const rowCount = 4;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full"
    >
      {/* HEADER */}
      <div className="w-full py-8 bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />

      {/* BODY */}
      {Array.from({ length: rowCount }).map((_, i) => (
        <div
          className={`w-full py-10 ${i % 2 !== 0 ? "bg-linear-to-r from-neutral-100 via-neutral-50 to-neutral-100 bg-skeleton-gradient" : "bg-white"}`}
          key={i}
        />
      ))}
    </motion.div>
  );
}
