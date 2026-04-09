export type DataEntrie = {
    wallet_address: string;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    asset: 'USDT' | 'USDC' | 'ETH';
    transaction_id: number;
}

export interface ILedgerRepository {
    createEntries(data: DataEntrie[]): Promise<void>;
    getBalance(wallet_address: string, asset: string): Promise<number>;
}