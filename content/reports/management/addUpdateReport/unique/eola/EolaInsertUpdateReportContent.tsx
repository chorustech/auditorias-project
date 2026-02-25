export function EolaInsertUpdateReportContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  return (
    <div>
      <p>Contenido compartido para agregar un nuevo reporte EOLA</p>
      {isUpdate && <p>Id: {id}</p>}
    </div>
  );
}
