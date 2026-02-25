export function RacAddUpdateReportContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  return (
    <div>
      <p>Contenido compartido para agregar un nuevo reporte RAC</p>
      {isUpdate && <p>Id: {id}</p>}
    </div>
  );
}
