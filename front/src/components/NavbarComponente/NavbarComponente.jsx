import styles from "./NavbarComponente.module.css";
import LinksNavegacion from "../LinksNavegacion/LinksNavegacion";
import logo from "/LogoR.png";
import logoUsuario from "/user.png";
import { useState } from "react";
import { Navbar, Nav} from "react-bootstrap";
// import BotonLogout from "../BotonLogout/BotonLogout";

const NavbarComponente = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="light" expand="lg" expanded={expanded}>
      <div id={styles.contenedorLogoPagina} href="/home">
        <img className={styles.logoPagina} src={logo} alt="" />
      </div>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(!expanded)}
        className={styles.botonHamburgesa}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav id={styles.navBarInversa} className={`${styles.barraNavegacion} ms-auto`}>
          <LinksNavegacion />
          {/* < BotonLogout /> */}
         
            <img className={styles.imagenUsuario} src={logoUsuario} alt="" />
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponente;

{
  /* <div className={styles.barraNavegacion}>
            <img src={logo} alt="Logo Turnos" />
            <LinksNavegacion />
            <img src={logoUsuario} alt="" />
        </div> */
}

