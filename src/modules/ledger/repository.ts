import AppDataSource from "../../db";
import { LedgerEntry } from "../../models/ledger";
import { DataEntrie } from "./types";

class LedgerRepository {

    private ledgerRepository = AppDataSource.getRepository(LedgerEntry);

    async createEntries(data: DataEntrie[]): Promise<any> {
        try {
            return await this.ledgerRepository.save(data);
        } catch (error) {
            throw error;
        }
    }

    async getBalance(wallet_address: string, asset: string): Promise<number> {
        const result = await this.ledgerRepository.createQueryBuilder("Ledger")
            .select("SUM(Ledger.amount)", "balance")
            .where("ledger.wallet_address = :wallet_address", { wallet_address })
            .andWhere("ledger.asset = :asset", { asset })
            .getRawOne();
        return result.balance || 0;
    }

}

export default LedgerRepository;