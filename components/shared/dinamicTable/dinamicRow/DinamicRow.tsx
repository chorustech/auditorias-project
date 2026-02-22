import { ReportType } from "@/temp/serverActionSimulado";
import { GeneralRowBody } from "./rowBody/GeneralRowBody";
import { EolaRowBody } from "./rowBody/EolaRowBody";
import { NcrRowBody } from "./rowBody/NcrRowBody";
import { RacRowBody } from "./rowBody/RacRowBody";

export function DinamicRow({
  index,
  report,
}: {
  index: number;
  report: ReportType;
}) {
  return (
    <tr
      className={`border-b border-neutral-200 hover:bg-[#00A0D0]/20 transition-all duration-200 ${index % 2 ? "bg-neutral-100" : "bg-white"}`}
    >
      {report.kind === "general" ? (
        <GeneralRowBody report={report} />
      ) : report.kind === "eola" ? (
        <EolaRowBody report={report} />
      ) : report.kind === "ncr" ? (
        <NcrRowBody report={report} />
      ) : report.kind === "rac" ? (
        <RacRowBody report={report} />
      ) : (
        <></>
      )}
    </tr>
  );
}
