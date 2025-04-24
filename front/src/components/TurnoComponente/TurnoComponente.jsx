
/* eslint-disable react/prop-types */
// import { useState } from "react";
import styles from "./TurnoComponente.module.css";
import axios from "axios";
import {modificarStatusAppointment} from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";


export const TurnoComponente = ({ turno }) => {
  // const [estatusTurno, setEstatusTuno] = useState(turno.status)
  
  const dispath = useDispatch();
  const opcionesFormatoHora = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

 

  const opcionesFormatoFecha = {
    day: "numeric",
    year: "numeric",
    weekday: "long",
    month: "long",
    timeZone: "America/Mexico_City",
  };
  const fechaLuxon = DateTime.fromISO(turno.date).toLocaleString(opcionesFormatoFecha)
  .replace(/,|de /g, "")
  .split(" ");
  const fechaFormateada = new Date(turno.date)
    .toLocaleDateString("es-MX", opcionesFormatoFecha)
    .replace(/,|de /g, "")
    .split(" ");
  // eslint-disable-next-line no-unused-vars
  console.log('## fecha formateada')
  console.log(fechaFormateada.join(' '))
  const [dia, numeroDia, mes, año] = fechaFormateada;

  
  console.log(fechaLuxon)
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    const fechaTurno = new Date(turno.date);
    fechaTurno.setHours(0, 0, 0, 0);

    const valicacionCancelacionCita =  fechaActual < fechaTurno;
  
  const cancelarTurno = () => {

    axios
      .put(`http://localhost:3000/appointment/cancel/${turno.id}`).
      then(() => dispath(modificarStatusAppointment(turno.id)))
      .catch((error) => alert(error.response.data));
  };

  const tiempoLuxon = DateTime.fromISO(turno.time)


  const horaFormateada = tiempoLuxon.toLocaleString(DateTime.TIME_SIMPLE)
  
  return (
    <div>
      <div className={styles.tarjeta}>
        <p className={styles.parrafoCitas}>{dia}</p>
        <h2>{numeroDia}</h2>
        <h5>{mes}</h5>
        <h5>
          {horaFormateada}
        </h5>
        <p className={styles.parrafoCitas}>{turno.status === 'active' ? 'Activo' : 'Cancelada'}</p>
        <button disabled={turno.status === 'canceled' || !valicacionCancelacionCita} onClick={cancelarTurno}>Cancelar</button>
      </div>
    </div>
  );
};
