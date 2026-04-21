import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./models/user";
import { Wallet } from "./models/wallet";
import { Transaction } from "./models/transaction";
import { LedgerEntry } from "./models/ledger";

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Wallet, Transaction, LedgerEntry],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;