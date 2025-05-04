// utils/getCallerFile.ts
import path from "path";

export const getCallerFile = (): string => {
  const err = new Error();
  const originalPrepare = Error.prepareStackTrace;

  try {
    Error.prepareStackTrace = (_, stack) => stack;

    const stack = err.stack as unknown as NodeJS.CallSite[];
    const projectRoot = process.cwd();
    const loggerDir = path.dirname(__filename);

    // Saltar los primeros 3 frames:
    // 0: Error constructor
    // 1: getCallerFile()
    // 2: Función del logger
    for (let i = 3; i < stack.length; i++) {
      const frame = stack[i];
      const fileName = frame.getFileName() || "";

      // Verificar si el frame es relevante
      if (
        fileName &&
        !fileName.includes("node_modules") &&
        !fileName.includes("node:internal") &&
        !fileName.startsWith(loggerDir) &&
        fileName.startsWith(projectRoot)
      ) {
        return path.relative(projectRoot, fileName).replace(/\\/g, "/"); // Normalizar para Windows
      }
    }
  } catch (e) {
    console.error("Error getting caller file:", e);
  } finally {
    Error.prepareStackTrace = originalPrepare;
  }

  return "unknown";
};
