import { db } from "@/db";
import { SaveUserDTO, UserPrimitive, UserRepository } from "..";
import { UsuarioTable } from "@/db/schemas/usuario";
import { eq } from "drizzle-orm";

export class DrizzleUserRepository implements UserRepository {
    constructor(private readonly _db = db) { }

    async create(user: SaveUserDTO): Promise<void> {
        await this._db.insert(UsuarioTable).values({ email: user.email, nombre: user.nombre, password: user.password, numEmpleado: user.numEmpleado, rol: user.rol })
    }

    async findByEmail(email: string): Promise<UserPrimitive | null> {
        const res =  await this._db.select().from(UsuarioTable).where(eq(UsuarioTable.email, email))
        return res[0] || null
    }

    async findByNumEmpleado(numEmpleado: number): Promise<UserPrimitive | null> {
        const res = await this._db.select().from(UsuarioTable).where(eq(UsuarioTable.numEmpleado, numEmpleado))
        return res[0] || null
    }

    async delete(id: number): Promise<void> {
        await this._db.delete(UsuarioTable).where(eq(UsuarioTable.id, id));
    }

    async updateStatus(id: number, status: boolean): Promise<void> {
        await this._db.update(UsuarioTable).set({ estado: status }).where(eq(UsuarioTable.id, id));
    }
}
