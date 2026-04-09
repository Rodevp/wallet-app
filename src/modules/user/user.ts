import UserRepository from "./repository";

class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    getProfile = async (id: string) => {
        try {
            const user = await this.userRepository.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    update = async (id: string, email: string, profile_image: string) => {
        try {
            const user = await this.userRepository.update(id, { email, profile_image });
            return user;
        } catch (error) {
            throw error;
        }
    }
}

const userService = new UserService(new UserRepository());

export default userService;