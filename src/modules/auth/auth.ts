import AuthRepository from "./repository";
import {
    generateToken,
    comparePassword,
    hashPassword,
    verifyToken
} from "../../utils/security";
import { ethers } from "ethers";

import type { Response, Request } from "express";
import type { IAuthRepository } from "./types";

class AuthService {

    constructor(private readonly authRepository: IAuthRepository) { }

    login = async (req: Request, res: Response) => {
        try {

            const { email, password } = req.body;
            const user = await this.authRepository.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isValid = await comparePassword(password, user.password);

            if (!isValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = await generateToken({ userId: user.id });

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60,
            });

            return res.status(200).json({ message: "Login successful" });

        } catch (error) {
            return res.status(500).json({ message: "Error in login" });
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const existingUser = await this.authRepository.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await hashPassword(password);

            const user = await this.authRepository.createUser({
                email,
                password: hashedPassword,
            });

            const wallet = ethers.Wallet.createRandom();

            await this.authRepository.createWallet({
                userId: user.id,
                address: wallet.address,
                privateKey: wallet.privateKey,
            });

            return res.status(201).json({ message: "User created successfully" });

        } catch (error) {
            return res.status(500).json({ message: "Error in register" });
        }
    }

    refresh = async (req: Request, res: Response) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "No token" });
            }

            const decoded: any = await verifyToken(token);

            const newToken = await generateToken({ userId: decoded.userId });

            res.cookie("token", newToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60,
            });

            return res.status(200).json({ message: "Token refreshed" });
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}

const authService = new AuthService(new AuthRepository());

export default authService;