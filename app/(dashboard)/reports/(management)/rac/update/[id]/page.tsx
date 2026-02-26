import { InsertUpdateRacReportContent } from "@/content/reports/management/insertUpdateReport/unique/rac/InsertUpdateRacReportContent";

export default async function RacUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  <InsertUpdateRacReportContent isUpdate id={id} />;
}
