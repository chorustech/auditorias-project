import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";
import { getAllReportsForDashboard } from "@/src/reporte-auditoria/infrastructure/actions/get-all-reports-for-dashboard";
import {
  Key,
  AlertTriangle,
  ClipboardList,
  Target,
  CheckCircle,
} from "lucide-react";

type AreaStats = {
  trueCount: number;
  falseCount: number;
};

export default async function HomePage() {
  const user = await getSessionUser();
  const reportsResponse = await getAllReportsForDashboard();

  let areaStats: Record<string, AreaStats> = {};
  let totalTrue = 0;
  let totalFalse = 0;

  if (reportsResponse.ok && reportsResponse.data) {
    reportsResponse.data.forEach((report) => {
      if (!areaStats[report.areaNombre]) {
        areaStats[report.areaNombre] = { trueCount: 0, falseCount: 0 };
      }
      report.respuestas.forEach((respuesta) => {
        if (respuesta === true) {
          areaStats[report.areaNombre].trueCount++;
          totalTrue++;
        } else {
          areaStats[report.areaNombre].falseCount++;
          totalFalse++;
        }
      });
    });
  }

  const sortedByTrue = Object.entries(areaStats).sort(
    (a, b) => b[1].trueCount - a[1].trueCount,
  );
  const sortedByFalse = Object.entries(areaStats).sort(
    (a, b) => b[1].falseCount - a[1].falseCount,
  );

  const totalAnswers = totalTrue + totalFalse;
  const compliancePercentage =
    totalAnswers > 0 ? ((totalTrue / totalAnswers) * 100).toFixed(1) : "0.0";
  const auditedAreasCount = Object.keys(areaStats).length;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Bienvenido, {user?.nombre || "Usuario"}!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Resumen del estado de las auditorías.
      </p>

      {/* KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <CheckCircle className="text-green-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Cumplimiento General</p>
            <p className="text-2xl font-bold text-gray-800">
              {compliancePercentage}%
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Target className="text-purple-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Áreas Auditadas</p>
            <p className="text-2xl font-bold text-gray-800">
              {auditedAreasCount}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Áreas con más cumplimientos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Key className="text-green-500 mr-2" />
            Áreas con Más Cumplimientos (Respuestas 'Sí')
          </h2>
          <ul className="space-y-2">
            {sortedByTrue.map(([area, stats]) => (
              <li
                key={area}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
              >
                <span className="font-medium text-gray-800">{area}</span>
                <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full">
                  {stats.trueCount}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Áreas con más incumplimientos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <AlertTriangle className="text-red-500 mr-2" />
            Áreas con Más Incumplimientos (Respuestas 'No')
          </h2>
          <ul className="space-y-2">
            {sortedByFalse.map(([area, stats]) => (
              <li
                key={area}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
              >
                <span className="font-medium text-gray-800">{area}</span>
                <span className="text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full">
                  {stats.falseCount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
