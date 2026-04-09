import type { Request, Response } from "express";
import ledgerService from "./ledger";

export const getBalance = async (req: Request, res: Response): Promise<any> => {
    try {
        const { wallet_address, asset } = req.params;
        const balance = await ledgerService.getBalance(wallet_address as string, asset as string);
        return res.status(200).json(balance)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}