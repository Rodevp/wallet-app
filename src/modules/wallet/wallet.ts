import type { IWalletRepository } from "./types";

import WalletRepository from "./repository";

class WalletService {

    constructor(private readonly walletRepository: IWalletRepository) { }

    createWallet = async (userId: number, address: string, privateKey: string) => {
        try {
            const wallet = await this.walletRepository.createWallet({
                address,
                encrypted_private_key: privateKey,
                user_id: userId,
            });
            return wallet;
        } catch (error) {
            return { message: "Error creating wallet" };
        }
    };

    getWalletByUserId = async (userId: number) => {
        try {
            const wallet = await this.walletRepository.getWalletByUserId(userId);
            return wallet;
        } catch (error) {
            return { message: "Error getting wallet" };
        }
    };

    getWalletById = async (id: number) => {
        try {
            const wallet = await this.walletRepository.getWalletById(id);
            return wallet;
        } catch (error) {
            return { message: "Error getting wallet" };
        }
    };
}

const walletService = new WalletService(new WalletRepository());

export default walletService;
