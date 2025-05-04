import { AppDataSource } from "../config/data-source";
import { config } from "../config/envs";
import { createLogger } from "../logger";
import logger from "../logger";
import { logDatabaseError } from "./loggerDBerrorsConection";

const loggerPersonalizado = createLogger(__filename);

export const connectDBwithRetry = async (retries = 5, delay = 3000) => {
  let error;
  while (retries > 4) {
    try {
      await AppDataSource.initialize();
      logger.info("Database connected");
      return;
    } catch (err: any) {
      logger.warn(`DB connection failed. Retries left: ${retries - 1}`);
      retries--;
      await new Promise((res) => setTimeout(res, delay));
      error = err;
    }
  }
  // logger.error(`Error actual: ${error}`);
  // console.log(error.stack);
  // logDatabaseError(error, config, __filename);
  // logger.error("Error al conectarse a la base de datos", error);
  throw error;
};
