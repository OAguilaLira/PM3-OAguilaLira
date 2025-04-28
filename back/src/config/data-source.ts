import { DataSource } from "typeorm";
import { UserEntity } from "../entities/User";
import { CredentialEntity } from "../entities/Credential";
import { AppointmentEntity } from "../entities/Appointment";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs";
import { Service } from "../entities/Service";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [UserEntity, CredentialEntity, AppointmentEntity, Service],
  synchronize: true,
  logging: ["error"],
  dropSchema: false,
});

export const UserModel = AppDataSource.getRepository(UserEntity);
export const CredentialModel = AppDataSource.getRepository(CredentialEntity);
export const AppointmentModel = AppDataSource.getRepository(AppointmentEntity);
export const ServiceModel = AppDataSource.getRepository(Service);
