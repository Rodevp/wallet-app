import type { IWalletRepository } from "./types";

import WalletRepository from "./repository";
import { AppError } from "../../error";
import { HTTP_STATUS } from "../../types";

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
            throw new AppError("Create wallet failed", HTTP_STATUS.BAD_REQUEST);
        }
    };

    getWalletByUserId = async (userId: number) => {
        try {
            const wallet = await this.walletRepository.getWalletByUserId(userId);
            return wallet;
        } catch (error) {
            throw new AppError("Get wallet by user id failed", HTTP_STATUS.BAD_REQUEST);
        }
    };

    getWalletById = async (id: number) => {
        try {
            const wallet = await this.walletRepository.getWalletById(id);
            return wallet;
        } catch (error) {
            throw new AppError("Get wallet by id failed", HTTP_STATUS.BAD_REQUEST);
        }
    };
}

const walletService = new WalletService(new WalletRepository());

export default walletService;
