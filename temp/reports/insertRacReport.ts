"use server";

export async function insertRacReport(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const responsable = formData.get("responsable");
    const numParte = formData.get("numParte");
    const descProd = formData.get("descProd");
    const sizeLote = formData.get("sizeLote");
    const ponderancia = formData.get("ponderancia");
    const codigoFecha = formData.get("codigoFecha");
    const area = formData.get("area");
    const porcFalla = formData.get("porcFalla");
    const descProb = formData.get("descProb");

    const file = formData.get("archivo") as File | null;

    console.log({
      responsable: responsable,
      numParte: numParte,
      descProd: descProd,
      sizeLote: sizeLote,
      ponderancia: ponderancia,
      codigoFecha: codigoFecha,
      area: area,
      porcFalla: porcFalla,
      descProb: descProb,
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
