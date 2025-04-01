import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User";

@Entity({name: "credentials"})
export class CredentialEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @OneToOne(() => UserEntity, user => user.credentials)
    user: UserEntity
}
