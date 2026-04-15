import AppDataSource from "../../db";
import { AppError } from "../../error";
import { Wallet } from "../../models/wallet";
import { HTTP_STATUS } from "../../types";

class WalletRepository {
    private walletRepo = AppDataSource.getRepository(Wallet);

    constructor() { }

    createWallet = async (data: {
        userId: number;
        address: string;
        privateKey: string;
    }) => {
        const wallet = this.walletRepo.create({
            user_id: data.userId,
            address: data.address,
            encrypted_private_key: data.privateKey,
        });

        return await this.walletRepo.save(wallet);
    };

    getWalletByUserId = async (userId: number) => {
        try {
            return await this.walletRepo.findOneBy({ user_id: userId });
        } catch (error) {
            throw new AppError("Get wallet by user id failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    };

    getWalletById = async (id: number) => {
        try {
            return await this.walletRepo.findOneBy({ id });
        } catch (error) {
            throw new AppError("Get wallet by id failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    };
}

export default WalletRepository;