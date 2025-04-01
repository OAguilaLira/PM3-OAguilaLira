import Home from "./views/Home/Home";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import { MisTurnos } from "./views/MisTurnos/MisTurnos";
import WithNavBar from "./components/utils/WithNavBar";
import AgendarTurno from "./views/AgendarTurno/AgendarTuno";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route element={<WithNavBar />}>
          <Route path="/turnos" element={<MisTurnos />} />
          <Route path="/home" element={<Home />} />
          <Route path="/agendarTurno" element={<AgendarTurno />} />
        </Route>
      </Routes>
    </>
  )
}
export default App
