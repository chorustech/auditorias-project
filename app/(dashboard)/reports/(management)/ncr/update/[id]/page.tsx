import { NcrAddUpdateReportContent } from "@/content/reports/management/addReport/unique/ncr/NcrAddUpdateReportContent";

export default async function NcrUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  <NcrAddUpdateReportContent isUpdate id={id} />;
}
