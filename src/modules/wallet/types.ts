export interface IWallet {
    user_id?: number;
    address?: string;
    encrypted_private_key?: string;
}

export interface IWalletRepository {
    createWallet(data: IWallet): Promise<any>;
    getWalletByUserId(userId: number): Promise<any>;
    getWalletById(id: number): Promise<any>;
}
