import type { Request, Response } from "express";
import ledgerService from "./ledger";
import { HTTP_STATUS } from "../../types";

export const getBalance = async (req: Request, res: Response): Promise<any> => {
    try {
        const { wallet_address, asset } = req.params;
        const balance = await ledgerService.getBalance(wallet_address as string, asset as string);
        return res.status(HTTP_STATUS.OK).json(balance)
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}