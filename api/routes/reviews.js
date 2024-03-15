import express from "express";
import { reviewReg } from "../controllers/review.js"

const router = express.Router();

router.post("/reviewreg", reviewReg);

export default router;