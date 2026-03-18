import { InsertUpdateNcrReportContent } from "@/content/reports/components/insertUpdate/unique/ncr/InsertUpdateNcrReportContent";

export default async function NcrUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InsertUpdateNcrReportContent isUpdate id={id} />;
}
