"use server";

import { UserRepositoryNeon } from "../adapters/user-repository-neon";

export async function deleteUserAction(id: number) {
  try {
    const repo = new UserRepositoryNeon();
    await (repo as any).delete(id);

    return {
      ok: true,
      message: "Usuario eliminado correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Ocurrió un error al eliminar el usuario",
    };
  }
}
