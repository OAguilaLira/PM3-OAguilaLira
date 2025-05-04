import "reflect-metadata";
import app from "./app";
import { config } from "./config/envs";
import { connectDBwithRetry } from "./utils/handleDBconection";
import { Server } from "http";
import { createLogger } from "./logger";
import { handleErrorStartServer } from "./utils/handleErrorStartServer";
import { logDatabaseError } from "./utils/loggerDBerrorsConection";
// Crear un logger específico para este archivo
const logger = createLogger(__filename);

async function serverStart() {
  try {
    await connectDBwithRetry();
    const server: Server = app.listen(config.PORT, () => {
      logger.info(`Server running on http://localhost:${config.PORT}`);
    });

    handleErrorStartServer(server);
  } catch (error: any) {
    // logger.error("Failed to start server. DB connection failed", {
    //   stack: new Error().stack,
    //   conectionInformation: {
    //     PORT: config.PORT,
    //   },
    // });
    logger.error("Failed to start server. DB connection failed.", error);
    // logDatabaseError(error, config, __filename);
    process.exit(1);
  }
}

serverStart();
