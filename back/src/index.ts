import "reflect-metadata";
import server from "./server";
import { config } from "./config/envs";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then((res) => {
  console.log("Conexión exitosa con la base de datos");
  server.listen(config.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${config.PORT}`);
  });
});
