import type { Request, Response } from "express";
import walletService from "./wallet";
import { HTTP_STATUS } from "../../types";

export const createWallet = async (req: Request, res: Response) => {
    try {
        const { userId, address, privateKey } = req.body;
        const wallet = await walletService.createWallet(userId, address, privateKey);
        return res.status(HTTP_STATUS.CREATED).json(wallet);
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Error creating wallet" });
    }
};

export const getWalletByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const wallet = await walletService.getWalletByUserId(Number(userId));
        return res.status(HTTP_STATUS.OK).json(wallet);
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Error getting wallet" });
    }
};

export const getWalletById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const wallet = await walletService.getWalletById(Number(id));
        return res.status(HTTP_STATUS.OK).json(wallet);
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Error getting wallet" });
    }
};