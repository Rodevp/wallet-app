import { Router } from "express";
import { transfer, deposit, withdraw } from "./transport";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.post("/transfer", transfer);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);

export default router;