"use server";

export async function login(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({
      email,
      password,
    });

    return {
      ok: true,
      message: "Sesión iniciada correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al iniciar sesión",
    };
  }
}

