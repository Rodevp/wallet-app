import { IAuthRepository } from "./types";

import prisma from "../../../prisma.config";

class AuthRepository implements IAuthRepository {
    constructor() { }

    getUserByEmail = async (email: string) => {
        try {
            return await prisma.users.findUnique({
                where: { email },
                include: { wallets: true },
            });
        } catch (error) {
            throw error;
        }
    }

    createUser = async (data: any) => {
        try {
            return await prisma.users.create({
                data: {
                    email: data.email,
                    password: data.password,
                    status: "active",
                },
            });
        } catch (error) {
            throw error;
        }
    }
}

export default AuthRepository;