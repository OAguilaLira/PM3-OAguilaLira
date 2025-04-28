import { Router } from "express";
import routerAppointments from "./appointmentsRouter";
import routerUser from "./usersRouter";

const router: Router = Router();

router.use("/", routerAppointments);
// router.use("/", routerUser);

export default router;
