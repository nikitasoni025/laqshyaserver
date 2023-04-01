import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true
    },
    stream:{
        type:String,
        required:true,
    },
    institution: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default:false
    },
    password: {
        type: String,
        required: true,
    }
   

});

const users=new mongoose.model("participants",userSchema);


export default users;