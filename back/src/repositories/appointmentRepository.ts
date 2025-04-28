import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { AppointmentEntity } from "../entities/Appointment";

export class AppointmentRepository {
  constructor(private repository: Repository<AppointmentEntity>) {}

  async isSlotTaken(serviceId: string, startDate: Date, endDate: Date) {
    const count = await this.repository.count({
      where: [
        {
          service: { id: serviceId },
          startDate: Between(startDate, endDate),
        },
        {
          service: { id: serviceId },
          endDate: Between(startDate, endDate),
        },
        {
          service: { id: serviceId },
          startDate: LessThanOrEqual(startDate),
          endDate: MoreThanOrEqual(endDate),
        },
      ],
    });

    return count > 0;
  }

  async create(appointment: AppointmentEntity) {
    return this.repository.save(appointment);
  }
}
