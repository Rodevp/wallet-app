export interface ITransaction {
    from_wallet_address: string;
    to_wallet_address: string;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    asset: 'USDT' | 'USDC' | 'ETH';
    status: 'pending' | 'completed' | 'failed';
    tx_hash: string;
}

export interface ITransactionRepository {
    create(data: ITransaction): Promise<any>;
}