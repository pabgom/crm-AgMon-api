import { UserEntity } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    name: string;

    @Column({
        length: 255
    })
    surname: string;

    @Column({ length: 255 })
    photoUrl: string;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.customersCreated)
    @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
    createdBy: UserEntity;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.customersModified)
    @JoinColumn({ name: 'modified_by', referencedColumnName: 'id' })
    modifiedBy: UserEntity;
}
