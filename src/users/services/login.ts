import { User, UserPrimitive, UserRepository } from ".."
import b from "bcrypt"

export class LoginService {
    constructor(private userRepository: UserRepository) { }

    async exec({email, password}: {email: string, password: string}): Promise<UserPrimitive> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new Error("Usuario no encontrado")
        }

        // Desencriptar la contraseña y compararla
        const isMatch = await b.compare(password, user.password)
        if (!isMatch) {
            throw new Error("Contraseña incorrecta")
        }

        if (!user.estado) {
            throw new Error("Usuario inactivo")
        }
        
        return user
    }
}