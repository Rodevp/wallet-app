import { DataEntrie, ILedgerRepository } from "./types";
import LedgerRepository from "./repository";

class LedgerService {

    constructor(
        private readonly ledgerRepository: ILedgerRepository
    ) { }

    createEntries = async (data: DataEntrie[]) => {
        try {
            return await this.ledgerRepository.createEntries(data);
        } catch (error) {
            throw error;
        }
    }

}

const ledgerService = new LedgerService(new LedgerRepository());

export default ledgerService;