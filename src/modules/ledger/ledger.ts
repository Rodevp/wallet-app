import type { Request, Response } from "express";
import type { DataEntrie, ILedgerRepository } from "./types";
import LedgerRepository from "./repository";

export class LedgerService {

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

    getBalance = async (req: Request, res: Response): Promise<any> => {
        try {
            const { wallet_address, asset } = req.params;
            const balance = await this.ledgerRepository.getBalance(wallet_address as string, asset as string);
            return res.status(200).json({
                wallet_address,
                asset,
                balance
            })
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}

const ledgerService = new LedgerService(new LedgerRepository());

export default ledgerService;