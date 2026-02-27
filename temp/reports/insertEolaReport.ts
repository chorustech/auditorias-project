"use server";

export async function insertEolaReport(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  try {
    const unidadNegocio = formData.get("uniNegocio");
    const linea = formData.get("linea");
    const tipo = formData.get("tipo");
    const sku = formData.get("sku");
    const upc = formData.get("upc");
    const sizeOrden = formData.get("sizeOrden");
    const cantInspeccionada = formData.get("cantInspeccionada");
    const cantAceptada = formData.get("cantAceptada");
    const numOrden = formData.get("numOrden");
    const comentarios = formData.get("comentarios");

    const file = formData.get("archivo") as File | null;

    console.log({
      unidadNegocio: unidadNegocio,
      linea: linea,
      tipo: tipo,
      sku: sku,
      upc: upc,
      sizeOrden: sizeOrden,
      cantInspeccionada: cantInspeccionada,
      cantAceptada: cantAceptada,
      numOrden: numOrden,
      comentarios: comentarios,
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
