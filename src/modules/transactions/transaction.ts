import { TransactionRepository } from "./repository";


import type { Response, Request } from "express";
import type { ITransaction, ITransactionRepository } from "./types";
import { LedgerService } from "../ledger/ledger";
import LedgerRepository from "../ledger/repository";

class TransactionService {

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

    async deposit(req: Request, res: Response): Promise<any> {
        const { to_wallet_address, ammount, asset } = req.body;

        if (!to_wallet_address) {
            return res.status(400).json({ error: "Wallet required" });
        }

        if (!ammount || ammount <= 0) {
            return res.status(400).json({ error: "Invalid ammount" });
        }

        if (!asset) {
            return res.status(400).json({ error: "Invalid asset" });
        }

        const transaction: ITransaction = {
            to_wallet_address,
            from_wallet_address: "",
            amount: Number(ammount),
            asset: asset.toUpperCase() as 'USDT' | 'USDC' | 'ETH',
            type: 'deposit',
            status: 'pending',
            tx_hash: ''
        };

        try {
            const transactionCreated = await this.transactionRepository.create(transaction);
            await this.ledgerService.createEntries([
                {
                    transaction_id: transactionCreated.id,
                    wallet_address: transactionCreated.to_wallet_address,
                    amount: transactionCreated.amount,
                    type: 'deposit',
                    asset: transactionCreated.asset
                }
            ]);
            return res.status(201).json(transactionCreated);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }

    }

    async withdraw(req: Request, res: Response): Promise<any> {
        const { from_wallet_address, amount, asset } = req.body;

        if (!from_wallet_address) {
            return res.status(400).json({ error: "Wallet required" });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid ammount" });
        }

        if (!asset) {
            return res.status(400).json({ error: "Invalid asset" });
        }

        const transaction: ITransaction = {
            from_wallet_address,
            to_wallet_address: "",
            amount: Number(amount),
            asset: asset.toUpperCase() as 'USDT' | 'USDC' | 'ETH',
            type: 'withdrawal',
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
                    type: 'withdrawal',
                    asset: transactionCreated.asset
                }
            ]);
            return res.status(201).json(transactionCreated);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

const transactionService = new TransactionService(new TransactionRepository(), new LedgerService(new LedgerRepository()));

export default transactionService;
