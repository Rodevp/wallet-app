import AppDataSource from "../../db";
import { Wallet } from "../../models/wallet";

class WalletRepository {
    private walletRepo = AppDataSource.getRepository(Wallet);

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
            throw error;
        }
    };

    getWalletById = async (id: number) => {
        try {
            return await this.walletRepo.findOneBy({ id });
        } catch (error) {
            throw error;
        }
    };
}

export default WalletRepository;