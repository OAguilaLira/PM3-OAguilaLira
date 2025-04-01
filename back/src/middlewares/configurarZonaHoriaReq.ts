import { Request, Response, NextFunction } from "express"

export const configurarZonaHoraria = (req: Request, res: Response, next: NextFunction) => {
    // req.body.date = req.body.date + '-06:00';
    // req.body.time = req.body.time + '-06:00';
    next();
}