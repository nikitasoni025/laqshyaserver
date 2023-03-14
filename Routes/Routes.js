import express  from "express";
import { fetchParticipants, fetchParticipantsWithEmail, register, userSignin } from "../Controller/Participants.js";

const router=express.Router();


// Participants API Routes

router.post("/register",register);
router.post("/signin",userSignin);
router.get("/participants",fetchParticipants);
router.get('/search/participant',fetchParticipantsWithEmail)

export default router;
