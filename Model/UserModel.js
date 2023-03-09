import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },
    institution: {
        type: String,
        required: true,
    },
    standard: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

})

const users=new mongoose.model("participants",userSchema);


export default users;