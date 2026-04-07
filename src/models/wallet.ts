import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany
} from "typeorm"
import { User } from "./user";
import { LedgerEntry } from "./ledger";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    user_id!: number;

    @Column()
    address!: string;

    @Column()
    encrypted_private_key!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @OneToOne(() => User, (user) => user.wallet)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @OneToMany(() => LedgerEntry, (entry) => entry.wallet)
    ledgerEntries!: LedgerEntry[];
}