import { Router } from "express";
import walletService from "./wallet";

const router = Router();

router.post("/me", walletService.createWallet);
router.get("/:userId", walletService.getWalletByUserId);
router.get("/:id", walletService.getWalletById);

export default router;