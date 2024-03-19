import express from "express";
import { registerDev, getDeveloper, getUser, AdminReg, getAdmin } from "../controllers/developer.js"

const router = express.Router();

router.post("/registerdev", registerDev);
router.get("/getdeveloper", getDeveloper);
router.get("/getuser", getUser);

router.post("/adminreg", AdminReg);
router.get("/getadmin", getAdmin);

export default router;