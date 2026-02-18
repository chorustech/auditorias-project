import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";

export function DinamicTableContent({
  pointer,
  columns,
}: {
  pointer: string;
  columns: string[];
}) {
  return (
    <SectionContainer>
      <DinamicTable pointer={pointer} columns={columns} />
    </SectionContainer>
  );
}
