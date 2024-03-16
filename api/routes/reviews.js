import express from "express";
import { reviewReg, getReview } from "../controllers/review.js"

const router = express.Router();

router.post("/reviewreg", reviewReg);
router.get("/getreview", getReview);

export default router;