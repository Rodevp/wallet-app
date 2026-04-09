import { Router } from "express";
import { getBalance } from "./transport";

const router = Router();

router.get("/balance", getBalance);

export default router;