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
} from "@/components/shared/download/data/reportsColumnsId";
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
} from "@/components/shared/download/data/reportsMainStyles";

/* LIBS */
import * as XLSX from "xlsx-js-style";

/* TYPES */
import { PointerArea } from "@/utils/pointerArea";
import { ReportType } from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";
import { LettersObject } from "@/components/shared/download/types/lettersObject";

export function setColumnsStyles(
  pointer: PointerArea,
  worksheet: XLSX.WorkSheet,
  reports: ReportType[],
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
  reports: ReportType[],
  addRowStartCount: number,
): XLSX.WorkSheet {
  columnsIdObject.main.forEach(
    (letter, index) =>
      (worksheet[letter + "1"].s =
        index % 2 === 0 ? mainEvenStyles : mainOddStyles),
  );

  if (columnsIdObject.sections)
    columnsIdObject.sections.forEach((section, index) => {
      worksheet[section.title + "1"].s =
        index % 2 === 0 ? sectionEvenStyles : sectionOddStyles;

      section.sentences.forEach(
        (sentence) =>
          (worksheet[sentence + "2"].s =
            index % 2 === 0
              ? sectionEvenSentencesStyles
              : sectionOddSentencesStyles),
      );
    });

  reports.forEach((report, index) => {
    columnsIdObject.main.forEach(
      (letter) =>
        (worksheet[letter + (index + addRowStartCount)].s =
          index % 2 !== 0 ? rowEvenStyles : rowOddStyles),
    );

    if (report.kind === "general") {
      if (report.data.respuestas.length === sentencesCount) {
        if (columnsIdObject.sections) {
          let count = -1;

          columnsIdObject.sections.forEach((section) => {
            section.sentences.forEach((sentence) => {
              count++;
              worksheet[sentence + (index + addRowStartCount)].s = report.data
                .respuestas[count]
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
