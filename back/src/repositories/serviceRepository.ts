import { Repository } from "typeorm";
import { Service } from "../entities/Service";

export class ServiceRepository {
  constructor(private repository: Repository<Service>) {}

  async findOneById(id: string): Promise<Service | null> {
    const service: Service | null = await this.repository.findOneBy({ id });
    return service;
  }
}
