import { Router } from "express";
import { createWallet, getWalletByUserId, getWalletById } from "./transport";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.post("/", createWallet);
router.get("/me/:userId", getWalletByUserId);
router.get("/:id", getWalletById);

export default router;