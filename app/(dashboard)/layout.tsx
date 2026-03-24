import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";
import { DashboardClientLayout } from "./ClientLayout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  return (
    <DashboardClientLayout user={user}>
      {children}
    </DashboardClientLayout>
  );
}