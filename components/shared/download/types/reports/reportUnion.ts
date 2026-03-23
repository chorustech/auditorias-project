import {
  EolaReport,
  GeneralReport,
  NcrReport,
  RacReport,
} from "@/temp/Reports/Infrastructure/Types/selectReportsResponse";

export type ReportUnion =
  | { kind: "general"; data: GeneralReport }
  | { kind: "eola"; data: EolaReport }
  | { kind: "ncr"; data: NcrReport }
  | { kind: "rac"; data: RacReport };
