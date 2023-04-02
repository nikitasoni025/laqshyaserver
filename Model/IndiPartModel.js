import mongoose from 'mongoose';


const Schema=mongoose.Schema;


const indiPartSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    fullname: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    stream: {
        type: String,
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
    },
    selected: {
        type: Boolean,
        required: true,
        default:false
    },
    transactionid:{
        type:String,
        default:'nil'
    }
},{timestamps:true});


const individuals=new mongoose.model('indiparticipants',indiPartSchema);

export default individuals;