import { Service } from "../entities/Service";
import { ServiceModel } from "../config/data-source";
import { ServiceRepository } from "../repositories/serviceRepository";

export class ServiceService {
  constructor(private serviceRepository: ServiceRepository) {}

  async findOneById(id: string): Promise<Service | null> {
    const service: Service | null = await this.serviceRepository.findOneById(
      id
    );
    if (!service) {
      throw new Error("Servicio no encontrado");
    }
    return service;
  }
}
