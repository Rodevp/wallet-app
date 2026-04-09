import { Router } from "express";
import { createWallet, getWalletByUserId, getWalletById } from "./transport";

const router = Router();

router.post("/", createWallet);
router.get("/me/:userId", getWalletByUserId);
router.get("/:id", getWalletById);

export default router;