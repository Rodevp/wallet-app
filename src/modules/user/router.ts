import { Router } from "express";
import { getProfile, update } from "./transport";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.get("/:id", getProfile);
router.patch("/", update);

export default router;