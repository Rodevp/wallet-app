import { TransactionRepository } from "./repository";
import { LedgerService } from "../ledger/ledger";
import LedgerRepository from "../ledger/repository";

import type { ITransaction, ITransactionRepository, ITransferData } from "./types";

class TransactionService {

    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly ledgerService: LedgerService
    ) { }

    async transfer(data: ITransferData) {

        const { from_wallet_address, to_wallet_address, amount, asset } = data;

        const transaction: ITransaction = {
            from_wallet_address: from_wallet_address as string,
            to_wallet_address: to_wallet_address as string,
            amount: Number(amount),
            asset: asset?.toUpperCase() as 'USDT' | 'USDC' | 'ETH',
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

            return transactionCreated;
        } catch (error) {
            throw error;
        }
    }

    async deposit(data: ITransferData) {
        const { to_wallet_address, amount, asset } = data;

        const transaction: ITransaction = {
            to_wallet_address: to_wallet_address as string,
            from_wallet_address: "",
            amount: Number(amount),
            asset: asset?.toUpperCase() as 'USDT' | 'USDC' | 'ETH',
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
            return transactionCreated;
        } catch (error) {
            throw error;
        }

    }

    async withdraw(data: ITransferData) {
        const { from_wallet_address, amount, asset } = data;

        const transaction: ITransaction = {
            from_wallet_address: from_wallet_address as string,
            to_wallet_address: "",
            amount: Number(amount),
            asset: asset?.toUpperCase() as 'USDT' | 'USDC' | 'ETH',
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
            return transactionCreated;
        } catch (error) {
            throw error;
        }
    }
}

const transactionService = new TransactionService(new TransactionRepository(), new LedgerService(new LedgerRepository()));

export default transactionService;
