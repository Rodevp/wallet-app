import AppDataSource from "../../db";
import { AppError } from "../../error";
import { LedgerEntry } from "../../models/ledger";
import { HTTP_STATUS } from "../../types";
import { DataEntrie } from "./types";

class LedgerRepository {

    private ledgerRepository = AppDataSource.getRepository(LedgerEntry);

    async createEntries(data: DataEntrie[]) {
        try {
            return await this.ledgerRepository.save(data);
        } catch (error) {
            throw new AppError("Create entries failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }

    async getBalance(wallet_address: string, asset: string) {
        try {
            const result = await this.ledgerRepository.createQueryBuilder("Ledger")
                .select("SUM(Ledger.amount)", "balance")
                .where("ledger.wallet_address = :wallet_address", { wallet_address })
                .andWhere("ledger.asset = :asset", { asset })
                .getRawOne();
            return result.balance || 0;
        } catch (error) {
            throw new AppError("Get balance failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }

}

export default LedgerRepository;