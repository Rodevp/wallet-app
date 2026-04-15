import AppDataSource from "../../db";
import { AppError } from "../../error";
import { User } from "../../models/user";
import { HTTP_STATUS } from "../../types";

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
            throw new AppError("Get user failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
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
            throw new AppError("Create user failed", HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}

export default AuthRepository;