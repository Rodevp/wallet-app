import AppDataSource from "../../db";
import { AppError } from "../../error";
import { User } from "../../models/user";
import { HTTP_STATUS } from "../../types";

class UserRepository {

    private userRepo = AppDataSource.getRepository(User);

    constructor() { }

    async findById(id: string): Promise<User | null> {
        try {
            return await this.userRepo.findOne({ where: { id: Number(id) }, relations: ["wallet"] });
        } catch (error) {
            throw new AppError("Find by id failed", HTTP_STATUS.BAD_REQUEST);
        }
    }

    async update(id: string, data: Partial<User>) {
        try {
            return await this.userRepo.update(id, data);
        } catch (error) {
            throw new AppError("Update failed", HTTP_STATUS.BAD_REQUEST);
        }
    }
}

export default UserRepository;