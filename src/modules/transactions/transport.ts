import type { Response, Request } from "express";
import transactionService from "./transaction";
import { HTTP_STATUS } from "../../types";

export const transfer = async (req: Request, res: Response) => {

    const { from_wallet_address, to_wallet_address, amount, asset } = req.body;

    if (!from_wallet_address || !to_wallet_address) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Required Wallets" });
    }

    if (from_wallet_address === to_wallet_address) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Cannot transfer to yourself" });
    }

    if (!amount || amount <= 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid Amount" });
    }

    if (!asset) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Required Asset" });
    }

    try {
        const data = {
            from_wallet_address: from_wallet_address as string,
            to_wallet_address: to_wallet_address as string,
            amount: amount as number,
            asset: asset as 'USDT' | 'USDC' | 'ETH'
        }
        const transactionCreated = await transactionService.transfer(data);
        return res.status(HTTP_STATUS.CREATED).json(transactionCreated);
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}

export const deposit = async (req: Request, res: Response) => {
    const { to_wallet_address, ammount, asset } = req.body;

    if (!to_wallet_address) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Wallet required" });
    }

    if (!ammount || ammount <= 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid ammount" });
    }

    if (!asset) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid asset" });
    }

    try {
        const data = {
            to_wallet_address: to_wallet_address as string,
            ammount: ammount as number,
            asset: asset as 'USDT' | 'USDC' | 'ETH'
        }
        const transactionCreated = await transactionService.deposit(data);
        return res.status(HTTP_STATUS.CREATED).json(transactionCreated);
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }

}

export const withdraw = async (req: Request, res: Response) => {
    const { from_wallet_address, amount, asset } = req.body;

    if (!from_wallet_address) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Wallet required" });
    }

    if (!amount || amount <= 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid ammount" });
    }

    if (!asset) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid asset" });
    }

    try {
        const data = {
            from_wallet_address: from_wallet_address as string,
            amount: amount as number,
            asset: asset as 'USDT' | 'USDC' | 'ETH'
        }
        const transactionCreated = await transactionService.withdraw(data);
        return res.status(HTTP_STATUS.CREATED).json(transactionCreated);
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}


