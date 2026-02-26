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
  linea?: string; // json
  coord?: string; // json
  picker?: string; // json
  ubicacion?: string; // json
  worktable?: string; // json
  respuestas: boolean[];

  comentrarios: string
};
