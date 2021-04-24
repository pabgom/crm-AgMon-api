import { AuthenticateService } from './../services';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async encriptPassword() {
        this.password = await AuthenticateService.encriptPassord(this.password);
    }

    constructor() {}
}
