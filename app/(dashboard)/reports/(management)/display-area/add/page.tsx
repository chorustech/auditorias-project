import { SharedAddUpdateReportContent } from "@/content/reports/management/addReport/shared/SharedAddUpdateReportContent";

export default function DisplayAreaAddPage() {
  return (
    <SharedAddUpdateReportContent
      pointer="display-area"
      isUpdate={false}
      id={""}
    />
  );
}
