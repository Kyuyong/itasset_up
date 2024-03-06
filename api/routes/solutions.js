import express from "express";
import { register } from "../controllers/solution.js";
import { fileupload } from "../controllers/solution.js";

const router = express.Router();




router.post("/register", register)
router.post("/upload", fileupload)




export default router;