import { Router } from "express";
import { transfer, deposit, withdraw } from "./transport";
import { authMiddleware } from "../../middlewares/auth";
import { rateLimiter } from "../../middlewares/rateLimitter";
import { antiFraudMiddleware } from "../../middlewares/antifraud.middleware";

const router = Router();
router.use(authMiddleware);
router.use(rateLimiter);
router.use(antiFraudMiddleware);

router.post("/transfer", transfer);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);

export default router;