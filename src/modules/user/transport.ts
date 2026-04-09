import type { Request, Response } from "express";
import userService from "./user";

export const getProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await userService.getProfile(id as string);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const update = async (req: Request, res: Response) => {
    const { id, email, profile_image } = req.body;
    try {
        const user = await userService.update(id as string, email, profile_image);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}