import mongoose from "mongoose";


const PaymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    payment_id: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const payments = new mongoose.model("payment_details", PaymentSchema);


export default payments;

