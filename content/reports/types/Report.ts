import { LucideIcon } from "lucide-react";
import { FieldArray } from "react-hook-form";

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

/* 
  TODO:
  Cambiar datos a json como metadata

  ex: 

  metadata: {
    "linea": "lo que sea" 
  }
  
  metadata: {
    "coord": "lo que sea" 
  }
*/

export type ReportFormValues = {
  linea?: string;
  coord?: string;
  picker?: string;
  ubicacion?: string;
  worktable?: string;
  nivel?: number;
  respuestas: boolean[];
  comentarios: string;
  archivo?: FieldArray;
};
