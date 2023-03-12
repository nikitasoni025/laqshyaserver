import express  from "express";
import { register, userSignin } from "../Controller/Participants.js";

const router=express.Router();

router.post("/register",register);
router.post("/signin",userSignin)

export default router;
