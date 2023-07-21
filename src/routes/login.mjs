import { Router } from "express";
import { logear } from "../controllers/login.js";

const router = Router();

router.post("/", logear);

export default router;
