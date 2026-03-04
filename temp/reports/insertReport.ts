"use server";

export async function insertReport(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  try {
    const respuestasRaw = formData.get("respuestas") as string;
    const respuestas: boolean[] = JSON.parse(respuestasRaw);

    const linea = formData.get("linea");
    const coordinador = formData.get("coord");
    const picker = formData.get("picker");
    const ubicacion = formData.get("ubicacion");
    const nivel = formData.get("nivel");
    const worktable = formData.get("worktable");
    const comentarios = formData.get("comentarios");

    const file = formData.get("archivo") as File | null;

    console.log({
      respuestas: respuestas,
      linea: linea,
      coordinador: coordinador,
      picker: picker,
      ubicacion: ubicacion,
      nivel: nivel,
      worktable: worktable,
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
