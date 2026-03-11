"use server"

import { ROLES } from "@/db/schemas/usuario";
import { DrizzleUserRepository } from "../repositories/drizzle";
import { CreateService } from "../services/create";
import { z } from "zod";

const UserSchema = z.object({
  email: z.email("Email inválido"),
  nombre: z.string().min(2, "El nombre es muy corto"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  numEmpleado: z.coerce.number().int().positive("Número de empleado requerido"),
  rol: z.enum(ROLES),
});

export async function insertUser(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = UserSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        ok: false,
        message: "Datos inválidos",
        errors: z.treeifyError(validatedFields.error), // Devuelve qué falló específicamente
      };
    }

    const repo = new DrizzleUserRepository();
    const uc = new CreateService(repo);

    await uc.exec(validatedFields.data);

    return {
      ok: true,
      message: "Usuario ingresado correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error interno del servidor",
    };
  }
}
