"use server";

import { UserRepositoryNeon } from "../adapters/user-repository-neon";

export async function updateUserStatusAction(id: number, status: boolean) {
  console.log(`Updating status for user ${id} to ${status}`);
  try {
    const repo = new UserRepositoryNeon();
    await (repo as any).updateStatus(id, status);

    return {
      ok: true,
      message: "Estatus de usuario actualizado correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Ocurrió un error al actualizar el estatus del usuario",
    };
  }
}
