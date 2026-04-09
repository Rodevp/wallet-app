import { Router } from "express";
import { getProfile, update } from "./transport";

const router = Router();

router.get("/:id", getProfile);
router.patch("/", update);

export default router;