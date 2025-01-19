import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { loginUser, myProfile, verifyuser } from "../Controller/usercontroller.js";

const router = express.Router();

router.post("/login",loginUser);
router.post("/verify",verifyuser);
router.get("/me",isAuth,myProfile);

export default router;

