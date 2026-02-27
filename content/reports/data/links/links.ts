import {
  ClipboardList,
  House,
  UsersRound,
  Container,
  Forklift,
  Layers,
  PackageOpen,
  Library,
  Grid2x2,
  Grid2x2Check,
  BetweenHorizontalEnd,
  Handshake,
  PackageX,
} from "lucide-react";
import { Links } from "@/content/reports/types/links/links";

export const links: Links[] = [
  { href: "/home", title: "Inicio", Icon: House, subLinks: [] },
  {
    href: "/reports",
    title: "Reportes",
    Icon: ClipboardList,
    subLinks: [
      {
        href: "/baldwin-state",
        title: "Baldwin State",
        Icon: Container,
        state: "",
      },
      {
        href: "/baldwin-reserve-supply",
        title: "Baldwin Reserve Surtido de Materiales",
        Icon: Forklift,
        state: "",
      },
      {
        href: "/baldwin-reserve-stacking",
        title: "Baldwin Reserve Proceso de Stacking",
        Icon: Layers,
        state: "",
      },
      {
        href: "/baldwin-reserve-packing",
        title: "Baldwin Reserve Empaque",
        Icon: PackageOpen,
        state: "",
      },
      {
        href: "/baldwin-reserve-general",
        title: "Baldwin Reserve Generales",
        Icon: Library,
        state: "",
      },
      {
        href: "/display-area",
        title: "Display Area",
        Icon: Grid2x2,
        state: "",
      },
      {
        href: "/pizza-tray",
        title: "Pizza Tray",
        Icon: Grid2x2Check,
        state: "",
      },
      {
        href: "/eola",
        title: "EOLA",
        Icon: BetweenHorizontalEnd,
        state: "",
      },
      {
        href: "/ncr",
        title: "Reporte de Producto no Conforme",
        Icon: PackageX,
        state: "",
      },
      {
        href: "/rac",
        title: "Requerimiento de Acción Correctiva",
        Icon: Handshake,
        state: "",
      },
    ],
  },
  { href: "/users", title: "Usuarios", Icon: UsersRound, subLinks: [] },
];
