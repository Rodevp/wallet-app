import type { Response, Request } from "express";
import UserRepository from "./repository";

class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    getProfile = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await this.userRepository.findById(id as string);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    update = async (req: Request, res: Response) => {
        const { id, email, profile_image } = req.body;
        try {
            const user = await this.userRepository.update(id as string, { email, profile_image });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

const userService = new UserService(new UserRepository());

export default userService;