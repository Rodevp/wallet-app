import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, type Activity } from "../types";

const activityStore: Record<string, Activity> = {};

const MAX_TRANSACTIONS = 5;
const TIME_WINDOW = 10 * 1000;
const MAX_AMOUNT = 10000;
const MAX_SAME_TARGET = 3;

export const antiFraudMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const wallet =
            req.body.from_wallet_address ||
            req.body.to_wallet_address ||
            "unknown";

        const { amount, to_wallet_address } = req.body;
        const now = Date.now();

        if (!activityStore[wallet]) {
            activityStore[wallet] = {
                timestamps: [],
                lastTargets: [],
            };
        }

        const activity = activityStore[wallet];

        activity.timestamps = activity.timestamps.filter(
            (t) => now - t < TIME_WINDOW
        );

        if (activity.timestamps.length >= MAX_TRANSACTIONS) {
            return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
                message: "Too many transactions in short time (fraud risk)"
            });
        }

        if (amount && amount > MAX_AMOUNT) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Transaction amount too high (fraud risk)"
            });
        }

        if (to_wallet_address) {
            activity.lastTargets.push(to_wallet_address);

            const sameTargetCount = activity.lastTargets.filter(
                (t) => t === to_wallet_address
            ).length;

            if (sameTargetCount > MAX_SAME_TARGET) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: "Repeated transactions to same target (fraud risk)"
                });
            }
        }

        activity.timestamps.push(now);

        next();

    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error processing request"
        });
    }
}