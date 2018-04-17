import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public playerName: string;

    @Column()
    public playerScore: number;
}