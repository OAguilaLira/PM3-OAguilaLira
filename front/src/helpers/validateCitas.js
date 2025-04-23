import { DateTime } from 'luxon'

const INICIO_HORA_LABORAL = 7;
const FIN_HORA_LABORAL = 19;

export const validateCitas = (values) => {
    const appointmentTimestamp = DateTime.fromISO(values);
    // const errors = {}
    // if(!values.date){
    //     errors.date = 'El campo fecha no puede estar vacio'
    // } else if(!esDiaHabil(values.date)){
    //     errors.date = 'No se pueden agendar citas en fines de semana'
    // } 
    // else if(!validarFecha(values.date)) {
    //     errors.date = 'La fecha no puede ser anterior a la actual ni mayor a un año de la misma'
    // }

    // let [hours, minutes] = values.time.split(':').map(Number);
    // console.log(hours)
    // if(!values.time){
    //     errors.time = 'El campo hora no puede estar vacio'
    // } else if(!(hours >= inicioHorarioLaboral && hours < finHorarioLaboral)){
    //     errors.time = 'El horario de atención es de 7:00 AM a 7:00 PM'
    // } 
    // else if(!(minutes === 0 || minutes === 30)) {
    //     errors.time = 'Las citas sólo pueden agendarse cada 30 minutos comenzando desde 7:00 AM'
    // }
    return appointmentTimestamp;
}

function validarFecha (values) {
    const currentDate = new Date();
    const selectedDate = new Date(values);
    const maxDate = new Date(currentDate);
    maxDate.setFullYear(currentDate.getFullYear() + 1);

    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);

    return selectedDate >= currentDate && selectedDate <= maxDate;
}

function esDiaHabil (dateString) {
    const fecha = new Date(dateString);
    const diaSemana = fecha.getUTCDay(); 
    return diaSemana !== 0 && diaSemana !== 6;
  }

