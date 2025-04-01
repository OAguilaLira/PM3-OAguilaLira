import llorando  from "/llorando.png"
import styles from './SinTurnos.module.css'

const SinTurnos = () => {
    return (
        <div className={styles.contenedor}>
            <h2>Aún no tienes ningún turnos registrados con nosotros</h2>
            <img className={styles.imagen} src={llorando} alt="cara llorando" />
        </div>
    )
}

export default SinTurnos;