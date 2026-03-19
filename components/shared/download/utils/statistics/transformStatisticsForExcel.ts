/* TYPES */
import { StatisticsObject } from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";

export function transformStatisticsForExcel(
  statisticsObject: StatisticsObject,
): string[][] {
  const rows: string[][] = [];

  const eolaCount = statisticsObject.discontentReports.eolaCount;
  const ncrCount = statisticsObject.discontentReports.ncrCount;
  const racCount = statisticsObject.discontentReports.racCount;

  const baldwinStatePositive =
    statisticsObject.auditReports.baldwinState.positive;
  const baldwinStateNegative =
    statisticsObject.auditReports.baldwinState.negative;
  const baldwinStateTotal = baldwinStatePositive + baldwinStateNegative;

  const baldwinReserveSupplyPositive =
    statisticsObject.auditReports.baldwinReserveSupply.positive;
  const baldwinReserveSupplyNegative =
    statisticsObject.auditReports.baldwinReserveSupply.negative;
  const baldwinReserveSupplyTotal =
    baldwinReserveSupplyPositive + baldwinReserveSupplyNegative;

  const baldwinReserveStackingPositive =
    statisticsObject.auditReports.baldwinReserveStacking.positive;
  const baldwinReserveStackingNegative =
    statisticsObject.auditReports.baldwinReserveStacking.negative;
  const baldwinReserveStackingTotal =
    baldwinReserveStackingNegative + baldwinReserveStackingPositive;

  const baldwinReservePackingPositive =
    statisticsObject.auditReports.baldwinReservePacking.positive;
  const baldwinReservePackingNegative =
    statisticsObject.auditReports.baldwinReservePacking.negative;
  const baldwinreservePackingTotal =
    baldwinReservePackingPositive + baldwinReservePackingNegative;

  const baldwinReserveGeneralPositive =
    statisticsObject.auditReports.baldwinReserveGeneral.positive;
  const baldwinReserveGeneralNegative =
    statisticsObject.auditReports.baldwinReserveGeneral.negative;
  const baldwinReserveGeneralTotal =
    baldwinReserveGeneralPositive + baldwinReserveGeneralNegative;

  const displayAreaPositive =
    statisticsObject.auditReports.displayArea.positive;
  const displayAreaNegative =
    statisticsObject.auditReports.displayArea.negative;
  const displayAreaTotal = displayAreaPositive + displayAreaNegative;

  const pizzaTrayPositive = statisticsObject.auditReports.pizzaTray.positive;
  const pizzaTrayNegative = statisticsObject.auditReports.pizzaTray.negative;
  const pizzaTrayTotal = pizzaTrayPositive + pizzaTrayNegative;

  console.log(statisticsObject);

  rows.push(["Estadísticas de Marzo", ""]);

  rows.push([""]);

  rows.push(["Estado", "", ""]);
  rows.push(["Aceptable", "Regular", "Malo"]);

  rows.push([""]);

  rows.push(["Reportes de Inconformidad", "", "", ""]);
  rows.push([
    "Reportes",
    "EOLA",
    "Reporte de Producto no Conforme",
    "Requerimiento de Acción Correctiva",
  ]);
  rows.push(["Total", eolaCount.toString(), ncrCount.toString(), racCount.toString()]);

  rows.push([""]);

  rows.push(["Reportes de Auditorías", "", "", "", "", "", "", ""]);
  rows.push([
    "Reportes",
    "Baldwin State",
    "Baldwin Reserve Supply",
    "Baldwin Reserve Stacking",
    "Baldwin Reserve Packing",
    "Baldwin Reserve General",
    "Display Area",
    "Pizza Tray",
  ]);
  rows.push([
    "Positivos",
    baldwinStatePositive.toString(),
    baldwinReserveSupplyPositive.toString(),
    baldwinReserveStackingPositive.toString(),
    baldwinReservePackingPositive.toString(),
    baldwinReserveGeneralPositive.toString(),
    displayAreaPositive.toString(),
    pizzaTrayPositive.toString(),
  ]);
  rows.push([
    "Negativos",
    baldwinStateNegative.toString(),
    baldwinReserveSupplyNegative.toString(),
    baldwinReserveStackingNegative.toString(),
    baldwinReservePackingNegative.toString(),
    baldwinReserveGeneralNegative.toString(),
    displayAreaNegative.toString(),
    pizzaTrayNegative.toString(),
  ]);
  rows.push([
    "Total",
    baldwinStateTotal.toString(),
    baldwinReserveSupplyTotal.toString(),
    baldwinReserveStackingTotal.toString(),
    baldwinreservePackingTotal.toString(),
    baldwinReserveGeneralTotal.toString(),
    displayAreaTotal.toString(),
    pizzaTrayTotal.toString(),
  ]);

  console.log(rows);

  return rows;
}
