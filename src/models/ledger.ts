import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Wallet } from "./wallet";
import { Transaction } from "./transaction";

@Entity()
export class LedgerEntry {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    wallet_address!: string;

    @Column("decimal", { precision: 18, scale: 8 })
    amount!: number;

    @Column()
    type!: string;

    @Column()
    asset!: string;

    @Column()
    transaction_id!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @ManyToOne(() => Wallet, (wallet) => wallet.ledgerEntries)
    @JoinColumn({ name: "wallet_address" })
    wallet!: Wallet;

    @ManyToOne(() => Transaction, (tx) => tx.ledgerEntries)
    @JoinColumn({ name: "transaction_id" })
    transaction!: Transaction;
}