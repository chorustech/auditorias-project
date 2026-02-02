"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { links } from "@/data/links";
import { ReportLink } from "@/components/reports/ReportLink";

export function ReportLinkList() {
  const reports = links.find((link) => link.title === "Reportes");
  const [open, setOpen] = useState(false);

  if (!reports) return null;

  const reserveLinks = reports.subLinks.filter((sub) =>
    sub.title.includes("Reserve"),
  );

  const firstReserveIndex = reports.subLinks.findIndex((sub) =>
    sub.title.includes("Reserve"),
  );
  return (
    <div className="flex flex-col gap-4">
      {reports.subLinks.map((sub, index) => {
        const isReserve = sub.title.includes("Reserve");
        const shouldRenderAccordion = index === firstReserveIndex;

        if (isReserve && !shouldRenderAccordion) return null;

        return (
          <div key={sub.href} className="flex flex-col gap-1 w-1/2">
            {shouldRenderAccordion && (
              <div className="flex flex-col hover:bg-[#d9f2f9] rounded-xl transition shadow">
                <button
                  onClick={() => setOpen((p) => !p)}
                  className={`px-4 py-2 rounded-xl transition flex items-center justify-between`}
                >
                  <span>Baldwin Reserve</span>
                  <ChevronDown
                    className={`text-cyan-800 w-4 h-4 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 px-4 pb-2" : "max-h-0 px-0 pb-0"}`}
                >
                  <div className="flex flex-col gap-1 py-1">
                    {reserveLinks.map((sub) => (
                      <ReportLink
                        key={sub.href}
                        href={`${reports.href}${sub.href}`}
                        title={`${sub.accordionTitle}`}
                        customStyle="hover:bg-neutral-50"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!isReserve && (
              <ReportLink
                href={`${reports.href}${sub.href}`}
                title={`${sub.title}`}
                customStyle="hover:bg-[#d9f2f9] shadow"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
