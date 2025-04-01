import { DataSource } from "typeorm"
import { UserEntity } from "../entities/User"
import { CredentialEntity } from "../entities/Credential"
import { AppointmentEntity } from "../entities/Appointment"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1237515",
    database: "turnos",
    entities: [UserEntity, CredentialEntity, AppointmentEntity],
    synchronize: true,
    logging: ["error"],
    dropSchema: false,
})

export const UserModel = AppDataSource.getRepository(UserEntity);
export const CredentialModel = AppDataSource.getRepository(CredentialEntity);
export const AppointmentModel = AppDataSource.getRepository(AppointmentEntity);