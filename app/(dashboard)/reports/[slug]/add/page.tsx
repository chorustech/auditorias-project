import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";
import { AddReportContent } from "@/content/reports/management/addReport/AddReportContent";

export default async function AddReportPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getSessionUser();

  if (!user) {
    return <div>Debes iniciar sesión para agregar un reporte.</div>;
  }

  if (user.rol !== "auditor" && user.rol !== "administrador") {
    return (
      <div>
        No tienes permisos para agregar un reporte. Por favor, contacta a un
        administrador.
      </div>
    );
  }

  return <AddReportContent slug={params.slug} />;
}
