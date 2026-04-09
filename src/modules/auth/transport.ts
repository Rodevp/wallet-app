import type { Request, Response } from "express";
import authService from "./auth";

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;
        const result = await authService.login(email, password);

        if (result.error) {
            return res.status(result.statusCode).json({ message: result.message });
        }

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        });

        return res.status(result.statusCode).json({ message: result.message });

    } catch (error) {
        return res.status(500).json({ message: "Error in login" });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await authService.register(email, password);

        if (result.error) {
            return res.status(result.statusCode).json({ message: result.message });
        }

        return res.status(result.statusCode).json({ message: result.message });

    } catch (error) {
        return res.status(500).json({ message: "Error in register" });
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        const result = await authService.refresh(token);

        if (result.error) {
            return res.status(result.statusCode).json({ message: result.message });
        }

        res.cookie("token", result.newToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        });

        return res.status(result.statusCode).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ message: "Error in refresh" });
    }
}