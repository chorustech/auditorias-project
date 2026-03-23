/* DATA */
import {
  baldwinStateColumnsId,
  baldwinReserveSupplyColumnsId,
  baldwinReserveStackingColumnsId,
  baldwinReservePackingColumnsId,
  baldwinReserveGeneralColumnsId,
  displayAreaColumnsId,
  pizzaTrayColumnsId,
  eolaColumnsId,
  ncrColumnsId,
  racColumnsId,
} from "@/components/shared/download/data/reports/reportsColumnsId";
import {
  mainEvenStyles,
  mainOddStyles,
  sectionEvenStyles,
  sectionOddStyles,
  sectionEvenSentencesStyles,
  sectionOddSentencesStyles,
  rowEvenStyles,
  rowOddStyles,
  sentenceWhileTrueStyles,
  sentenceWhileFalseStyles,
} from "@/components/shared/download/data/shared/mainStyles";

/* LIBS */
import * as XLSX from "xlsx-js-style";

/* TYPES */
import { PointerArea } from "@/utils/pointerArea";
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import { Metadata } from "@/src/reporte-auditoria/domain/entities";
import { LettersObject } from "@/components/shared/download/types/shared/lettersObject";

export function setColumnsStyles(
  pointer: PointerArea,
  worksheet: XLSX.WorkSheet,
  reports: ReporteAuditoriaConDetalles<Metadata>[],
): XLSX.WorkSheet {
  switch (pointer) {
    case "baldwin-state":
      worksheet = setColumnsStylesLoop(
        worksheet,
        17,
        baldwinStateColumnsId,
        reports,
        3,
      );
      break;

    case "baldwin-reserve-supply":
      worksheet = setColumnsStylesLoop(
        worksheet,
        8,
        baldwinReserveSupplyColumnsId,
        reports,
        3,
      );
      break;

    case "baldwin-reserve-stacking":
      worksheet = setColumnsStylesLoop(
        worksheet,
        10,
        baldwinReserveStackingColumnsId,
        reports,
        3,
      );
      break;

    case "baldwin-reserve-packing":
      worksheet = setColumnsStylesLoop(
        worksheet,
        12,
        baldwinReservePackingColumnsId,
        reports,
        3,
      );
      break;

    case "baldwin-reserve-general":
      worksheet = setColumnsStylesLoop(
        worksheet,
        4,
        baldwinReserveGeneralColumnsId,
        reports,
        3,
      );
      break;

    case "display-area":
      worksheet = setColumnsStylesLoop(
        worksheet,
        6,
        displayAreaColumnsId,
        reports,
        3,
      );
      break;

    case "pizza-tray":
      worksheet = setColumnsStylesLoop(
        worksheet,
        5,
        pizzaTrayColumnsId,
        reports,
        3,
      );
      break;

    case "eola":
      worksheet = setColumnsStylesLoop(worksheet, 0, eolaColumnsId, reports, 2);
      break;

    case "ncr":
      worksheet = setColumnsStylesLoop(worksheet, 0, ncrColumnsId, reports, 2);
      break;

    case "rac":
      worksheet = setColumnsStylesLoop(worksheet, 0, racColumnsId, reports, 2);
      break;
  }

  return worksheet;
}

function setColumnsStylesLoop(
  worksheet: XLSX.WorkSheet,
  sentencesCount: number,
  columnsIdObject: LettersObject,
  reports: ReporteAuditoriaConDetalles<Metadata>[],
  addRowStartCount: number,
): XLSX.WorkSheet {
  columnsIdObject.main.forEach((letter, index) => {
    const cellAddress = letter + "1";
    if (!worksheet[cellAddress]) {
      worksheet[cellAddress] = { t: "s", v: "" };
    }
    worksheet[cellAddress].s =
      index % 2 === 0 ? mainEvenStyles : mainOddStyles;
  });

  if (columnsIdObject.sections)
    columnsIdObject.sections.forEach((section, index) => {
      const cellAddress = section.title + "1";
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { t: "s", v: "" };
      }
      worksheet[cellAddress].s =
        index % 2 === 0 ? sectionEvenStyles : sectionOddStyles;

      section.sentences.forEach((sentence) => {
        const cellAddress = sentence + "2";
        if (!worksheet[cellAddress]) {
          worksheet[cellAddress] = { t: "s", v: "" };
        }
        worksheet[cellAddress].s =
          index % 2 === 0
            ? sectionEvenSentencesStyles
            : sectionOddSentencesStyles;
      });
    });

  reports.forEach((report, index) => {
    const rowIndex = index + addRowStartCount;
    columnsIdObject.main.forEach((letter) => {
      const cellAddress = letter + rowIndex;
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { t: "s", v: "" };
      }
      worksheet[cellAddress].s =
        index % 2 === 0 ? rowEvenStyles : rowOddStyles;
    });

    if (report.type === "general") {
      if (report.respuestas.length === sentencesCount) {
        if (columnsIdObject.sections) {
          let count = -1;

          columnsIdObject.sections.forEach((section) => {
            section.sentences.forEach((sentence) => {
              count++;
              const cellAddress = sentence + rowIndex;
              if (!worksheet[cellAddress]) {
                worksheet[cellAddress] = { t: "s", v: "" };
              }
              worksheet[cellAddress].s = report.respuestas[count]
                ? sentenceWhileTrueStyles
                : sentenceWhileFalseStyles;
            });
          });
        }
      }
    }
  });

  return worksheet;
}
