import { Request, Response, NextFunction } from "express"

const inicioHoraLaboral: number = 7;
const finHoraLaboral: number = 19;

export const revisarDatosAppointment = (req: Request, res: Response, next: NextFunction) => {
    const {date, time, userId} = req.body;
    if (!date || !time || !userId) {
        res.status(400).json("Faltan ingresar algunos datos")
    }
    else if(!esDiaHabil(req.body.date)) {
        res.status(400).json("No se pueden agendar citas en fin de semana")
    }
    else if(!esHorarioLaboral(req.body.date, inicioHoraLaboral, finHoraLaboral)){
        res.status(400).json("El horario de atención es de 7:00 AM a 7:00 PM")
    }
    else {
        next()
    }
    
}

function esDiaHabil (dateString: string) {
    
    const fecha = new Date(dateString);
    console.log(fecha)
    const diaSemana = fecha.getUTCDay(); 
    console.log(diaSemana)
    return diaSemana !== 0 && diaSemana !== 6;
  };

 function esHorarioLaboral (dateString:string, inicio: number, fin: number) {
    const date = new Date(dateString);
    const hours = date.getUTCHours();
  
    return hours >= inicio && hours < fin;
  };