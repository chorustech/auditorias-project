import { NcrInsertUpdateReportContent } from "@/content/reports/management/addUpdateReport/unique/ncr/NcrInsertUpdateReportContent";

export default async function NcrUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  <NcrInsertUpdateReportContent isUpdate id={id} />;
}
