import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
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
}
