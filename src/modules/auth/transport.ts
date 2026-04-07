import { Router } from "express";
import authService from "./auth";

const router = Router();

router.post("/login", authService.login);
router.post("/register", authService.register);
router.post("/refresh", authService.refresh);

export default router;