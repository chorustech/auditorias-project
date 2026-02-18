import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";

export function DinamicTableContent({ pointer }: { pointer: string }) {
  return (
    <SectionContainer>
      <DinamicTable pointer={pointer} />
    </SectionContainer>
  );
}
