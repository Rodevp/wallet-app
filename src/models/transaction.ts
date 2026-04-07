import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { LedgerEntry } from "./ledger";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: string; // deposit | withdraw | transfer

    @Column()
    status!: string; // pending | completed | failed

    @Column({ nullable: true })
    from_wallet_address!: string;

    @Column({ nullable: true })
    to_wallet_address!: string;

    @Column("decimal", { precision: 18, scale: 8 })
    amount!: number;

    @Column()
    asset!: string;

    @Column({ nullable: true })
    tx_hash!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @OneToMany(() => LedgerEntry, (entry) => entry.transaction)
    ledgerEntries!: LedgerEntry[];
}