"use server"

import { DrizzleUserRepository } from "../repositories/drizzle";
import { z } from "zod";
import { LoginService } from "../services/login";
import { cookies } from "next/dist/server/request/cookies";

const UserSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});


export async function LoginAction(formData: FormData) {
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
        const uc = new LoginService(repo);

        const user = await uc.exec(validatedFields.data);

        const cookieStore = await cookies();

        cookieStore.set("user", JSON.stringify({
            id: user.numEmpleado,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        }), {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return {
            ok: true,
            message: "Usuario ingresado correctamente",
        };
    } catch (error) {
        console.error("Login error:", error);

        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error interno del servidor",
        };
    }
}