/* DATA */
import { baldwinStateColumnsId } from "@/components/shared/download/data/reportsColumnsId";
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

export function setColumnsStyles(
  pointer: PointerArea,
  worksheet: XLSX.WorkSheet,
  reports: ReportType[],
): XLSX.WorkSheet {
  switch (pointer) {
    case "baldwin-state":
      baldwinStateColumnsId.main.forEach(
        (letter, index) =>
          (worksheet[letter + "1"].s =
            index % 2 === 0 ? mainEvenStyles : mainOddStyles),
      );

      if (baldwinStateColumnsId.sections)
        baldwinStateColumnsId.sections.forEach((section, index) => {
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
        baldwinStateColumnsId.main.forEach(
          (letter) =>
            (worksheet[letter + (index + 3)].s =
              index % 2 !== 0 ? rowEvenStyles : rowOddStyles),
        );

        if (report.kind === "general") {
          if (report.data.respuestas.length === 17) {
            if (baldwinStateColumnsId.sections) {
              let count = -1;

              baldwinStateColumnsId.sections.forEach((section) => {
                section.sentences.forEach((sentence) => {
                  count++;
                  worksheet[sentence + (index + 3)].s = report.data.respuestas[
                    count
                  ]
                    ? sentenceWhileTrueStyles
                    : sentenceWhileFalseStyles;
                });
              });
            }
          }
        }
      });
      break;
  }

  return worksheet;
}
