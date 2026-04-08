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

}

export default LedgerRepository;