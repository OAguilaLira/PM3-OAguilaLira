import { AppointmentEntity } from "../entities/Appointment";
import StatusAppointment from "../enums/StatusAppointment";
import appointmentDto from "../dto/appointmentDto";
import { AppointmentModel } from "../config/data-source";
import { getUserService } from "./userServices";

export const getAllappointmentsService = async (): Promise<AppointmentEntity[]> => {
  const registerAppointments = await AppointmentModel.find({
    relations: {
      user: true
    }
  });
  if(!registerAppointments) throw new Error('No hay turnos registrados');
  return registerAppointments;
};

const ajustarZonaHoraria = (fecha: Date): Date => {
  const año = fecha.getUTCFullYear();
  const mes = fecha.getUTCMonth();
  const dia = fecha.getUTCDate();
  const hora = fecha.getUTCHours();
  const minuto = fecha.getUTCMinutes();
  const segundo = fecha.getUTCSeconds();
  return new Date(Date.UTC(año, mes, dia, hora - 6, minuto, segundo));
};

export const getAppointmentService = async (id: number): Promise<AppointmentEntity> => {
  const turnoBuscado: AppointmentEntity | null = await AppointmentModel.findOne({ 
    where: {
      id,
    },
    relations: {
      user: true,
    },
   });
  if (turnoBuscado) {
    turnoBuscado.date = ajustarZonaHoraria(turnoBuscado.date);
    turnoBuscado.time = ajustarZonaHoraria(turnoBuscado.time);
    return turnoBuscado;
  } else {
    throw new Error("El turno no existe");
  }
};

export const createAppointmentService = async (appointmentInformation: appointmentDto): Promise<string> => {
  
  const newAppointment: AppointmentEntity = await AppointmentModel.create(appointmentInformation);
  newAppointment.status = StatusAppointment.ACTIVE;
  newAppointment.user = await getUserService(appointmentInformation.userId);
  await AppointmentModel.save(newAppointment);
  return "El turno se creo con exito";
};

export const cancelAppointmentService = async (id: number): Promise<void> => {
  const turnoBuscado: AppointmentEntity = await getAppointmentService(id);
  if(turnoBuscado.status === StatusAppointment.CANCELLED) {
    throw new Error("El turno ya está cancelado")
  } else {
    turnoBuscado.status = StatusAppointment.CANCELLED;
  await AppointmentModel.save(turnoBuscado);
  }
};
