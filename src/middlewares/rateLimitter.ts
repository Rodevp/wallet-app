import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../types";

const CAPACITY = 10;
const REFILL_RATE = 1;

const buckets: Record<string, {
    tokens: number;
    lastRefill: number;
}> = {};

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || "unknown";
    const now = Date.now();

    if (!buckets[key]) {
        buckets[key] = {
            tokens: CAPACITY,
            lastRefill: now,
        };
    }

    const bucket = buckets[key];

    const timePassed = (now - bucket.lastRefill) / 1000;
    const tokensToAdd = timePassed * REFILL_RATE;
    bucket.tokens = Math.min(CAPACITY, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
        bucket.tokens -= 1;
        return next();
    }

    return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        message: "Too many requests, please try again later"
    });

};