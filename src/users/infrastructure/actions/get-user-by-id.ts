"use server";

import { db } from "@/db";
import { UsuarioTable } from "@/db/schemas/usuario";
import { eq } from "drizzle-orm";

export async function getUserByIdAction(userId: number) {
  try {
    const user = await db
      .select()
      .from(UsuarioTable)
      .where(eq(UsuarioTable.id, userId));

    if (user.length === 0) {
      return {
        ok: false,
        data: null,
        message: "Usuario no encontrado.",
      };
    }

    return {
      ok: true,
      data: user[0],
      message: "",
    };
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return {
      ok: false,
      data: null,
      message: "Ocurrió un error al obtener el usuario.",
    };
  }
}
