import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Home.module.css'

const Home = () => {
    const isLogin = useSelector((state) => state.login);
    const navigate = useNavigate()
    useEffect(() => {
      if (!isLogin) {
        navigate("/");
      } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isLogin]);
  
    return (
        <div className={styles.contenedor}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.contenido}>
                <h1>Estas en la página web de nuestra clínica veterinaria</h1>
                <h4>Aquí podras agendar todas las citas que consideres necesarias para tu mascota</h4>
                <h5>Nuestro horario de atención es de 7:00 AM a 7:00 PM</h5>
                <h5>Cada cita tiene una duración de 30 minutos</h5>
                <h5>Y trabajamos de lunes a viernes</h5>
            </div>    
        </div>
    )
}

export default Home;