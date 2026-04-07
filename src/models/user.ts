import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Wallet } from "./wallet";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: "active" })
    status!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @OneToOne(() => Wallet, (wallet) => wallet.user)
    wallet!: Wallet;
}