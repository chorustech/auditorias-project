import { InsertUpdateEolaReportContent } from "@/content/reports/management/insertUpdateReport/unique/eola/InsertUpdateEolaReportContent";

export default async function EolaUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InsertUpdateEolaReportContent isUpdate id={id} />;
}
