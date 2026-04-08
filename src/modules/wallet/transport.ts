import { Router } from "express";
import walletService from "./wallet";

const router = Router();

router.post("/", walletService.createWallet);
router.get("/me/:userId", walletService.getWalletByUserId);
router.get("/:id", walletService.getWalletById);

export default router;