"use client";

import { motion } from "framer-motion";
import { ReportCard } from "./ReportCard";
import Link from "next/link";
import { links } from "@/content/reports/data/links/links";
import { useState } from "react";

export function ReportCardList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLinks = links[1].subLinks.filter((link) =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full max-h-full overflow-y-auto scrollbar-custom">
      <div className="grid grid-cols-1 p-4 gap-6 overflow-hidden md:grid-cols-3 lg:grid-cols-5">
        {filteredLinks.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {info.state === "" ? (
              <Link href={`reports/${info.href}`}>
                <ReportCard
                  info={{
                    title: info.title,
                    Icon: info.Icon,
                    state: info.state,
                    href: "",
                  }}
                />
              </Link>
            ) : (
              <ReportCard
                info={{
                  title: info.title,
                  Icon: info.Icon,
                  state: info.state,
                  href: "",
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
