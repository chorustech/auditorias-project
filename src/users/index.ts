import { Roles } from "@/db/schemas/usuario"

export type UserPrimitive = {
    id: number,
    numEmpleado: number,
    nombre: string,
    email: string,
    password: string,
    rol: Roles,
    estado: boolean
}


export class User {
    constructor(public numEmpleado: number, public nombre: string, public email: string, public password: string, public rol: Roles, public estado: boolean) { }

    comparePassword(password: string): boolean {
        return this.password === password
    }
}

export type SaveUserDTO = {
    numEmpleado: number,
    nombre: string,
    email: string,
    password: string,
    rol: Roles,
}

export interface UserRepository {
  create(user: SaveUserDTO): Promise<void | UserPrimitive>;
  findByEmail(email: string): Promise<UserPrimitive | null>;
  findByNumEmpleado(numEmpleado: number): Promise<UserPrimitive | null>;
  delete(id: number): Promise<void>;
  updateStatus(id: number, status: boolean): Promise<void>;
}