"use client";

import { useEffect } from "react";

export function InsertUpdateUserContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  useEffect(() => {
    console.log("Pasando");
  }, []);
  return (
    <div className="bg-red-400">
      <p>Contenido compartido para agregar un nuevo usuario</p>
      {isUpdate && <p>Id: {id}</p>}
    </div>
  );
}
