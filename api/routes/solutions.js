import express from "express";
import { register, getsolution, getproduct, getWorkfld, updateSolDesc } from "../controllers/solution.js";


const router = express.Router();

router.post("/register", register);
router.get("/getsolution", getsolution);
router.get("/getWorkfld", getWorkfld);
router.get("/getsolution/:id", getproduct);
router.put("/update/:id", updateSolDesc);


export default router;