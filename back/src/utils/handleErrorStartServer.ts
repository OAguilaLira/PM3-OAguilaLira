import { Server } from "http";
import logger from "../logger";
import { config } from "../config/envs";

let message: string = "Server failed to start";
export const handleErrorStartServer = (server: Server) => {
  server.on("error", (error: NodeJS.ErrnoException) => {
    switch (error.code) {
      case "EADDRINUSE":
        message = message + `, Port ${config.PORT} is already in use`;
        break;
      case "EACCES":
        message =
          message + `. Insufficient privileges to bind to PORT: ${config.PORT}`;
        break;
    }
    logger.error(`${message}`, error);
    process.exit(1);
  });
};
