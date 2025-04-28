import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import StatusAppointment from "../enums/StatusAppointment";
import { UserEntity } from "./User";
import { Service } from "./Service";

@Entity({ name: "appointments" })
export class AppointmentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ type: "timestamptz" })
  startDate: Date;
  @Column({ type: "timestamptz" })
  endDate: Date;
  // @Column({type: "timestamptz"})
  // time: Date
  @Column({ nullable: true })
  notes: string;
  @Column({
    type: "enum",
    enum: StatusAppointment,
    default: StatusAppointment.ACTIVE,
  })
  status: StatusAppointment;
  @ManyToOne(() => UserEntity, (user) => user.appointments)
  user: UserEntity;

  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;
}
