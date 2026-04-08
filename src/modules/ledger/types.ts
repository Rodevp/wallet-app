export type DataEntrie = {
    wallet_id: number;
    amount: number;
    type: 'deposit' | 'withdrawal';
    asset: 'USDT' | 'USDC' | 'ETH';
    transaction_id: number;
}

export interface ILedgerRepository {
    createEntries(data: DataEntrie[]): Promise<void>;
}