import type { Request, Response } from "express";
import walletService from "./wallet";

export const createWallet = async (req: Request, res: Response) => {
    try {
        const { userId, address, privateKey } = req.body;
        const wallet = await walletService.createWallet(userId, address, privateKey);
        return res.status(201).json(wallet);
    } catch (error) {
        return res.status(500).json({ message: "Error creating wallet" });
    }
};

export const getWalletByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const wallet = await walletService.getWalletByUserId(Number(userId));
        return res.status(200).json(wallet);
    } catch (error) {
        return res.status(500).json({ message: "Error getting wallet" });
    }
};

export const getWalletById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const wallet = await walletService.getWalletById(Number(id));
        return res.status(200).json(wallet);
    } catch (error) {
        return res.status(500).json({ message: "Error getting wallet" });
    }
};