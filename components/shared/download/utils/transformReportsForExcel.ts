/* DATA */
import { reportsQuestions } from "@/content/reports/data/questions/reportsQuestions";
import {
  reportsBaldwinReserveGeneralColumnsHeaders,
  reportsBaldwinReservePackingColumnsHeaders,
  reportsBaldwinReserveStackingColumnsHeaders,
  reportsBaldwinReserveSupplyColumnsHeaders,
  reportsBaldwinStateColumnsHeaders,
  reportsDisplayAreaColumnsHeaders,
  reportsEolaColumnsHeaders,
  reportsNcrColumnsHeaders,
  reportsPizzaTrayColumnsHeaders,
  reportsRacColumnsHeaders,
} from "@/components/shared/download/data/reportsColumnsHeaders";

/* TYPES */
import { ReportUnion } from "@/components/shared/download/types/reportUnion";

export function transformReportsForExcel(reports: ReportUnion[]): string[][] {
  const rows: string[][] = [];
  const subHeaders: string[] = [];

  if (reports.length > 0) {
    // Headers
    const first_report = reports[0];

    if (first_report.kind === "general") {
      const report_type = first_report.data;

      switch (report_type.type) {
        case "baldwin-state":
          rows.push(reportsBaldwinStateColumnsHeaders);

          subHeaders.push("", "", "", "", "", "", "");

          reportsQuestions["baldwin-state"].sections.map((section) => {
            section.questions.map((q) => subHeaders.push(q.sentence));
          });

          rows.push(subHeaders);
          break;

        case "baldwin-reserve-supply":
          rows.push(reportsBaldwinReserveSupplyColumnsHeaders);

          subHeaders.push("", "", "", "", "", "");

          reportsQuestions["baldwin-reserve-supply"].sections.map((section) => {
            section.questions.map((q) => subHeaders.push(q.sentence));
          });

          rows.push(subHeaders);
          break;

        case "baldwin-reserve-stacking":
          rows.push(reportsBaldwinReserveStackingColumnsHeaders);

          subHeaders.push("", "", "", "", "", "");

          reportsQuestions["baldwin-reserve-stacking"].sections.map(
            (section) => {
              section.questions.map((q) => subHeaders.push(q.sentence));
            },
          );

          rows.push(subHeaders);
          break;

        case "baldwin-reserve-packing":
          rows.push(reportsBaldwinReservePackingColumnsHeaders);

          subHeaders.push("", "", "", "", "", "");

          reportsQuestions["baldwin-reserve-packing"].sections.map(
            (section) => {
              section.questions.map((q) => subHeaders.push(q.sentence));
            },
          );

          rows.push(subHeaders);
          break;

        case "baldwin-reserve-general":
          rows.push(reportsBaldwinReserveGeneralColumnsHeaders);

          subHeaders.push("", "", "", "", "", "");

          reportsQuestions["baldwin-reserve-general"].sections.map(
            (section) => {
              section.questions.map((q) => subHeaders.push(q.sentence));
            },
          );

          rows.push(subHeaders);
          break;

        case "display-area":
          rows.push(reportsDisplayAreaColumnsHeaders);

          subHeaders.push("", "", "", "", "", "");

          reportsQuestions["display-area"].sections.map((section) => {
            section.questions.map((q) => subHeaders.push(q.sentence));
          });

          rows.push(subHeaders);
          break;

        case "pizza-tray":
          rows.push(reportsPizzaTrayColumnsHeaders);

          subHeaders.push("", "", "", "", "", "", "");

          reportsQuestions["pizza-tray"].sections.map((section) => {
            section.questions.map((q) => subHeaders.push(q.sentence));
          });

          rows.push(subHeaders);
          break;
      }
    } else if (first_report.kind === "eola") {
      rows.push(reportsEolaColumnsHeaders);
    } else if (first_report.kind === "ncr") {
      rows.push(reportsNcrColumnsHeaders);
    } else {
      rows.push(reportsRacColumnsHeaders);
    }

    // Body
    reports.map((report) => {
      const final_report: string[] = [];
      if (report.kind === "general") {
        // Compartidos
        final_report.push(report.data.id.toString());
        final_report.push(report.data.usuario_nombre);
        final_report.push(report.data.fecha);
        final_report.push(report.data.semana);

        // Específicos
        if (report.data.linea) final_report.push(report.data.linea);
        if (report.data.coord) final_report.push(report.data.coord);
        if (report.data.picker) final_report.push(report.data.picker);
        if (report.data.worktable) final_report.push(report.data.worktable);
        if (report.data.ubicacion) final_report.push(report.data.ubicacion);
        if (report.data.nivel) final_report.push(report.data.nivel.toString());

        if (report.data.comentarios) final_report.push(report.data.comentarios);
        else final_report.push("N/A");

        report.data.respuestas.map((respuesta) =>
          final_report.push(respuesta ? "Pasa" : "Falla"),
        );
      } else if (report.kind === "eola") {
        final_report.push(report.data.id.toString());

        if (report.data.numOrden) final_report.push(report.data.numOrden);
        else final_report.push("N/A");

        final_report.push(report.data.usuario_nombre);
        final_report.push(report.data.fecha);
        final_report.push(report.data.semana);
        final_report.push(report.data.uniNegocio);
        final_report.push(report.data.linea);
        final_report.push(report.data.tipo);
        final_report.push(report.data.sku);
        final_report.push(report.data.upc);
        final_report.push(report.data.sizeOrden.toString());
        final_report.push(report.data.cantInspeccionada.toString());
        final_report.push(report.data.cantAceptada.toString());
        if (report.data.comentarios) final_report.push(report.data.comentarios);
        else final_report.push("N/A");
      } else if (report.kind === "ncr") {
        final_report.push(report.data.id.toString());
        final_report.push(report.data.fecha);
        final_report.push(report.data.semana);
        final_report.push(report.data.numParte);
        final_report.push(report.data.proveedor);
        final_report.push(report.data.defecto);
      } else {
        final_report.push(report.data.id.toString());
        final_report.push(report.data.usuario_nombre);
        final_report.push(report.data.fecha);
        final_report.push(report.data.responsable);
        final_report.push(report.data.numParte);
        final_report.push(report.data.descProd);
        final_report.push(report.data.sizeLote.toString());
        final_report.push(report.data.ponderancia);
        final_report.push(report.data.codigoFecha);
        final_report.push(report.data.area);
        final_report.push(report.data.porcFalla);
        final_report.push(report.data.descProb);
      }

      rows.push(final_report);
    });
  }

  return rows;
}
