import helmet from "helmet";
import express from "express";
import router from "./routes";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("appointmentApp", router);

export default app;
