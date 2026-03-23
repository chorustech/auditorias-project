import { db } from "@/db";
import { UsuarioTable } from "@/db/schemas/usuario";
import { and, eq } from "drizzle-orm";
import { SaveUserDTO, UserPrimitive, UserRepository } from "@/src/users";

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
    const user = await this._db
      .select()
      .from(UsuarioTable)
      .where(eq(UsuarioTable.email, email));

    return user[0] || null;
  }

  async findByNumEmpleado(numEmpleado: number): Promise<UserPrimitive | null> {
    const user = await this._db
      .select()
      .from(UsuarioTable)
      .where(eq(UsuarioTable.numEmpleado, numEmpleado));

    return user[0] || null;
  }

  async getAll(): Promise<UserPrimitive[]> {
    return await this._db.select().from(UsuarioTable);
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
