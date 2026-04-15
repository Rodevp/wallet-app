import { AppError } from "../../error";
import { HTTP_STATUS } from "../../types";
import UserRepository from "./repository";

class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    getProfile = async (id: string) => {
        try {
            const user = await this.userRepository.findById(id);
            return user;
        } catch (error) {
            throw new AppError("Get profile failed", HTTP_STATUS.BAD_REQUEST);
        }
    }

    update = async (id: string, email: string, profile_image: string) => {
        try {
            const user = await this.userRepository.update(id, { email, profile_image });
            return user;
        } catch (error) {
            throw new AppError("Update failed", HTTP_STATUS.BAD_REQUEST);
        }
    }
}

const userService = new UserService(new UserRepository());

export default userService;