import AppDataSource from "../../db";
import { User } from "../../models/user";

import { IAuthRepository } from "./types";

class AuthRepository implements IAuthRepository {

    private userRepo = AppDataSource.getRepository(User);

    constructor() { }

    getUserByEmail = async (email: string) => {
        try {
            return await this.userRepo.findOne({
                where: { email },
                relations: ["wallets"],
            });
        } catch (error) {
            throw error;
        }
    }

    createUser = async (data: Pick<User, "email" | "password">) => {
        try {
            const user = this.userRepo.create({
                email: data.email,
                password: data.password,
                status: "active",
            });
            return await this.userRepo.save(user);
        } catch (error) {
            throw error;
        }
    }
}

export default AuthRepository;