// import { createLogger, format, level, transports } from "winston";
// import path from "path";
// import { DataBaseConfig } from "./interfaces/DataBaseConfig";

// const { combine, timestamp, printf, errors, colorize } = format;

// function getExternalCallerFileFallback(stack: string) {
//   const stackLines = stack?.split("\n") || [];

//   for (let line of stackLines) {
//     if (
//       line.includes(process.cwd()) &&
//       !line.includes("logger") &&
//       !line.includes("node_modules") &&
//       !line.includes("internal")
//     ) {
//       console.log("### Linea");
//       console.log(line);
//       const match = line.match(/\s*at\s+(?:\()?(.+\.(ts|tsx|js)):\d+:\d+\)?/);
//       if (match) {
//         // console.log(match);
//         const fullPath = match[1];
//         return path.relative(process.cwd(), fullPath); // o path.relative(process.cwd(), fullPath)
//       }
//     }
//   }

//   return "unknown";
// }

// const logFormat = printf(
//   ({
//     timestamp,
//     level,
//     message,
//     stack,
//     file,
//     conectionInformation,
//     ...meta
//   }) => {
//     // console.log(meta);
//     let metaDetails = "";
//     let conectionData = "";

//     if (
//       meta &&
//       Object.keys(meta).length &&
//       !Object.keys(meta).includes("_stackCaptured")
//     ) {
//       metaDetails = "\n" + JSON.stringify(meta, null, 2);
//     }

//     if (conectionInformation && Object.keys(conectionInformation).length) {
//       conectionData = "\n" + JSON.stringify(conectionInformation, null, 2);
//     }

//     return `[${timestamp} ${level} ${file}]   ${message}${
//       stack ? `\n${stack}` : ""
//     }${metaDetails} ${conectionData}`;
//   }
// );

// const addCallerFile = format((info) => {
//   // Solo capturamos stack si no viene uno
//   // console.log("## Stack");
//   // console.log(info.stack);
//   if (!info._stackCaptured) {
//     const err = new Error();
//     const stack = err.stack || "";
//     info.file = getExternalCallerFileFallback(stack);
//     info._stackCaptured = true; // evitar múltiples capturas si se usa combine()
//   }

//   return info;
// });

// // const logFormat = printf(({ timestamp, level, message, stack }) => {
// //   return `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ""}`;
// // });

// const uppercaseLevel = format((info) => {
//   info.level = info.level.toUpperCase();
//   return info;
// });

// export const logger = createLogger({
//   level: "info",
//   format: combine(
//     timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSS" }),
//     errors({ stack: true }),
//     addCallerFile(),
//     uppercaseLevel(),
//     logFormat
//   ),
//   transports: [
//     new transports.Console({
//       // format: combine(format.colorize(), logFormat),
//       format: combine(
//         timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSS" }),
//         errors({ stack: true }),
//         addCallerFile(),
//         uppercaseLevel(),
//         colorize(),
//         logFormat
//       ),
//     }),
//     // new transports.File({ filename: "logs/error.log", level: "error" }),
//     // new transports.File({ filename: "logs/combined.log" }),
//   ],
// });

// export const logErrorWithCustomMessage = (message: string, error: Error) => {
//   logger.error({
//     message,
//     stack: error.stack,
//   });
// };

// export const logDataBaseConnectionError = (
//   error: Error,
//   errorStack: string | undefined,
//   config: any
// ) => {
//   logger.error({
//     message: "Fallo al conectar a la base de datos",
//     stack: errorStack,
//     dbConfig: config,
//     errorName: error.name,
//     errorMessage: error.message,
//     timestamp: new Date().toISOString(),
//   });
// };

// Archivo: src/utils/logger.ts
import winston from "winston";
import path from "path";
import util from "util";

// Interfaces para tipar correctamente
interface LogInfo extends winston.Logform.TransformableInfo {
  [key: string]: any;
}

interface LoggerOptions {
  level?: string;
}

// Función para crear un logger con la ruta del archivo
const createLogger = (filePath: string, options?: LoggerOptions) => {
  // Convertir la ruta absoluta a relativa
  const relativePath = path.relative(process.cwd(), filePath);

  // Función para extraer metadatos, en lugar de modificar el objeto original
  const extractMetadata = (info: LogInfo): Record<string, any> => {
    const metadata: Record<string, any> = {};
    const standardKeys = ["level", "message", "timestamp", "filePath", "stack"];

    Object.keys(info).forEach((key) => {
      if (!standardKeys.includes(key)) {
        metadata[key] = info[key];
      }
    });

    return metadata;
  };

  // Crear el formato de la consola
  const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      const metadata = extractMetadata(info);
      const metaStr = Object.keys(metadata).length
        ? ` ${util.inspect(metadata, { depth: null, colors: true })}`
        : "";

      return `${info.timestamp} [${info.level}] [${relativePath}]: ${info.message}${metaStr}`;
    })
  );

  // Crear el formato del archivo
  const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      const metadata = extractMetadata(info);
      const metaStr = Object.keys(metadata).length
        ? ` ${JSON.stringify(metadata)}`
        : "";

      return `${info.timestamp} [${info.level}] [${relativePath}]: ${info.message}${metaStr}`;
    })
  );

  // Crear el logger principal
  const logger = winston.createLogger({
    level: options?.level || process.env.LOG_LEVEL || "info",
    transports: [
      new winston.transports.Console({
        format: consoleFormat,
      }),
      new winston.transports.File({
        filename: "logs/combined.log",
        format: fileFormat,
      }),
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
        format: fileFormat,
      }),
    ],
  });

  // Wrapper para los métodos de log
  return {
    log: (level: string, message: string, meta?: Record<string, any>): void => {
      (logger as any)[level](message, meta);
    },
    error: (message: string, meta?: Record<string, any>): void => {
      logger.error(message, meta);
    },
    warn: (message: string, meta?: Record<string, any>): void => {
      logger.warn(message, meta);
    },
    info: (message: string, meta?: Record<string, any>): void => {
      logger.info(message, meta);
    },
    debug: (message: string, meta?: Record<string, any>): void => {
      logger.debug(message, meta);
    },
    verbose: (message: string, meta?: Record<string, any>): void => {
      logger.verbose(message, meta);
    },
  };
};

// Exportar un logger por defecto usando la ruta del archivo actual
export default createLogger(__filename);

// Exportar la función createLogger para uso en otros archivos
export { createLogger };
