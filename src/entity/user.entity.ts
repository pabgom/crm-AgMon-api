import { AuthenticateService } from '../services';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying', nullable: false, length: 255 })
    name: string;

    @Column({ type: 'character varying', nullable: false, length: 255 })
    password: string;

    @Column({ type: 'character varying', nullable: false, length: 255 })
    email: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    active: boolean;

    @ManyToMany(() => RoleEntity, { cascade: true })
    @JoinTable({
        name: 'users_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'roles_id',
            referencedColumnName: 'id'
        }
    })
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
