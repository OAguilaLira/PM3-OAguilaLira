import { Request, Response } from "express";
import { getAllUsersService, getUserService, registerUserService, loginUserService } from "../services/userServices";
import { UserEntity } from "../entities/User";
import { UsuarioLogeado } from "../dto/usuarioLogeado.Dto";
import { error } from "console";
import { CredentialEntity } from "../entities/Credential";
import { CredentialModel } from "../config/data-source";
import { Tree } from "typeorm";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const usuarios: UserEntity[] = await getAllUsersService();
    res.status(200).json({usuarios});
}
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarioEncontrado: UserEntity = await getUserService(Number(req.params.id));
        res.status(200).json({"user": usuarioEncontrado});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
    
}
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await registerUserService(req.body);
        res.status(201).json({message: "El usuario se registró correctamente"});
    } catch (error: any) {
        res.status(400).json({error: 'No se pudo realizar el registro'})
    }
    
}
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    try {
       
        const usuarioLogeado: UsuarioLogeado = await loginUserService(req.body);
        res.status(200).json(usuarioLogeado);
    }
    catch (error: any){
        res.status(400).json(error.message);
    }
    
}