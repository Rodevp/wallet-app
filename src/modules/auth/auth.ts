import { Response, Request } from "express";
import { IAuthRepository } from "./types";
import AuthRepository from "./repository";

class AuthService {

    constructor(private readonly authRepository: IAuthRepository) { }

    login = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        }
    }

    register = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        }
    }

    refresh = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        }
    }
}

const authService = new AuthService(new AuthRepository());

export default authService;