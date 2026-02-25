export function NcrInsertUpdateReportContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  return (
    <div>
      <p>Contenido compartido para agregar un nuevo reporte NCR</p>
      {isUpdate && <p>Id: {id}</p>}
    </div>
  );
}
