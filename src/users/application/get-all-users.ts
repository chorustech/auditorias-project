import { IQuery } from "@/src/shared/domain/Entities/Query";
import { UserPrimitive, UserRepository } from "@/src/users";

export class GetAllUsers {
  constructor(private readonly repo: UserRepository) {}

  async execute(
    query: IQuery<UserPrimitive>,
  ): Promise<{ data: UserPrimitive[]; count: number }> {
    return this.repo.getAll(query);
  }
}
