import AppDataSource from "../../db";
import { ITransaction } from "./types";
import { Transaction } from "../../models/transaction";
import { HTTP_STATUS } from "../../types";
import { AppError } from "../../error";

export class TransactionRepository {

    private readonly transactionRepository = AppDataSource.getRepository(Transaction);

    async create(data: ITransaction) {
        try {
            const transaction = this.transactionRepository.create(data);
            return await this.transactionRepository.save(transaction);
        } catch (error) {
            throw new AppError("Create transaction failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}