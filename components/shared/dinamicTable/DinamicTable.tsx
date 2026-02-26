import { DinamicTableHeader } from "./DinamicTableHeader";
import { DinamicTableBody } from "./DinamicTableBody";
import { DinamicTableFooter } from "./DinamicTableFooter";

export function DinamicTable({
  theadColumns,
  tbodyRows,
  loading,
  count,
  type,
  backAction,
  filterAction,
  addAction,
  excelAction,
  backContent
}: {
  theadColumns: React.ReactNode;
  tbodyRows: React.ReactNode;
  loading: boolean;
  count: number;
  type: string;
  backAction: () => void;
  filterAction: () => void;
  addAction: () => void;
  excelAction: () => void;
  backContent: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <DinamicTableHeader
        backAction={backAction}
        filterAction={filterAction}
        addAction={addAction}
        excelAction={excelAction}
        backContent={backContent}
      />

      {/* BODY */}
      <DinamicTableBody
        theadColumns={theadColumns}
        tbodyRows={tbodyRows}
        loading={loading}
        count={count}
        type={type}
      />

      {/* FOOTER */}
      <DinamicTableFooter loading={loading} count={count} type={type} />
    </div>
  );
}
