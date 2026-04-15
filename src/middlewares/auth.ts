import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/security";
import { HTTP_STATUS } from "../types";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        const decodedToken: any = verifyToken(token);

        if (!decodedToken || !decodedToken?.userId) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        req.user = {
            userId: decodedToken.userId,
        };

        next();

    } catch (error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
}