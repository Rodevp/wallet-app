import AppDataSource from "../../db";
import { ITransaction } from "./types";
import { Transaction } from "../../models/transaction";

export class TransactionRepository {

    private readonly transactionRepository = AppDataSource.getRepository(Transaction);

    async create(data: ITransaction) {
        const transaction = this.transactionRepository.create(data);
        return await this.transactionRepository.save(transaction);
    }
}