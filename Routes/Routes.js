import express  from "express";
import { groupRegister } from "../Controller/Groups.js";
import { individualRegister } from "../Controller/Individuals.js";
import { fetchParticipants, fetchParticipantsWithId, register, userSignin } from "../Controller/Participants.js";
import { createPaymentIntent, paySuccess, webhook } from "../Controller/Payment.js";

const router=express.Router();


// Participants API Routes

router.post("/register",register);
router.post("/signin",userSignin);
router.post('/indi/regist',individualRegister);
router.post('/group/regist',groupRegister);
router.get("/participants",fetchParticipants);
router.get('/partwid',fetchParticipantsWithId);

// Payemnt API Routes

router.post("/payment",createPaymentIntent);
router.get("/paysuccess",paySuccess);
router.post("/webhook",webhook);
// router.post("/generate-upi-qrcode",generateQrCode);
// router.post("/confirm-upi-payment-intent",confirmPaymentIntent);
// router.post("/upi-payment",upiPayment);

export default router;
