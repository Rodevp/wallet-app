import { Response, Request } from "express";
import { IAuthRepository } from "./types";


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