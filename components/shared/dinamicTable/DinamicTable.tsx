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
  excelButtonContent,
  backContent,
  goNext,
  goBack,
  goBackAction,
  goNextAction,
  pageFirstHalf,
  pageSecondHalf,
}: {
  theadColumns: React.ReactNode;
  tbodyRows: React.ReactNode;
  loading: boolean;
  count: number;
  type: string;
  backAction: () => void;
  filterAction: () => void;
  addAction: () => void;
  excelButtonContent: React.ReactNode;
  backContent: React.ReactNode;
  goNext: boolean;
  goBack: boolean;
  goBackAction: () => void;
  goNextAction: () => void;
  pageFirstHalf: React.ReactNode;
  pageSecondHalf: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <DinamicTableHeader
        backAction={backAction}
        filterAction={filterAction}
        addAction={addAction}
        excelButtonContent={excelButtonContent}
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
      <DinamicTableFooter
        loading={loading}
        count={count}
        type={type}
        goNext={goNext}
        goBack={goBack}
        goNextAction={goNextAction}
        goBackAction={goBackAction}
        pageFirstHalf={pageFirstHalf}
        pageSecondHalf={pageSecondHalf}
      />
    </div>
  );
}
