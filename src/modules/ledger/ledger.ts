import type { DataEntrie } from "./types";
import LedgerRepository from "./repository";
import { AppError } from "../../error";
import { HTTP_STATUS } from "../../types";

export class LedgerService {

    constructor(
        private readonly ledgerRepository: LedgerRepository
    ) { }

    createEntries = async (data: DataEntrie[]) => {
        try {
            return await this.ledgerRepository.createEntries(data);
        } catch (error) {
            throw new AppError("Create entries failed", HTTP_STATUS.BAD_REQUEST);
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
            throw new AppError("Get balance failed", HTTP_STATUS.BAD_REQUEST);
        }
    }

}

const ledgerService = new LedgerService(new LedgerRepository());

export default ledgerService;