"use client";
import { InsertUpdateGeneralReportContent } from "@/content/reports/management/insertUpdateReport/general/InsertUpdateGeneralReportContent";

type Props = {
  params: {
    id: string;
  };
};

export default function PizzaTrayUpdatePage({ params: { id } }: Props) {
  return <InsertUpdateGeneralReportContent isUpdate id={id} />;
}
