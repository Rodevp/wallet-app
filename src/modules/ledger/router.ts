import { Router } from "express";
import { getBalance } from "./transport";
import { authMiddleware } from "../../middlewares/auth";
import { rateLimiter } from "../../middlewares/rateLimitter";

const router = Router();
router.use(authMiddleware);
router.use(rateLimiter);

router.get("/balance", getBalance);

export default router;