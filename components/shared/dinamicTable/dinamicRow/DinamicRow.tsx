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
  const getTwBgColor = () => {
    return index % 2 ? "bg-neutral-100" : "bg-white";
  };

  return (
    <tr
      className={`border-b border-neutral-200 hover:bg-[#00A0D0]/20 transition-all relative duration-200 ${getTwBgColor()}`}
    >
      {report.kind === "general" ? (
        <GeneralRowBody report={report} twBgColor={`${getTwBgColor()}`} />
      ) : report.kind === "eola" ? (
        <EolaRowBody report={report} twBgColor={`${getTwBgColor()}`} />
      ) : report.kind === "ncr" ? (
        <NcrRowBody report={report} twBgColor={`${getTwBgColor()}`} />
      ) : report.kind === "rac" ? (
        <RacRowBody report={report} twBgColor={`${getTwBgColor()}`} />
      ) : (
        <></>
      )}
    </tr>
  );
}
