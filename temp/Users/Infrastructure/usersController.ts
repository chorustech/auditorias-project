"use server";

import { IQuery } from "@/temp/Shared/Domain/Interfaces/IQuery";
import { UserData, UserType } from "./Types/userData";

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

export async function selectUsers({
  query,
}: {
  query: IQuery<UserType>;
}): Promise<UserData> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    data: [
      {
        id: 1,
        numEmpleado: 2308,
        nombre: "Pirita Dreemurr",
        email: "pirita@assaabloy.com",
        rol: "Admin",
        estado: "ACTIVO",
      },
      {
        id: 2,
        numEmpleado: 512,
        nombre: "Cornalina Dreemurr",
        email: "cornalina@assaabloy.com",
        rol: "Calidad",
        estado: "INACTIVO",
      },
    ],
    count: 2,
    message: "Usuarios obtenidos correctamente",
    ok: true,
  };
}

export async function selectUserById(
  id: number,
): Promise<{ ok: boolean; message: string; user: UserType }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ok: true,
      message: "Usuario obtenido correctamente",
      user: {
        id: 2,
        numEmpleado: 512,
        nombre: "Cornalina Dreemurr",
        email: "cornalina@assaabloy.com",
        rol: "Calidad",
        estado: "INACTIVO",
      },
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al obtener el usuario",
      user: {
        id: 0,
        numEmpleado: 0,
        nombre: "",
        email: "",
        rol: "",
        estado: "",
      },
    };
  }
}

export async function insertUser(
  formData: FormData,
): Promise<{ ok: boolean; message: string }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const id = formData.get("id");
    const email = formData.get("email");
    const nombre = formData.get("nombre");
    const numEmpleado = formData.get("numEmpleado");
    const rol = formData.get("rol");
    const estado = formData.get("estado");

    console.log({
      id: id,
      email: email,
      nombre: nombre,
      numEmpleado: numEmpleado,
      rol: rol,
      estado: estado,
    });

    return {
      ok: true,
      message: "Usuario ingresado correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Hubo un error al ingresar el usuario",
    };
  }
}

export async function deleteUser(
  id: number,
): Promise<{ ok: boolean; message: string }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ok: true,
      message: "Se eliminó el usuario correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al eliminar el usuario",
    };
  }
}

export async function updateUserStatus(
  id: number,
  estatus: string,
): Promise<{ ok: boolean; message: string }> {
  try {
    // Simular delay del backend
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ok: true,
      message: "Se cambió el estatus del usuario correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al cambiar el estatus del empleado",
    };
  }
}
