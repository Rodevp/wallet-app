import { Router } from "express";
import { getBalance } from "./transport";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.get("/balance", getBalance);

export default router;