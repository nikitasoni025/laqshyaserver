import stripe from "stripe";
import dotenv from "dotenv";
import payments from "../Model/PaymentModel.js";
import qrcode from "qrcode";
import { v4 as uuidv4 } from "uuid";


dotenv.config();

const client = new stripe(process.env.STRIPE_SECRET_KEY);



export const createPaymentIntent = async (req, res) => {

    const { amount } = req.body;
    try {
        const paymentIntent = await client.paymentIntents.create({
            amount,
            currency: "INR",
            payment_method_types: ["upi"],
            metadata: {
                integration_check: "upi_payment",
            }
        });
        return res.status(200).json({ msg: "Intent Generated", client_secret: paymentIntent.client_secret });
    } catch (error) {
        return res.status(400).json({ msg: "Intent Genration Failed", error: error.message });


    }
}

export const generateQrCode = async (req, res) => {

    const { amount, upi_code, client_secret } = req.body;
    try {
        const paymentIntent = await client.paymentIntents.retrieve(client_secret);
        const paymentIntentId = paymentIntent.id;
        const qrCodeData = await qrcode.toDataURL(
            `upi://${upi_code}?amount=${amount}`
        )

    } catch (error) {

    }


}