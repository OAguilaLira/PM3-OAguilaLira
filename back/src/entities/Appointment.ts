import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import StatusAppointment from "../enums/StatusAppointment";
import { UserEntity } from "./User";

@Entity({ name: "appointments" })
export class AppointmentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ type: "timestamptz" })
  date: Date;
  // @Column({type: "timestamptz"})
  // time: Date
  @Column()
  serviceType: string;
  @Column()
  notes: string;
  @Column()
  duration: number;
  @Column({
    type: "enum",
    enum: StatusAppointment,
    default: StatusAppointment.ACTIVE,
  })
  status: StatusAppointment;
  @ManyToOne(() => UserEntity, (user) => user.appointments)
  user: UserEntity;
}
