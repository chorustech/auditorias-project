"use server";

import { db } from "@/db";
import { AreaTable } from "@/db/schemas/area";

export async function getAllAreas() {
  try {
    const areas = await db.select().from(AreaTable);
    return {
      ok: true,
      data: areas,
      message: "",
    };
  } catch (error) {
    console.error("Error fetching areas:", error);
    return {
      ok: false,
      data: [],
      message: "No se pudieron obtener las áreas.",
    };
  }
}
