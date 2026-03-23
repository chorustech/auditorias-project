"use server";

import { db } from "@/db";
import { UsuarioTable } from "@/db/schemas/usuario";
import { eq } from "drizzle-orm";
import { UserPrimitive } from "../..";

export async function updateUserAction(
  userId: number,
  userData: Partial<UserPrimitive>,
) {
  try {
    const updatedUser = await db
      .update(UsuarioTable)
      .set(userData)
      .where(eq(UsuarioTable.id, userId))
      .returning();

    if (updatedUser.length === 0) {
      return {
        ok: false,
        message: "El usuario no fue encontrado para actualizar.",
      };
    }

    return {
      ok: true,
      message: "Usuario actualizado exitosamente.",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      ok: false,
      message: "Ocurrió un error al actualizar el usuario.",
    };
  }
}
