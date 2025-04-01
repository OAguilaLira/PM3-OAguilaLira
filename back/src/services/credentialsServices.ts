import { CredentialModel } from "../config/data-source";
import { credentialDto } from "../dto/credential.Dto";
import { CredentialEntity } from "../entities/Credential";

export const createCredential = async (username: string, password: string): Promise<CredentialEntity> => {
    const nuevaCredential: CredentialEntity = await CredentialModel.create({username, password})
    const nuevaCredentialGuardada: CredentialEntity = await CredentialModel.save(nuevaCredential)
    return nuevaCredentialGuardada;
}

export const checkCredential = async (username: string, password: string): Promise<number> => {
    const nombreUsuarioEncontrado: CredentialEntity | null = await CredentialModel.findOneBy({username});
    const contraseñaEncontrada: CredentialEntity | null = await CredentialModel.findOneBy({password});

    if (nombreUsuarioEncontrado && contraseñaEncontrada){
        return nombreUsuarioEncontrado.id;
    }
    else {
        throw new Error('Usuario o contraseña incorrectos');
    }
}

export const obtenerCredenciales = async (credencialesBuscadas: credentialDto): Promise<CredentialEntity | null> => {
    const credenciales = await CredentialModel.findOne({
        where: {
          username: credencialesBuscadas.username,
          password: credencialesBuscadas.password,
        },
        relations: {
            user: true
        }
      });
    return credenciales;
}