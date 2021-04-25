import { AuthenticateService } from '../services';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './role';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    @BeforeInsert()
    async encryptPassword() {
        this.password = await AuthenticateService.encryptPassword(this.password);
    }
}
