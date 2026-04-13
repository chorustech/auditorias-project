"use server";
import { UserRepositoryNeon } from "../adapters/user-repository-neon";
import { GetAllUsers } from "../../application/get-all-users";
import { UserPrimitive } from "@/src/users";
import { IQuery } from "@/src/shared/domain/Entities/Query";

export async function getAllUsersAction(query: IQuery<UserPrimitive>) {
  try {
    const repo = new UserRepositoryNeon();
    const useCase = new GetAllUsers(repo);
    const { data, count } = await useCase.execute(query);
    return {
      data,
      count,
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
