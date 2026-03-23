"use server";

import { UserRepositoryNeon } from "../adapters/user-repository-neon";
import { GetAllUsers } from "../../application/get-all-users";

export async function getAllUsersAction() {
  try {
    const repo = new UserRepositoryNeon();
    const useCase = new GetAllUsers(repo);
    const data = await useCase.execute();

    return {
      data: data,
      count: data.length,
      ok: true,
      message: "Usuarios obtenidos correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Ocurrió un error al obtener los usuarios",
      data: [],
      count: 0,
    };
  }
}
