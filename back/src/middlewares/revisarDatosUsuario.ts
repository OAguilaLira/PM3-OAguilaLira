import { Request, Response, NextFunction } from "express"

export const revisarDatosUsuarioDto = (req: Request, res: Response, next: NextFunction) => {
    const {name, email, birthdate, nDni, username, password} = req.body;
    if (name && email && birthdate && nDni && username && password) {
        next();
    }
    else {
        res.status(400).json("Faltan ingresar algunos datos")
    }
    
}