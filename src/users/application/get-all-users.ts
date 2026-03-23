import { UserPrimitive, UserRepository } from "@/src/users";

export class GetAllUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserPrimitive[]> {
    return await (this.userRepository as any).getAll();
  }
}
