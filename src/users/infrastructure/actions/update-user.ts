"use server";

import { db } from "@/db";
import { UsuarioTable } from "@/db/schemas/usuario";
import { eq } from "drizzle-orm";
import { UserPrimitive } from "../..";
import bcrypt from "bcrypt";

export async function updateUserAction(
  userId: number,
  userData: Partial<UserPrimitive>,
) {
  try {

    const hashPassword = userData.password      ? await bcrypt.hash(userData.password, 10)
      : undefined;

    const userDataToUpdate = {
      ...userData,
      password: hashPassword,
    };

    const updatedUser = await db
      .update(UsuarioTable)
      .set(userDataToUpdate)
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
