export type DataEntrie = {
    wallet_address: string;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    asset: 'USDT' | 'USDC' | 'ETH';
    transaction_id: number;
}