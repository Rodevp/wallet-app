export interface IWalletRepository {
    createWallet(data: { userId: number; address: string; privateKey: string }): Promise<any>;
    getWalletByUserId(userId: number): Promise<any>;
    getWalletById(id: number): Promise<any>;
}
