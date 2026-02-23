import { LucideIcon } from "lucide-react";

export type Links = {
  href: string;
  title: string;
  Icon: LucideIcon;
  subLinks: SubLink[];
};

export type SubLink = {
  href: string;
  title: string;
  Icon: LucideIcon;
  state: "" | "construction" | "maintenance";
};

export type ReportFormValues = {
  linea?: string;
  coord?: string;
  picker?: string;
  ubicacion?: string;
  worktable?: string;
  respuestas: boolean[];
};
