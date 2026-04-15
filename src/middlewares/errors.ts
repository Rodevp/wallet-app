import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../types";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });

    if (err.name === "ValidationError") return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Validation Error" });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });

}
