import { DinamicTableHeader } from "./DinamicTableHeader";
import { DinamicTableBody } from "./DinamicTableBody";

export function DinamicTable() {
  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <DinamicTableHeader />

      {/* BODY */}
      <DinamicTableBody />
    </div>
  );
}
