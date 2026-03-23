import { InsertUpdateGeneralReportContent } from "@/content/reports/management/insertUpdateReport/general/InsertUpdateGeneralReportContent";
import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";

export default async function BaldwinReserveSupplyInsertPage() {
  const user = await getSessionUser();
  return <InsertUpdateGeneralReportContent isUpdate={false} id={""} user={user} />;
}
