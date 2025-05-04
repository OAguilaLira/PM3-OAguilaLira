import { createLogger } from "../logger";
import { getCallerFile } from "./getCallerFile";
import path from "path";

export const logDatabaseError = (
  error: Error,
  config: Record<string, any>,
  fileRoute: string,
  additionalInfo?: Record<string, any>
) => {
  // Sanitizar la configuración sensible (passwords)
  const sanitizedConfig = {
    ...config,
  };

  // Capturar archivo de origen REAL
  //   const callerFile = getCallerFile();
  const callerFile = path.relative(process.cwd(), fileRoute);

  // Manejar AggregateError especial
  let errorDetails = {};
  if (error instanceof AggregateError) {
    errorDetails = {
      errorDetails: error.errors.map((e, i) => ({
        [`error_${i + 1}_name`]: "AggregateError",
        [`error_${i + 1}_message`]: e.message,
        [`error_${i + 1}_stack`]: e.stack,
      })),
    };
  } else {
    errorDetails = {
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
    };
  }

  //   const logger = createLogger(__filename); // Usar la ruta actual

  const logger = createLogger(callerFile);

  const parseStack = (stack?: string): string[] => {
    if (!stack) return [];
    return stack
      .split("\n")
      .filter(
        (line) => !line.includes("node_modules") && !line.includes("node:")
      )
      .map((line) => {
        const match = line.match(/(at\s+.+\s+)?\(?(.+?):\d+:\d+\)?/);
        return match ? `at ${path.relative(process.cwd(), match[2])}` : line;
      });
  };

  logger.error("Database connection error", {
    // errorMessage: error.message,
    // errorStack: error.stack,
    // errorName: error.name,
    // dbConfig: sanitizedConfig,
    // ...additionalInfo,
    ...errorDetails,
    dbConfig: sanitizedConfig,
    ...additionalInfo,
  });
};
