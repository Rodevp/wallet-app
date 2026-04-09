import { Router } from "express";
import ledgerService from "./ledger";

const router = Router();

router.get("/balance", ledgerService.getBalance);

export default router;