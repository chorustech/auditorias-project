"use server";

import { UserData } from "./Types/userData";

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

export async function getUsers(): Promise<UserData> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    data: [
      {
        id: 1,
        numEmpleado: "2308",
        nombre: "Pirita Dreemurr",
        email: "pirita@gmail.com",
        rol: "Admin",
      },
      {
        id: 2,
        numEmpleado: "512",
        nombre: "Cornalina Dreemurr",
        email: "cornalina@gmail.com",
        rol: "Calidad",
      },
    ],
    count: 2,
  };
}
