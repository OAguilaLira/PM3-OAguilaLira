import NavbarComponente from "../NavbarComponente/NavbarComponente";
import { Outlet } from "react-router-dom";


const WithNavBar = () => {
    return (
        <>
            <NavbarComponente />
            <Outlet />
        </>
    )
}

export default WithNavBar;
