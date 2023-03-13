import express  from "express";
import { fetchParticipants, register, userSignin } from "../Controller/Participants.js";

const router=express.Router();


// Participants API Routes

router.post("/register",register);
router.post("/signin",userSignin)
router.get("/participants",fetchParticipants)

export default router;
