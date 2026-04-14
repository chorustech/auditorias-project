import { User, UserPrimitive, UserRepository } from ".."
import b from "bcrypt"

export class LoginService {
    constructor(private userRepository: UserRepository) { }

    async exec({email, password}: {email: string, password: string}): Promise<UserPrimitive> {
        console.log("Intentando iniciar sesión con email:", email) // Agrega este log para verificar el email recibido
        const user = await this.userRepository.findByEmail(email)
        console.log("Usuario encontrado:", user) // Agrega este log para verificar el usuario encontrado
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