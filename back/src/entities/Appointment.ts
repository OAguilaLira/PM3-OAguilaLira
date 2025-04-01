import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import StatusAppointment from "../enums/StatusAppointment";
import { UserEntity } from "./User";

@Entity({name: "appointments"})
export class AppointmentEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: "timestamptz"})
    date: Date
    @Column({type: "timestamptz"})
    time: Date
    @Column()
    status: StatusAppointment
    @ManyToOne(() => UserEntity, (user) => user.appointments)
    user: UserEntity
    
}

