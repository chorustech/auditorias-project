import { InsertUpdateNcrReportContent } from "@/content/reports/management/insertUpdateReport/unique/ncr/InsertUpdateNcrReportContent";

export default async function NcrUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  <InsertUpdateNcrReportContent isUpdate id={id} />;
}
