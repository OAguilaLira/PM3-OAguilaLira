import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
// import { useNavigate } from "react-router-dom";
import styles from './BotonLogout.module.css';

const BotonLogout = () => {
    const dispath = useDispatch()
    // const navigate = useNavigate()
    const handleOnclick = () => {
        dispath(logout())
        // navigate("/")
    }

    return (
        <button className={styles.boton} onClick={handleOnclick}>
            Cerrar sesión
        </button>
    )
}

export default BotonLogout;