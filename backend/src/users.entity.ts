import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class Users {
    @PrimaryGeneratedColumn()
    id: Number
    
    @Column()
    username: string
    
    @Column()
    password: string
}