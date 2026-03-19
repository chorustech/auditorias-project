"use client";

import { motion } from "framer-motion";
import { Grafic } from "@/content/home/components/main/grafic/Grafic";
import { TrafficLights } from "@/content/home/components/main/trafficLights/TrafficLights";
import { useState, useEffect } from "react";
/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { StatisticsObject } from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { selectStatisticsObject } from "@/temp/Reports/Infrastructure/reportsController";
import { Skeleton } from "@/content/home/components/skeleton/Skeleton";

export function HomeContent() {
  const { setAnnouncement } = useAnnouncement();

  const [loading, setLoading] = useState(false);
  const [statisticsObject, setStatisticsObject] = useState<StatisticsObject>({
    auditReports: [],
    discontentReports: [],
  });

  useEffect(() => {
    try {
      const fetchStatisticsObject = async () => {
        setLoading(true);

        const response = await selectStatisticsObject();

        if (response.ok) {
          setStatisticsObject(response.statisticsObject);
          setLoading(false);
        } else {
          setAnnouncement({
            isActivated: true,
            isOk: false,
            message: response.message,
          });
          setLoading(false);
        }
      };

      fetchStatisticsObject();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [setAnnouncement]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="p-6 h-full w-full"
    >
      {loading ? (
        <Skeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="pb-4"
        >
          <h2 className="text-4xl font-light mb-4">
            ¡Hola,{" "}
            <span className="font-medium text-[#00A0D0]">Pirita Dreemurr</span>!
          </h2>
          
          <h2 className="mb-4 font-light text-lg text-neutral-500">
            Reportes de Inconformidad del Mes
          </h2>
          <TrafficLights
            trafficLightsObject={statisticsObject.discontentReports}
          />

          <h2 className="mb-4 font-light text-lg text-neutral-500">
            Reportes de Auditoría del Mes
          </h2>
          <Grafic discontentObject={statisticsObject.auditReports} />
        </motion.div>
      )}
    </motion.div>
  );
}
