import mongoose from 'mongoose';


const Schema=mongoose.Schema;


const indiPartSchema=new mongoose.Schema({
    _id:{
        type:Schema.Types.ObjectId,
        required:true
    },
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
    institution: {
        type: String,
        required: true,
    },
    standard: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default:false
    },
    eventname: {
        type: String,
        required: true,
    },
    registrationfee:{
        type:Number,
        required:true
    }
},{timestamps:true});


const individuals=new mongoose.model('indiparticipants',indiPartSchema);

export default individuals;