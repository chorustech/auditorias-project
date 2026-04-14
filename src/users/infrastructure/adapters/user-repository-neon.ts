import { db } from "@/db";
import { UsuarioTable } from "@/db/schemas/usuario";
import {
  and,
  asc,
  desc,
  eq,
  ne,
  lt,
  lte,
  gt,
  gte,
  ilike,
  AnyColumn,
  sql,
} from "drizzle-orm";

import { SaveUserDTO, UserPrimitive, UserRepository } from "@/src/users";
import { IQuery } from "@/src/shared/domain/Entities/Query";

export class UserRepositoryNeon implements UserRepository {
  constructor(private readonly _db = db) {}

  async create(user: SaveUserDTO): Promise<void | UserPrimitive> {
    const newUser = await this._db
      .insert(UsuarioTable)
      .values(user)
      .returning();

    return newUser[0];
  }

  async findByEmail(email: string): Promise<UserPrimitive | null> {

    console.log("UserRepositoryNeon.findByEmail - email:", email); // Agrega este log para verificar el email recibido
    const user = await this._db
      .select()
      .from(UsuarioTable)
      .where(eq(UsuarioTable.email, email));
    
      console.log("UserRepositoryNeon.findByEmail - user:", user); // Agrega este log para verificar el resultado de la consulta

    return user[0] || null;
  }

  async findByNumEmpleado(numEmpleado: number): Promise<UserPrimitive | null> {
    const user = await this._db
      .select()
      .from(UsuarioTable)
      .where(eq(UsuarioTable.numEmpleado, numEmpleado));

    return user[0] || null;
  }

  async getAll(
    query: IQuery<UserPrimitive>,
  ): Promise<{ data: UserPrimitive[]; count: number }> {
    const columnMap: Record<string, AnyColumn> = {
      id: UsuarioTable.id,
      numEmpleado: UsuarioTable.numEmpleado,
      nombre: UsuarioTable.nombre,
      email: UsuarioTable.email,
      rol: UsuarioTable.rol,
      estado: UsuarioTable.estado,
    };

    const filterConditions = query.filters.map(({ field, operator, value }) => {
      const col = columnMap[field as string];

      // Para nombre y email usamos ilike (búsqueda parcial case-insensitive)
      if ((field === "nombre" || field === "email") && operator === "=") {
        return ilike(col, `%${value}%`);
      }

      switch (operator) {
        case "=":
          return eq(col, value);
        case "!=":
          return ne(col, value);
        case "<":
          return lt(col, value);
        case "<=":
          return lte(col, value);
        case ">":
          return gt(col, value);
        case ">=":
          return gte(col, value);
      }
    });

    const orderCol = columnMap[query.orderBy as string];
    const orderFn = query.order === "asc" ? asc(orderCol) : desc(orderCol);
    const offset = query.page * query.perPage;
    const whereClause = and(...filterConditions);

    const [data, countResult] = await Promise.all([
      this._db
        .select()
        .from(UsuarioTable)
        .where(whereClause)
        .orderBy(orderFn)
        .limit(query.perPage)
        .offset(offset),
      this._db
        .select({ count: sql<number>`count(*)::int` })
        .from(UsuarioTable)
        .where(whereClause),
    ]);

    return { data, count: countResult[0].count };
  }

  async delete(id: number): Promise<void> {
    await this._db.delete(UsuarioTable).where(eq(UsuarioTable.id, id));
  }

  async updateStatus(id: number, status: boolean): Promise<void> {
    console.log(`Repository: Updating status for user ${id} to ${status}`);
    await this._db
      .update(UsuarioTable)
      .set({ estado: status })
      .where(eq(UsuarioTable.id, id));
  }
}
