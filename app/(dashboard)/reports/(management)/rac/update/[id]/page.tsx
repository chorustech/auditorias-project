import { RacAddUpdateReportContent } from "@/content/reports/management/addReport/unique/rac/RacAddUpdateReportContent";

export default async function RacUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  <RacAddUpdateReportContent isUpdate id={id} />;
}
