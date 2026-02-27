"use server";

export async function insertNcrReport(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  try {
    const ncr = formData.get("ncr");
    const numParte = formData.get("numParte");
    const proveedor = formData.get("proveedor");
    const defecto = formData.get("defecto");

    const file = formData.get("archivo") as File | null;

    console.log({
      ncr: ncr,
      numParte: numParte,
      proveedor: proveedor,
      defecto: defecto,
      file: file ? `Nombre: ${file.name}, Tipo: ${file.type}` : null,
    });

    return {
      ok: true,
      message: "Reporte insertado correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Ocurrió un error al ingresar el reporte",
    };
  }
}
