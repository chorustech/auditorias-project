"use client";
import { InsertUpdateGeneralReportContent } from "@/content/reports/management/insertUpdateReport/general/InsertUpdateGeneralReportContent";

type Props = {
  params: {
    id: string;
  };
};

export default function BaldwinReserveStackingUpdatePage({ params: { id } }: Props) {
  return <InsertUpdateGeneralReportContent isUpdate id={id} />;
}
