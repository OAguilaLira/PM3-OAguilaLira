import { DateTime } from 'luxon'

const INICIO_HORA_LABORAL = 7;
const FIN_HORA_LABORAL = 19;

export const validateCitas = (date) => {
    // const appointmentTimestamp = DateTime.fromISO(values);
    const errors = {}
    if(!date){
        errors.date = 'El campo fecha no puede estar vacio'
    } else if(!esDiaHabil(date)){
        errors.date = 'No se pueden agendar citas en fines de semana'
    } 
    else if(!validarFecha(date)) {
        errors.date = 'La fecha no puede ser anterior a la actual ni mayor a un año de la misma'
    }
    else if(!validarHora(date)) {
        errors.date = 'La hora seleccionada no es valida'
    }
    return errors;
}

function validarFecha (date) {
    const currentDate = DateTime.now()
    const selectedDate = date
    const maxDate = selectedDate.plus({year: 1})
    return selectedDate >= currentDate && selectedDate <= maxDate;
}

function esDiaHabil (dateString) {
    console.log(dateString)
    const day = dateString.weekday
    console.log(day)
    return day >= 1 && day <= 5;
  }

function validarHora (date) {
    const hourDate = date.hour
    console.log(hourDate)
    return hourDate >= INICIO_HORA_LABORAL && hourDate <= FIN_HORA_LABORAL;
}
