"use server";

import { db } from "@/db";
import { UsuarioTable } from "@/db/schemas/usuario";
import { eq } from "drizzle-orm";

export async function deleteUserAction(userId: number) {
  try {
    const deletedUser = await db
      .delete(UsuarioTable)
      .where(eq(UsuarioTable.id, userId))
      .returning();

    if (deletedUser.length === 0) {
      return {
        ok: false,
        message: "El usuario no fue encontrado.",
      };
    }

    return {
      ok: true,
      message: "Usuario eliminado exitosamente.",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      ok: false,
      message: "Ocurrió un error al eliminar el usuario.",
    };
  }
}
