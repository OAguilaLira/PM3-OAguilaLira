import { UserEntity } from "../entities/User";
import UsuarioDto from "../dto/usuarioDto";
import { createCredential, obtenerCredenciales } from "./credentialsServices";
import { CredentialModel, UserModel } from "../config/data-source";
import { CredentialEntity } from "../entities/Credential";
import { credentialDto } from "../dto/credential.Dto";
import { UsuarioLogeado } from "../dto/usuarioLogeado.Dto";

export const getAllUsersService = async (): Promise<UserEntity[]> => {
  const usuariosRegistrados: UserEntity[] = await UserModel.find({
    relations: {
      appointments: true,
    },
  });
  return usuariosRegistrados;
};
export const getUserService = async (id: number): Promise<UserEntity> => {
  const usuarioEncontrado: UserEntity | null = await UserModel.findOne({
    where: {
      id,
    },
    relations: {
      appointments: true,
    },
  });
  if (usuarioEncontrado) {
    return usuarioEncontrado;
  } else {
    throw new Error("El usuario no esta registrado");
  }
};
export const registerUserService = async (usuario: UsuarioDto): Promise<void> => {
  const idNuevasCredenciales: CredentialEntity = await createCredential(usuario.username, usuario.password);
  const nuevoUsuario: UserEntity = await UserModel.create({
    ...usuario,
    credentials: idNuevasCredenciales,
  });
  const usuarioGuardado: UserEntity = await UserModel.save(nuevoUsuario);
  await getUserService(usuarioGuardado.id);
};
export const loginUserService = async (credencialesBuscadas: credentialDto): Promise<UsuarioLogeado> => {
  const credencialesEncontradas: CredentialEntity | null = await obtenerCredenciales(credencialesBuscadas);
  if (credencialesEncontradas) {
    const usuarioPorLogear: UserEntity = credencialesEncontradas.user;
    const usuariologeado: UsuarioLogeado = {
      login: true,
      user: {
        id: usuarioPorLogear.id,
        name: usuarioPorLogear.name,
        email: usuarioPorLogear.email,
        birthdate: usuarioPorLogear.birthdate,
        nDni: usuarioPorLogear.nDni,
      },
    };
    return usuariologeado;
  } else {
    throw new Error("Usuario o contraseña incorrectos");
  }
};
