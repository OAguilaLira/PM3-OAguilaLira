import { Router } from "express";
// import { getAllUsers, getUser, loginUser, registerUser } from "../controllers/userController";
import { revisarDatosUsuarioDto } from "../middlewares/revisarDatosUsuario";

const usersRouter = Router();

// usersRouter.get("/users/:id", getUser);
// usersRouter.get("/users", getAllUsers);
// usersRouter.post("/users/register", revisarDatosUsuarioDto, registerUser);
// usersRouter.post("/users/login", loginUser);

export default usersRouter;
