import { Router } from "express";
import transactionService from "./transaction";

const router = Router();

router.post("/transfer", transactionService.transfer);

export default router;