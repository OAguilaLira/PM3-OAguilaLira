import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CredentialEntity } from "./Credential";
import { AppointmentEntity } from "./Appointment";

@Entity({
  name: "users",
})
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column("date")
  birthdate: Date;
  @Column()
  nDni: string;
  @OneToOne(() => CredentialEntity, (credential) => credential.user)
  @JoinColumn()
  credentials: CredentialEntity;
  @OneToMany(() => AppointmentEntity, (appointment) => appointment.user)
  appointments: AppointmentEntity[];
}
