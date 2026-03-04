import { SearchArea } from "@/src/reporte-auditoria/domain/repositorios/areas";
import { db } from "@/db";
import { AreaTable } from "@/db/schemas/area";
import { eq } from "drizzle-orm";

export class SearchAreaNeon implements SearchArea {
  constructor(private readonly _db = db) {}

  async search(slug: string): Promise<number> {
    const areaFound = await this._db
      .select()
      .from(AreaTable)
      .where(eq(AreaTable.slug, slug));

    if (areaFound[0]) return areaFound[0].id;

    return 0;
  }
}
