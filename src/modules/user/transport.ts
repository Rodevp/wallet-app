import { Router } from "express";
import userService from "./user";

const router = Router();

router.get("/:id", userService.getProfile);
router.patch("/", userService.update);

export default router;