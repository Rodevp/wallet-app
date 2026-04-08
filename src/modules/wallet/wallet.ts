import type { Request, Response } from "express";
import type { IWallet, IWalletRepository } from "./types";

import WalletRepository from "./repository";

class WalletService {

    constructor(private readonly walletRepository: IWalletRepository) { }

    createWallet = async (req: Request, res: Response) => {
        try {
            const { userId, address, privateKey } = req.body;
            const wallet = await this.walletRepository.createWallet({
                address,
                encrypted_private_key: privateKey,
                user_id: userId,
            });
            return res.status(201).json(wallet);
        } catch (error) {
            return res.status(500).json({ message: "Error creating wallet" });
        }
    };

    getWalletByUserId = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const wallet = await this.walletRepository.getWalletByUserId(Number(userId));
            return res.status(200).json(wallet);
        } catch (error) {
            return res.status(500).json({ message: "Error getting wallet" });
        }
    };

    getWalletById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const wallet = await this.walletRepository.getWalletById(Number(id));
            return res.status(200).json(wallet);
        } catch (error) {
            return res.status(500).json({ message: "Error getting wallet" });
        }
    };
}

const walletService = new WalletService(new WalletRepository());

export default walletService;
