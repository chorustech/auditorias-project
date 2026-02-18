import { DinamicTableHeader } from "./DinamicTableHeader";
import { DinamicTableBody } from "./DinamicTableBody";

export function DinamicTable({
  pointer,
  columns,
}: {
  pointer: string;
  columns: string[];
}) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* HEADER */}
      <DinamicTableHeader pointer={pointer} />

      {/* BODY */}
      <DinamicTableBody pointer={pointer} columns={columns} />
    </div>
  );
}
