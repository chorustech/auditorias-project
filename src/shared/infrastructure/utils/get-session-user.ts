"use server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { UsuarioTable } from "@/db/schemas/usuario";
import { eq } from "drizzle-orm";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    return null;
  }

  try {
    const userInCookie = JSON.parse(userCookie.value);

    // Verify user exists in the database using numEmpleado from the cookie's "id" field
    const dbUser = await db
      .select()
      .from(UsuarioTable)
      .where(eq(UsuarioTable.numEmpleado, userInCookie.id));

    if (dbUser.length === 0) {
      // User not found in DB, invalidate session
      return null;
    }

    // Return the full user object from the database
    return dbUser[0];
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
    return null;
  }
}
