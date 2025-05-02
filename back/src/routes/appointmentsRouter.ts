import { Router } from "express";
// import { cancelAppointment, createAppointment, getAllappointments, getAppointment } from "../controllers/appointmentsController";
import { configurarZonaHoraria } from "../middlewares/configurarZonaHoriaReq";
import { revisarDatosAppointment } from "../middlewares/revisarDatosAppointmentDto";

import { AppointmentRepository } from "../repositories/appointmentRepository";
import {
  AppointmentModel,
  ServiceModel,
  UserModel,
} from "../config/data-source";
import { ServiceRepository } from "../repositories/serviceRepository";
import { UserRepository } from "../repositories/userRepository";
import { AppointmentService } from "../services/appointmentsServices";
import { ServiceService } from "../services/servicesServices";
import { UserService } from "../services/userServices";
import { AppointmentController } from "../controllers/appointmentsController";

const appointmentRepository = new AppointmentRepository(AppointmentModel);
const serviceRepository = new ServiceRepository(ServiceModel);
const userRepository = new UserRepository(UserModel);

const servicesService = new ServiceService(serviceRepository);
const userService = new UserService(userRepository);
const appointmentService = new AppointmentService(
  appointmentRepository,
  servicesService,
  userService
);

// console.log(appointmentService);

const appointmentController = new AppointmentController(appointmentService);

const routerAppointments: Router = Router();

// routerAppointments.get("/appointments", getAllappointments);
// routerAppointments.get("/appointment/:id", getAppointment);
routerAppointments.post(
  "/appointment/schedule",
  revisarDatosAppointment,
  configurarZonaHoraria,
  (req, res) => appointmentController.createAppointment(req, res)
);
// routerAppointments.put("/appointment/cancel/:id", cancelAppointment);

export default routerAppointments;
