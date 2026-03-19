/* DATA */
import {
  mainOddStyles,
  titleStyles,
  sentenceWhileTrueStyles,
  sentenceWhileRegularStyles,
  sentenceWhileFalseStyles,
  sentenceWhileTruePaleStyles,
  sentenceWhileRegularPaleStyles,
  sentenceWhileFalsePaleStyles,
} from "@/components/shared/download/data/shared/mainStyles";

/* LIBS */
import * as XLSX from "xlsx-js-style";

/* TYPES */
import { StatisticsObject } from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { StyleObject } from "@/components/shared/download/types/shared/styleObject";

export function setColumnsStyles(
  worksheet: XLSX.WorkSheet,
  statisticsObject: StatisticsObject,
): XLSX.WorkSheet {
  const eolaCount = statisticsObject.discontentReports.eolaCount;
  const ncrCount = statisticsObject.discontentReports.ncrCount;
  const racCount = statisticsObject.discontentReports.racCount;

  const baldwinStateNegative =
    statisticsObject.auditReports.baldwinState.negative;

  const baldwinReserveSupplyNegative =
    statisticsObject.auditReports.baldwinReserveSupply.negative;

  const baldwinReserveStackingNegative =
    statisticsObject.auditReports.baldwinReserveStacking.negative;

  const baldwinReservePackingNegative =
    statisticsObject.auditReports.baldwinReservePacking.negative;

  const baldwinReserveGeneralNegative =
    statisticsObject.auditReports.baldwinReserveGeneral.negative;

  const displayAreaNegative =
    statisticsObject.auditReports.displayArea.negative;

  const pizzaTrayNegative = statisticsObject.auditReports.pizzaTray.negative;

  worksheet["A1"].s = titleStyles;

  worksheet["A3"].s = mainOddStyles;
  worksheet["A4"].s = sentenceWhileTrueStyles;
  worksheet["B4"].s = sentenceWhileRegularStyles;
  worksheet["C4"].s = sentenceWhileFalseStyles;

  worksheet["A6"].s = mainOddStyles;

  worksheet["A7"].s = mainOddStyles;
  worksheet["A8"].s = mainOddStyles;

  worksheet["B7"].s = getStyle(eolaCount, false);
  worksheet["B8"].s = getStyle(eolaCount, true);

  worksheet["C7"].s = getStyle(ncrCount, false);
  worksheet["C8"].s = getStyle(ncrCount, true);

  worksheet["D7"].s = getStyle(racCount, false);
  worksheet["D8"].s = getStyle(racCount, true);

  worksheet["A10"].s = mainOddStyles;

  worksheet["A11"].s = mainOddStyles;
  worksheet["A12"].s = mainOddStyles;
  worksheet["A13"].s = mainOddStyles;
  worksheet["A14"].s = mainOddStyles;

  worksheet["B11"].s = getStyle(baldwinStateNegative, false);
  worksheet["B12"].s = getStyle(baldwinStateNegative, true);
  worksheet["B13"].s = getStyle(baldwinStateNegative, true);
  worksheet["B14"].s = getStyle(baldwinStateNegative, true);

  worksheet["C11"].s = getStyle(baldwinReserveSupplyNegative, false);
  worksheet["C12"].s = getStyle(baldwinReserveSupplyNegative, true);
  worksheet["C13"].s = getStyle(baldwinReserveSupplyNegative, true);
  worksheet["C14"].s = getStyle(baldwinReserveSupplyNegative, true);

  worksheet["D11"].s = getStyle(baldwinReserveStackingNegative, false);
  worksheet["D12"].s = getStyle(baldwinReserveStackingNegative, true);
  worksheet["D13"].s = getStyle(baldwinReserveStackingNegative, true);
  worksheet["D14"].s = getStyle(baldwinReserveStackingNegative, true);

  worksheet["E11"].s = getStyle(baldwinReservePackingNegative, false);
  worksheet["E12"].s = getStyle(baldwinReservePackingNegative, true);
  worksheet["E13"].s = getStyle(baldwinReservePackingNegative, true);
  worksheet["E14"].s = getStyle(baldwinReservePackingNegative, true);

  worksheet["F11"].s = getStyle(baldwinReserveGeneralNegative, false);
  worksheet["F12"].s = getStyle(baldwinReserveGeneralNegative, true);
  worksheet["F13"].s = getStyle(baldwinReserveGeneralNegative, true);
  worksheet["F14"].s = getStyle(baldwinReserveGeneralNegative, true);

  worksheet["G11"].s = getStyle(displayAreaNegative, false);
  worksheet["G12"].s = getStyle(displayAreaNegative, true);
  worksheet["G13"].s = getStyle(displayAreaNegative, true);
  worksheet["G14"].s = getStyle(displayAreaNegative, true);

  worksheet["H11"].s = getStyle(pizzaTrayNegative, false);
  worksheet["H12"].s = getStyle(pizzaTrayNegative, true);
  worksheet["H13"].s = getStyle(pizzaTrayNegative, true);
  worksheet["H14"].s = getStyle(pizzaTrayNegative, true);

  return worksheet;
}

function getStyle(count: number, wantPale: boolean): StyleObject {
  if (count < 10) {
    return wantPale ? sentenceWhileTruePaleStyles : sentenceWhileTrueStyles;
  } else if (count >= 10 && count < 20) {
    return wantPale
      ? sentenceWhileRegularPaleStyles
      : sentenceWhileRegularStyles;
  } else {
    return wantPale ? sentenceWhileFalsePaleStyles : sentenceWhileFalseStyles;
  }
}
