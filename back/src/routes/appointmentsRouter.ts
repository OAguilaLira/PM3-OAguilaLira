import { Router } from "express";
import { cancelAppointment, createAppointment, getAllappointments, getAppointment } from "../controllers/appointmentsController";
import { configurarZonaHoraria } from "../middlewares/configurarZonaHoriaReq";
import { revisarDatosAppointment } from "../middlewares/revisarDatosAppointmentDto";


const routerAppointments: Router = Router();

routerAppointments.get("/appointments", getAllappointments);
routerAppointments.get("/appointment/:id", getAppointment);
routerAppointments.post("/appointment/schedule", revisarDatosAppointment, configurarZonaHoraria ,createAppointment);
routerAppointments.put("/appointment/cancel/:id", cancelAppointment);



export default routerAppointments;