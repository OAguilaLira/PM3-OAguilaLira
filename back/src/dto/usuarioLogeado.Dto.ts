export interface UsuarioLogeado{
    login: boolean;
    user: {
      id: number,
      name: string,
      email: string,
      birthdate: Date,
      nDni: string
      }
}