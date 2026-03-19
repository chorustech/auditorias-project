"use client";

import { motion } from "framer-motion";
import { Grafic } from "@/content/home/components/main/grafic/Grafic";
import { TrafficLights } from "@/content/home/components/main/trafficLights/TrafficLights";
import { useState, useEffect } from "react";
/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { selectStatisticsObject } from "@/temp/Reports/Infrastructure/reportsController";
import { Skeleton } from "@/content/home/components/main/skeleton/Skeleton";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { useModal } from "@/stores/modal/modalStore";
import { Download } from "lucide-react";
import { DownloadStatisticsModalContent } from "@/content/home/components/download/DownloadStatisticsModalContent";

export function HomeContent() {
  const { setAnnouncement } = useAnnouncement();
  const { setModal } = useModal();

  const [loading, setLoading] = useState(false);

  const [discontentReports, setDiscontentReports] = useState<
    { name: string; count: number }[]
  >([]);

  const [auditReports, setAuditReports] = useState<
    { report: string; positive: number; negative: number }[]
  >([]);

  useEffect(() => {
    try {
      const fetchStatisticsObject = async () => {
        setLoading(true);

        const month = new Date().getMonth();
        const response = await selectStatisticsObject({ month });

        if (response.ok) {
          const newDiscontentReports: { name: string; count: number }[] = [];

          newDiscontentReports.push({
            name: "EOLA",
            count: response.statisticsObject.discontentReports.eolaCount,
          });
          newDiscontentReports.push({
            name: "Reporte de Producto no Conforme",
            count: response.statisticsObject.discontentReports.ncrCount,
          });
          newDiscontentReports.push({
            name: "Requerimiento de Acción Correctiva",
            count: response.statisticsObject.discontentReports.racCount,
          });

          setDiscontentReports(newDiscontentReports);

          const newAuditReports: {
            report: string;
            positive: number;
            negative: number;
          }[] = [];

          newAuditReports.push({
            report: "Baldwin State",
            negative:
              response.statisticsObject.auditReports.baldwinState.negative,
            positive:
              response.statisticsObject.auditReports.baldwinState.positive,
          });

          newAuditReports.push({
            report: "Baldwin Reserve Supply",
            negative:
              response.statisticsObject.auditReports.baldwinReserveSupply
                .negative,
            positive:
              response.statisticsObject.auditReports.baldwinReserveSupply
                .positive,
          });

          newAuditReports.push({
            report: "Baldwin Reserve Packing",
            negative:
              response.statisticsObject.auditReports.baldwinReservePacking
                .negative,
            positive:
              response.statisticsObject.auditReports.baldwinReservePacking
                .positive,
          });

          newAuditReports.push({
            report: "Baldwin Reserve Stacking",
            negative:
              response.statisticsObject.auditReports.baldwinReserveStacking
                .negative,
            positive:
              response.statisticsObject.auditReports.baldwinReserveStacking
                .positive,
          });

          newAuditReports.push({
            report: "Baldwin Reserve General",
            negative:
              response.statisticsObject.auditReports.baldwinReserveGeneral
                .negative,
            positive:
              response.statisticsObject.auditReports.baldwinReserveGeneral
                .positive,
          });

          newAuditReports.push({
            report: "Display Area",
            negative:
              response.statisticsObject.auditReports.displayArea.negative,
            positive:
              response.statisticsObject.auditReports.displayArea.positive,
          });

          newAuditReports.push({
            report: "Pizza Tray",
            negative: response.statisticsObject.auditReports.pizzaTray.negative,
            positive: response.statisticsObject.auditReports.pizzaTray.positive,
          });

          setAuditReports(newAuditReports);

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
          className="pb-4 lg:pb-0 flex flex-col w-full h-full"
        >
          <div className="w-full h-fit">
            <div className="flex justify-between items-center flex-col lg:flex-row gap-4 mb-4">
              <h2 className="text-4xl font-light text-center lg:text-left">
                ¡Hola,{" "}
                <span className="font-medium text-[#00A0D0]">
                  Pirita Dreemurr
                </span>
                !
              </h2>

              <BouncingButton
                action={() =>
                  setModal({
                    isActivated: true,
                    title: "Descargar Estadísticas",
                    body: <DownloadStatisticsModalContent />,
                  })
                }
                backgroundColorHover="#ffffff"
                backgroundColor="#22c55e"
                textColor="#ffffff"
                textColorHover="#22c55e"
                border="2px solid #ffffff"
                borderHover="2px solid #22c55e"
                twClassName="w-fit h-fit py-2 px-4 rounded-2xl"
                disabled={false}
              >
                <>
                  <Download className="size-4" />
                  <p>Descargar estadísticas</p>
                </>
              </BouncingButton>
            </div>

            <h2 className="mb-4 font-light text-lg text-neutral-500">
              Reportes de Inconformidad del Mes
            </h2>
            <TrafficLights trafficLightsObject={discontentReports} />

            <h2 className="mb-4 font-light text-lg text-neutral-500">
              Reportes de Auditoría del Mes
            </h2>
          </div>

          <div className="lg:flex-1">
            <Grafic discontentObject={auditReports} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
