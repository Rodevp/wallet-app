import AppDataSource from "../../db";
import { User } from "../../models/user";

class UserRepository {

    private userRepo = AppDataSource.getRepository(User);

    constructor() { }

    async findById(id: string): Promise<User | null> {
        return await this.userRepo.findOne({ where: { id: Number(id) }, relations: ["wallet"] });
    }

    async update(id: string, data: Partial<User>): Promise<any> {
        return await this.userRepo.update(id, data);
    }
}

export default UserRepository;