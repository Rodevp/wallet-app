import { Router } from "express";
import { transfer, deposit, withdraw } from "./transport";

const router = Router();

router.post("/transfer", transfer);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);

export default router;