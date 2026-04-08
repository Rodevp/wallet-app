import { TransactionRepository } from "./repository";


import type { Response, Request } from "express";
import type { ITransaction, ITransactionRepository } from "./types";
import { LedgerService } from "../ledger/ledger";
import LedgerRepository from "../ledger/repository";

class TransactionController {

    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly ledgerService: LedgerService
    ) { }

    async transfer(req: Request, res: Response): Promise<any> {

        const { from_wallet_address, to_wallet_address, amount, asset } = req.body;

        if (!from_wallet_address || !to_wallet_address) {
            return res.status(400).json({ error: "Required Wallets" });
        }

        if (from_wallet_address === to_wallet_address) {
            return res.status(400).json({ error: "Cannot transfer to yourself" });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid Amount" });
        }

        if (!asset) {
            return res.status(400).json({ error: "Required Asset" });
        }

        const transaction: ITransaction = {
            from_wallet_address,
            to_wallet_address,
            amount: Number(amount),
            asset: asset.toUpperCase() as 'USDT' | 'USDC' | 'ETH',
            type: 'transfer',
            status: 'pending',
            tx_hash: ''
        };

        try {
            const transactionCreated = await this.transactionRepository.create(transaction);

            await this.ledgerService.createEntries([
                {
                    transaction_id: transactionCreated.id,
                    wallet_address: transactionCreated.from_wallet_address,
                    amount: -transactionCreated.amount,
                    type: 'transfer',
                    asset: transactionCreated.asset
                },
                {
                    transaction_id: transactionCreated.id,
                    wallet_address: transactionCreated.to_wallet_address,
                    amount: transactionCreated.amount,
                    type: 'transfer',
                    asset: transactionCreated.asset
                }
            ]);


            return res.status(201).json(transactionCreated);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

const transactionController = new TransactionController(new TransactionRepository(), new LedgerService(new LedgerRepository()));

export default transactionController;
