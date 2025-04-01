import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllappointmentsService, getAppointmentService } from "../services/appointmentsServices";
import { AppointmentEntity } from "../entities/Appointment";

export const getAllappointments = async (req:Request, res: Response): Promise<void> => {
  try {
    const appointments: AppointmentEntity[] = await getAllappointmentsService();
    res.status(200).json({turnos: appointments});
  } catch (error: any) {
    res.status(404).json({message: error.message})
  }
  
};

export const getAppointment = async (req:Request, res: Response): Promise<void> => {
  try {
    const appointmentId: number = Number(req.params.id);
    const appointment: AppointmentEntity = await getAppointmentService(appointmentId);
    res.status(200).json({turno: appointment});
  } catch (error: any) {
    res.status(404).json({error: error.message})
  }
};

export const createAppointment = async (req:Request, res: Response): Promise<void> => {
  try {
    const mensaje:string = await createAppointmentService(req.body)
    res.status(201).json({message: mensaje});
  } catch (error: any) {
    res.status(400).json({message: 'No se pudo realizar el registro'})
  }
  
};

export const cancelAppointment = async (req:Request, res: Response): Promise<void> => {
  try {
    const idAppointment: number = Number(req.params.id);
    await cancelAppointmentService(idAppointment);
    res.status(200).json({message: "El turno fue cancelado exitosamente"});
  } catch (error: any) {
    res.status(404).json(error.message)
  }
};
