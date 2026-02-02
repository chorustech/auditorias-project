"use client";

import { motion } from "framer-motion";
import { ReportCard } from "./ReportCard";
import Link from "next/link";
import { links } from "@/data/links";

export function ReportCardList() {
  return (
    <div className="w-full max-h-full overflow-y-auto scrollbar-custom">
      <div className="grid grid-cols-1 p-4 gap-6 overflow-hidden md:grid-cols-3 lg:grid-cols-5">
        {links[1].subLinks.map((info, index) => (
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
                    accordionTitle: "",
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
                  accordionTitle: "",
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
