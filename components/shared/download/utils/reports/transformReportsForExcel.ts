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
} from "@/components/shared/download/data/reports/reportsColumnsHeaders";

/* TYPES */
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import {
  BaldwinStateMetadata,
  DisplayAreaMetadata,
  EolaMetadata,
  Metadata,
  NcrMetadata,
  PizzaTrayMetadata,
  RacMetadata,
  SurtidoMaterialesMetadata,
} from "@/src/reporte-auditoria/domain/entities";

export function transformReportsForExcel(
  reports: ReporteAuditoriaConDetalles<Metadata>[],
): string[][] {
  const rows: string[][] = [];
  const subHeaders: string[] = [];

  if (reports.length > 0) {
    // Headers
    const first_report = reports[0];

    if (first_report.type === "general") {
      const report_type = first_report;

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
    } else if (first_report.type === "eola") {
      rows.push(reportsEolaColumnsHeaders);
    } else if (first_report.type === "ncr") {
      rows.push(reportsNcrColumnsHeaders);
    } else {
      rows.push(reportsRacColumnsHeaders);
    }

    // Body
    reports.map((report) => {
      const final_report: string[] = [];
      if (report.type === "general") {
        // Compartidos
        final_report.push(report.id.toString());
        final_report.push(report.auditor);
        final_report.push(new Date(report.timestamp).toLocaleDateString());
        final_report.push(report.semana.toString());

        // Específicos
        if ("linea" in report.metadata) {
          final_report.push(
            (report.metadata as BaldwinStateMetadata).linea ?? "",
          );
        }
        if ("coordinador" in report.metadata) {
          final_report.push(
            (report.metadata as BaldwinStateMetadata).coordinador ?? "",
          );
        }
        if ("picker" in report.metadata) {
          final_report.push(
            (report.metadata as SurtidoMaterialesMetadata).picker ?? "",
          );
        }
        if ("worktable" in report.metadata) {
          final_report.push(
            (report.metadata as DisplayAreaMetadata).worktable ?? "",
          );
        }
        if ("ubicacion" in report.metadata) {
          final_report.push(
            (report.metadata as PizzaTrayMetadata).ubicacion ?? "",
          );
        }
        if ("nivel" in report.metadata) {
          final_report.push(
            (report.metadata as PizzaTrayMetadata).nivel.toString(),
          );
        }

        if (report.comentarios) final_report.push(report.comentarios);
        else final_report.push("N/A");

        report.respuestas.map((respuesta) =>
          final_report.push(respuesta ? "Pasa" : "Falla"),
        );
      } else if (report.type === "eola") {
        final_report.push(report.id.toString());

        if ("numOrden" in report.metadata) {
          final_report.push(
            (report.metadata as EolaMetadata).numOrden ?? "",
          );
        } else final_report.push("N/A");

        final_report.push(report.auditor);
        final_report.push(new Date(report.timestamp).toLocaleDateString());
        final_report.push(report.semana.toString());
        if ("uniNegocio" in report.metadata) {
          final_report.push(
            (report.metadata as EolaMetadata).uniNegocio ?? "",
          );
        }
        if ("linea" in report.metadata) {
          final_report.push(
            (report.metadata as EolaMetadata).linea ?? "",
          );
        }
        if ("tipo" in report.metadata) {
          final_report.push(
            (report.metadata as EolaMetadata).tipo ?? "",
          );
        }
        if ("sku" in report.metadata) {
          final_report.push(
            (report.metadata as EolaMetadata).sku ?? "",
          );
        }
        if ("upc" in report.metadata) {
          final_report.push(
            (report.metadata as EolaMetadata).upc ?? "",
          );
        }
        if ("sizeOrden" in report.metadata) {
          final_report.push(
            (report.metadata as EolaMetadata).sizeOrden.toString(),
          );
        }
        if ("cantInspeccionada" in report.metadata) {
          final_report.push(
            (
              report.metadata as EolaMetadata
            ).cantInspeccionada.toString(),
          );
        }
        if ("cantAceptada" in report.metadata) {
          final_report.push(
            (report.metadata as EolaMetadata).cantAceptada.toString(),
          );
        }
        if (report.comentarios) final_report.push(report.comentarios);
        else final_report.push("N/A");
      } else if (report.type === "ncr") {
        final_report.push(report.id.toString());
        final_report.push(new Date(report.timestamp).toLocaleDateString());
        final_report.push(report.semana.toString());
        if ("numParte" in report.metadata) {
          final_report.push(
            (report.metadata as NcrMetadata).numParte ?? "",
          );
        }
        if ("proveedor" in report.metadata) {
          final_report.push(
            (report.metadata as NcrMetadata).proveedor ?? "",
          );
        }
        if ("defecto" in report.metadata) {
          final_report.push(
            (report.metadata as NcrMetadata).defecto ?? "",
          );
        }
      } else {
        final_report.push(report.id.toString());
        final_report.push(report.auditor);
        final_report.push(new Date(report.timestamp).toLocaleDateString());
        if ("responsable" in report.metadata) {
          final_report.push(
            (report.metadata as RacMetadata).responsable ?? "",
          );
        }
        if ("numParte" in report.metadata) {
          final_report.push(
            (report.metadata as RacMetadata).numParte ?? "",
          );
        }
        if ("descProd" in report.metadata) {
          final_report.push(
            (report.metadata as RacMetadata).descProd ?? "",
          );
        }
        if ("sizeLote" in report.metadata) {
          final_report.push(
            (report.metadata as RacMetadata).sizeLote.toString(),
          );
        }
        if ("ponderancia" in report.metadata) {
          final_report.push(
            (report.metadata as RacMetadata).ponderancia ?? "",
          );
        }
        if ("codigoFecha" in report.metadata) {
          final_report.push(
            (report.metadata as RacMetadata).codigoFecha ?? "",
          );
        }
        if ("area" in report.metadata) {
          final_report.push((report.metadata as RacMetadata).area ?? "");
        }
        if ("porcFalla" in report.metadata) {
          final_report.push(
            (report.metadata as RacMetadata).porcFalla ?? "",
          );
        }
        if ("descProb" in report.metadata) {
          final_report.push(
            (report.metadata as RacMetadata).descProb ?? "",
          );
        }
      }

      rows.push(final_report);
    });
  }

  return rows;
}
