import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      message: "HTTP Request",
      method,
      url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers["user-agent"],
    });
  });

  next();
};

export const errorRequestLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
  });

  res.status(500).json({ error: "Error interno del servidor" });
};
