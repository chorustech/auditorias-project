"use client";

import { usePathname } from "next/navigation";

export function SharedAddUpdateReportContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  const pathname = usePathname();

  const rawPath = pathname.split("/").at(-1);
  const path = rawPath ?? null;
  return (
    <div>
      <p>Contenido compartido para agregar un nuevo reporte</p>
      <p>Apuntando a: {path}</p>
      {isUpdate && <p>Id: {id}</p>}
    </div>
  );
}
