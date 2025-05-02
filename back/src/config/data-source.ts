import { DataSource } from "typeorm";
import { UserEntity } from "../entities/User";
import { CredentialEntity } from "../entities/Credential";
import { AppointmentEntity } from "../entities/Appointment";
import { config } from "./envs";
import { Service } from "../entities/Service";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [UserEntity, CredentialEntity, AppointmentEntity, Service],
  synchronize: true,
  logging: ["error"],
  dropSchema: false,
});

export const UserModel = AppDataSource.getRepository(UserEntity);
export const CredentialModel = AppDataSource.getRepository(CredentialEntity);
export const AppointmentModel = AppDataSource.getRepository(AppointmentEntity);
export const ServiceModel = AppDataSource.getRepository(Service);
