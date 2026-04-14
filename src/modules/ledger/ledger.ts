import type { DataEntrie } from "./types";
import LedgerRepository from "./repository";

export class LedgerService {

    constructor(
        private readonly ledgerRepository: LedgerRepository
    ) { }

    createEntries = async (data: DataEntrie[]) => {
        try {
            return await this.ledgerRepository.createEntries(data);
        } catch (error) {
            throw error;
        }
    }

    getBalance = async (wallet_address: string, asset: string) => {
        try {
            const balance = await this.ledgerRepository.getBalance(wallet_address, asset);
            return {
                wallet_address,
                asset,
                balance
            }
        } catch (error) {
            throw error;
        }
    }

}

const ledgerService = new LedgerService(new LedgerRepository());

export default ledgerService;