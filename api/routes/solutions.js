import express from "express";
import {
  register, getsolution, getproduct, getWorkfld,
  updateSolDesc, fileupload, updateSoletc, likes, getLikes
} from "../controllers/solution.js";


const router = express.Router();

router.post("/register", register);
router.get("/getsolution", getsolution);
router.get("/getWorkfld", getWorkfld);
router.get("/getsolution/:id", getproduct);

router.put("/update/:id", updateSolDesc);
router.put("/updatesoletc/:id", updateSoletc);
router.put("/likes/:id", likes);
router.get("/likes/:id", getLikes);
router.post("/fileupload", fileupload);


export default router;