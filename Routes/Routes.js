import express  from "express";
import { getAllGroup, groupRegister } from "../Controller/Groups.js";
import { getAllIndividuals, individualRegister } from "../Controller/Individuals.js";
import { deleteUser, fetchParticipants, fetchParticipantsWithId, fetchParticipantsWithLimit, register, updateUser, userSignin } from "../Controller/Participants.js";
import { createPaymentIntent, paySuccess, webhook } from "../Controller/Payment.js";

const router=express.Router();


// Participants API Routes

router.post("/register",register);
router.post("/signin",userSignin);
router.post('/indi/regist',individualRegister);
router.post('/group/regist',groupRegister);
router.get('/groups',getAllGroup);
router.get("/participants",fetchParticipants);
router.get("/paticipantsData",fetchParticipantsWithLimit);
router.get('/partwid',fetchParticipantsWithId);
router.get("/individuals",getAllIndividuals)

// Payemnt API Routes

router.post("/payment",createPaymentIntent);
router.get("/paysuccess",paySuccess);
router.post("/webhook",webhook);


// Delete Routes
router.delete('/user/delete/:id',deleteUser);




// UPDATE ROUTES
router.put('/user/update/',updateUser);

export default router;
