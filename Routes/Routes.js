import express  from "express";
import { deleteGroup, getAllGroup, groupRegister, updateGroup } from "../Controller/Groups.js";
import { deleteIndividual, getAllIndividuals, individualRegister, updateIndividual } from "../Controller/Individuals.js";
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
router.delete('/indi/delete/:id',deleteIndividual);
router.delete('/group/delete/:id',deleteGroup);




// UPDATE ROUTES
router.put('/user/update/',updateUser);
router.put('/indi/update/',updateIndividual);
router.put('/group/update/',updateGroup);

export default router;
