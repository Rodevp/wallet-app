import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export const generateToken = async (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export const verifyToken = async (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}