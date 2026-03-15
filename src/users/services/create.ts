import { SaveUserDTO, UserRepository } from "..";
import b from "bcrypt"

export class CreateService {
    constructor(private userRepository: UserRepository) { }

    async exec(dto: SaveUserDTO): Promise<void> {

        const DOMINIOS_PERMITIDOS = ["@empresa.com", "@dominio.com"]
        const dominioEmail = dto.email.substring(dto.email.lastIndexOf("@"))
        if (!DOMINIOS_PERMITIDOS.includes(dominioEmail)) {
            throw new Error("Dominio de email no permitido")
        }

        const existingUser = await this.userRepository.findByEmail(dto.email)
        if (existingUser) {
            throw new Error("Email ya registrado")
        }

        const existingNumEmpleado = await this.userRepository.findByNumEmpleado(dto.numEmpleado)
        if (existingNumEmpleado) {
            throw new Error("Número de empleado ya registrado")
        }

        // Encriptar la password antes de guardarla (esto es un ejemplo, en producción deberías usar una librería como bcrypt)
        const passwordHash = await b.hash(dto.password, 10)
        dto.password = passwordHash

        await this.userRepository.create(dto)
        
        return 
    }
}