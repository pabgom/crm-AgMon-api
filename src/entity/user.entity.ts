import { AuthenticateService } from '../services';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying', nullable: false })
    name: string;

    @Column({ type: 'character varying', nullable: false })
    password: string;

    @ManyToMany(() => RoleEntity)
    @JoinTable()
    roles: RoleEntity[];

    @OneToMany(() => CustomerEntity, customer => customer.createdBy)
    customersCreated: Array<CustomerEntity>;

    @OneToMany(() => CustomerEntity, customer => customer.modifiedBy)
    customersModified: Array<CustomerEntity>;

    @BeforeInsert()
    async encryptPassword() {
        this.password = await AuthenticateService.encryptPassword(this.password);
    }
}
