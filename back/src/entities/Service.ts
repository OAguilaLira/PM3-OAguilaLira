import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AppointmentEntity } from "./Appointment";

@Entity()
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ name: "duration_minutes" })
  durationMinutes: number;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.service)
  appointments: AppointmentEntity;
}
