import { useEffect } from "react";
import { TurnoComponente } from "../../components/TurnoComponente/TurnoComponente";
import styles from "./MisTurnos.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { establecerAppointments } from "../../redux/userSlice";
import SinTurnos from "../../components/SinTurnos/SinTurnos";

export const MisTurnos = () => {
  const loginData = useSelector((state) => state.login);
  const userId = useSelector((state) => state.user.id);
  const turnosActuales = useSelector((state) => state.userAppointment);
  const dispath = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginData) {
      navigate("/");
    } else {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((response) =>
          dispath(establecerAppointments(response.data.user.appointments))
        )
        .catch((error) => {
          alert(error.response ? error.response.data : error);
        });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

  let añosUnicos = [];

  
  turnosActuales.forEach(turno => {
   
    const año = new Date(turno.date).getFullYear();
    if (!añosUnicos.includes(año)) {
      añosUnicos.push(año);
    }
  });

  const turnosHTML = turnosActuales.map((turno) => {
    return <TurnoComponente key={turno.id} turno={turno} />;
  });
  console.log(turnosActuales)
  return (
    <>
      {turnosActuales.length ? (
        <>
          <h1 className={styles.año}>{añosUnicos}</h1>
          <div className={styles.contenedor}>{turnosHTML}</div>
        </>
      ) : (
        <SinTurnos />
      )}
    </>
  );
};
