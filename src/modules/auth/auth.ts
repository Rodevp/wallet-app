import AuthRepository from "./repository";
import {
    generateToken,
    comparePassword,
    hashPassword,
    verifyToken
} from "../../utils/security";
import { ethers } from "ethers";

import type { IAuthRepository } from "./types";
import WalletRepository from "../wallet/repository";

class AuthService {

    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly walletRepository: WalletRepository
    ) { }

    login = async (email: string, password: string) => {
        try {

            const user = await this.authRepository.getUserByEmail(email);

            if (!user) {
                return { message: "User not found", statusCode: 404, error: true };
            }

            const isValid = await comparePassword(password, user.password);

            if (!isValid) {
                return { message: "Invalid credentials", statusCode: 401, error: true };
            }

            const token = await generateToken({ userId: user.id });

            return { message: "Login successful", token, statusCode: 200, error: false };

        } catch (error) {
            throw error;
        }
    }

    register = async (email: string, password: string) => {
        try {
            const existingUser = await this.authRepository.getUserByEmail(email);
            if (existingUser) {
                return { message: "User already exists", statusCode: 400, error: true };
            }

            const hashedPassword = await hashPassword(password);

            const user = await this.authRepository.createUser({
                email,
                password: hashedPassword,
            });

            const wallet = ethers.Wallet.createRandom();

            await this.walletRepository.createWallet({
                userId: user.id,
                address: wallet.address,
                privateKey: wallet.privateKey,
            });

            return { message: "User created successfully", statusCode: 201, error: false };

        } catch (error) {
            throw error;
        }
    }

    refresh = async (token: string) => {
        try {
            if (!token) {
                return { message: "No token", statusCode: 401, error: true };
            }

            const decoded: any = await verifyToken(token);

            const newToken = await generateToken({ userId: decoded.userId });

            return { message: "Token refreshed", newToken, statusCode: 200, error: false };
        } catch (error) {
            return { message: "Invalid token", statusCode: 401, error: true };
        }
    }
}

const authService = new AuthService(new AuthRepository(), new WalletRepository());

export default authService;