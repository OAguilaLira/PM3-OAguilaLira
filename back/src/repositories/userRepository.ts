import { Repository } from "typeorm";
import { Service } from "../entities/Service";
import { UserEntity } from "../entities/User";

export class UserRepository {
  constructor(private repository: Repository<UserEntity>) {}

  async findOneById(id: string): Promise<UserEntity | null> {
    const user: UserEntity | null = await this.repository.findOneBy({ id });
    return user;
  }
}
