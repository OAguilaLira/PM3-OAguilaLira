import { AppointmentEntity } from "../entities/Appointment";
import StatusAppointment from "../enums/StatusAppointment";
import appointmentDto from "../dto/appointmentDto";
import { AppointmentModel } from "../config/data-source";
import { UserService } from "./userServices";
import { ServiceService } from "./servicesServices";
import { Service } from "../entities/Service";
import { calculateEndDate } from "../utils/appointmentUtils";
import { UserEntity } from "../entities/User";
import { AppointmentRepository } from "../repositories/appointmentRepository";

export class AppointmentService {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private servicesService: ServiceService,
    private userService: UserService
  ) {}
  async createAppointment(appointmentInformation: appointmentDto) {
    const { userId, serviceId, date, notes } = appointmentInformation;
    const service: Service | null = await this.servicesService.findOneById(
      serviceId
    );
    if (!service) {
      throw new Error("No existe el servicio buscado");
    }
    const user: UserEntity | null = await this.userService.findOneById(userId);
    if (!user) {
      throw new Error("El usuario indicado no existe");
    }

    const endDateNewAppointment = calculateEndDate(
      date,
      service.durationMinutes
    );
    const isSlotTaken = await this.appointmentRepository.isSlotTaken(
      service.id,
      date,
      endDateNewAppointment
    );

    if (isSlotTaken) {
      throw new Error("El horario indicadon no está disponible");
    }

    const appointment: AppointmentEntity = new AppointmentEntity();
    appointment.notes = notes ?? "";
    appointment.startDate = date;
    appointment.endDate = endDateNewAppointment;
    appointment.service = service;
    appointment.user = user;

    const savedAppointment: AppointmentEntity =
      await this.appointmentRepository.create(appointment);

    return {
      message: "Turno creado con exito",
      appointment: savedAppointment,
    };
    // return savedAppointment;
  }
}

// export const getAllappointmentsService = async (): Promise<
//   AppointmentEntity[]
// > => {
//   const registerAppointments = await AppointmentModel.find({
//     relations: {
//       user: true,
//     },
//   });
//   if (!registerAppointments) throw new Error("No hay turnos registrados");
//   console.log("#### Turno encontrados");
//   console.log(registerAppointments);
//   return registerAppointments;
// };

// const ajustarZonaHoraria = (fecha: Date): Date => {
//   const año = fecha.getUTCFullYear();
//   const mes = fecha.getUTCMonth();
//   const dia = fecha.getUTCDate();
//   const hora = fecha.getUTCHours();
//   const minuto = fecha.getUTCMinutes();
//   const segundo = fecha.getUTCSeconds();
//   return new Date(Date.UTC(año, mes, dia, hora - 6, minuto, segundo));
// };

// export const getAppointmentService = async (
//   id: string
// ): Promise<AppointmentEntity> => {
//   const turnoBuscado: AppointmentEntity | null = await AppointmentModel.findOne(
//     {
//       where: {
//         id,
//       },
//       relations: {
//         user: true,
//       },
//     }
//   );
//   if (turnoBuscado) {
//     turnoBuscado.date = ajustarZonaHoraria(turnoBuscado.date);
//     turnoBuscado.time = ajustarZonaHoraria(turnoBuscado.time);
//     return turnoBuscado;
//   } else {
//     throw new Error("El turno no existe");
//   }
// };

// export const cancelAppointmentService = async (id: number): Promise<void> => {
//   const turnoBuscado: AppointmentEntity = await getAppointmentService(id);
//   if (turnoBuscado.status === StatusAppointment.CANCELLED) {
//     throw new Error("El turno ya está cancelado");
//   } else {
//     turnoBuscado.status = StatusAppointment.CANCELLED;
//     await AppointmentModel.save(turnoBuscado);
//   }
// };
