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
  accordionTitle: string;
  Icon: LucideIcon;
  state: "" | "construction" | "maintenance";
};
