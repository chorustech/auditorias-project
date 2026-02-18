export function SharedAddUpdateReportContent({
  pointer,
  isUpdate,
  id,
}: {
  pointer: string;
  isUpdate: boolean;
  id: string;
}) {
  return (
    <div>
      <p>Contenido compartido para agregar un nuevo reporte</p>
      <p>Apuntando a: {pointer}</p>
      {isUpdate && <p>Id: {id}</p>}
    </div>
  );
}
