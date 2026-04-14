import type { Request, Response } from "express";
import userService from "./user";
import { HTTP_STATUS } from "../../types";

export const getProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await userService.getProfile(id as string);
        return res.status(HTTP_STATUS.OK).json(user);
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}

export const update = async (req: Request, res: Response) => {
    const { id, email, profile_image } = req.body;
    try {
        const user = await userService.update(id as string, email, profile_image);
        return res.status(HTTP_STATUS.OK).json(user);
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}