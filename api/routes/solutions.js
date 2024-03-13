import express from "express";
import { register, getsolution, getproduct, getWorkfld, updateSolDesc } from "../controllers/solution.js";
import { fileupload } from "../controllers/solution.js";

const router = express.Router();

router.post("/register", register);
router.get("/getsolution", getsolution);
router.get("/getWorkfld", getWorkfld);
router.get("/getsolution/:id", getproduct);
router.put("/update/:id", updateSolDesc);
router.post("/upload", fileupload);

export default router;