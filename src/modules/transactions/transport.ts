import { Router } from "express";
import transactionService from "./transaction";

const router = Router();

router.post("/transfer", transactionService.transfer);
router.post("/deposit", transactionService.deposit);
router.post("/withdraw", transactionService.withdraw);

export default router;