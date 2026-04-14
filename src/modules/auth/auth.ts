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
import { HTTP_STATUS } from "../../types";

class AuthService {

    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly walletRepository: WalletRepository
    ) { }

    login = async (email: string, password: string) => {
        try {

            const user = await this.authRepository.getUserByEmail(email);

            if (!user) {
                return { message: "User not found", statusCode: HTTP_STATUS.NOT_FOUND, error: true };
            }

            const isValid = await comparePassword(password, user.password);

            if (!isValid) {
                return { message: "Invalid credentials", statusCode: HTTP_STATUS.UNAUTHORIZED, error: true };
            }

            const token = await generateToken({ userId: user.id });

            return { message: "Login successful", token, statusCode: HTTP_STATUS.OK, error: false };

        } catch (error) {
            throw error;
        }
    }

    register = async (email: string, password: string) => {
        try {
            const existingUser = await this.authRepository.getUserByEmail(email);
            if (existingUser) {
                return { message: "User already exists", statusCode: HTTP_STATUS.BAD_REQUEST, error: true };
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

            return { message: "User created successfully", statusCode: HTTP_STATUS.CREATED, error: false };

        } catch (error) {
            throw error;
        }
    }

    refresh = async (token: string) => {
        try {
            if (!token) {
                return { message: "No token", statusCode: HTTP_STATUS.UNAUTHORIZED, error: true };
            }

            const decoded: any = await verifyToken(token);

            const newToken = await generateToken({ userId: decoded.userId });

            return { message: "Token refreshed", newToken, statusCode: HTTP_STATUS.OK, error: false };
        } catch (error) {
            return { message: "Invalid token", statusCode: HTTP_STATUS.UNAUTHORIZED, error: true };
        }
    }
}

const authService = new AuthService(new AuthRepository(), new WalletRepository());

export default authService;