import express  from "express";
import { fetchParticipants, fetchParticipantsWithEmail, register, userSignin } from "../Controller/Participants.js";
// import { payment } from "../Controller/Payment.js";

const router=express.Router();


// Participants API Routes

router.post("/register",register);
router.post("/signin",userSignin);
router.get("/participants",fetchParticipants);
router.get('/search/participant',fetchParticipantsWithEmail)

// Payemnt API Routes

// router.post("/create-upi-payment-intent",createPaymentIntent);
// router.post("/generate-upi-qrcode",generateQrCode);
// router.post("/confirm-upi-payment-intent",confirmPaymentIntent);
// router.post("/upi-payment",upiPayment);

export default router;
