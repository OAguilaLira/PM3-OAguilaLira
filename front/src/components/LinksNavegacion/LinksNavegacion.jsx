import BotonLogout from "../BotonLogout/BotonLogout";
import styles from "./LinksNavegacion.module.css";
import { Link } from "react-router-dom";

const paginas = [{nombre:'Home', ruta: 'home'}, {nombre: 'Turnos', ruta: 'turnos'}, {nombre: 'Agendar turno', ruta: 'agendarTurno'}];

const LinksNavegacion = () => {
    const paginasAetiquetas = paginas.map((pagina) => {
        return <li className={`${styles.link} nav-item`} key={pagina.nombre}>
            <Link className="nav-link" to={`/${pagina.ruta}`}>{pagina.nombre}</Link>
            </li>
    })
    paginasAetiquetas.push(<BotonLogout key='btnLogout'/>)
    return (
        <>
            <ul className={`${styles.contenedor} navegador2 navbar-nav nav-underline mb-2 mb-lg-0 justify-content-center`}>{paginasAetiquetas}</ul>
        </>
    )
}

export default LinksNavegacion;


