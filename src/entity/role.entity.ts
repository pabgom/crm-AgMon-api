import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class RoleEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
